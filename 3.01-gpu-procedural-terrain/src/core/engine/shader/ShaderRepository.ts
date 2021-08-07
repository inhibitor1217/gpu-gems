import _ from 'lodash'
import LoggerService from '../../service/LoggerService'
import Completer from '../../util/Completer'
import Engine from '../Engine'
import { InitializationException, NotFoundException } from '../exception'
import basicWGSL from './sources/basic.wgsl'

const SOURCES: Record<string, string> = {
  Basic: basicWGSL,
}

class ShaderRepository {
  private device = new Completer<GPUDevice>()

  private shaders = new Completer<Map<string, GPUShaderModule>>()

  configure(engine: Engine): void {
    LoggerService.verbose('Initialize ShaderRepository.')

    this.device.resolve(engine.device)
    this.compile()
  }

  compile(): void {
    if (this.shaders.invoked) {
      return
    }

    this.shaders.resolve(
      Promise.all(
        _.keys(SOURCES).map((name) =>
          this.createShaderModule(name).then((shaderModule) => [name, shaderModule] as const)
        )
      ).then((pairs) => new Map(pairs))
    )
  }

  async get(name: string): Promise<GPUShaderModule> {
    const shaders = await this.shaders.promise
    const module = shaders.get(name)
    if (_.isNil(module)) {
      throw new NotFoundException(`Shader: ${name} not found`)
    }
    return module
  }

  private async createShaderModule(name: string): Promise<GPUShaderModule> {
    const device = await this.device.promise
    const source = SOURCES[name]

    if (_.isNil(source)) {
      throw InitializationException.resourceNotInitialized(`Shader source ${name} not found.`)
    }

    LoggerService.debug(`Compiling shader source ${name} ...`)

    const shaderModule = device.createShaderModule({ code: source })
    return shaderModule
  }
}

export default new ShaderRepository()
