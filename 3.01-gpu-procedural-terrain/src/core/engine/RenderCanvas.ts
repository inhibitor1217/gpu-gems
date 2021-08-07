import _ from 'lodash'
import LoggerService from '../service/LoggerService'
import assert from '../util/assert'
import Engine from './Engine'
import { InitializationException } from './exception'

const wm = new WeakMap<HTMLCanvasElement, RenderCanvas>()

const resizeObserver = new ResizeObserver((entries) => {
  entries.forEach((entry) => {
    const { target } = entry

    if (!(target instanceof HTMLCanvasElement)) {
      return
    }

    const renderCanvas = wm.get(target)

    if (_.isNil(renderCanvas)) {
      return
    }

    renderCanvas.resize()
  })
})

export default class RenderCanvas {
  readonly canvas: HTMLCanvasElement
  readonly context: GPUPresentationContext

  private _device: GPUDevice | null = null
  private _format: GPUTextureFormat | null = null
  private _renderTarget: GPUTexture | null = null
  private _renderTargetView: GPUTextureView | null = null

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas

    wm.set(this.canvas, this)
    resizeObserver.observe(canvas)

    const context = canvas.getContext('webgpu')
    if (_.isNil(context)) {
      throw InitializationException.unsupportedContext()
    }

    this.context = context
  }

  static from(element: HTMLElement | null): RenderCanvas {
    if (!element) {
      throw new TypeError(`${element} is not a HTMLCanvasElement`)
    }

    if (!(element instanceof HTMLCanvasElement)) {
      throw new TypeError(`${element} is not a HTMLCanvasElement`)
    }

    return new RenderCanvas(element)
  }

  get size(): GPUExtent3D {
    const devicePixelRatio = window.devicePixelRatio ?? 1

    return [this.canvas.clientWidth * devicePixelRatio, this.canvas.clientHeight * devicePixelRatio, 1]
  }

  get configured(): boolean {
    return (
      !_.isNil(this._device) &&
      !_.isNil(this._format) &&
      !_.isNil(this._renderTarget) &&
      !_.isNil(this._renderTargetView)
    )
  }

  get renderTargetView(): GPUTextureView {
    if (!this.configured) {
      throw InitializationException.resourceNotInitialized('RenderCanvas.renderTargetView')
    }

    assert(!_.isNil(this._renderTargetView))

    return this._renderTargetView
  }

  async configure(engine: Engine): Promise<void> {
    LoggerService.verbose('Configuring RenderCanvas ...')

    const adapter = await engine.adapter

    const device = await engine.device
    this._device = device

    const size = this.size

    const format = this.context.getPreferredFormat(adapter)
    this._format = format

    this.context.configure({
      device,
      format,
      size,
    })

    this.createRenderTarget(size)
  }

  destroy(): void {
    LoggerService.verbose('Destroying RenderCanvas ...')

    resizeObserver.unobserve(this.canvas)

    if (!this.configured) {
      LoggerService.verbose('This RenderCanvas not configured. No need to destroy')
      return
    }

    this.context.unconfigure()

    this.destroyRenderTarget()
  }

  resize(): void {
    if (!this.configured) {
      return
    }

    assert(!_.isNil(this._device))
    assert(!_.isNil(this._format))

    const size = this.size
    const width: number = _.get(size, '[0]')
    const height: number = _.get(size, '[1]')

    LoggerService.verbose(`Resizing RenderCanvas to ${width} x ${height} ...`)

    this.destroyRenderTarget()

    this.context.configure({
      device: this._device,
      format: this._format,
      size,
    })

    this.createRenderTarget(size)
  }

  private createRenderTarget(size: GPUExtent3D): void {
    assert(!_.isNil(this._device))
    assert(!_.isNil(this._format))

    LoggerService.verbose('Creating render target of RenderCanvas ...')

    this._renderTarget = this._device.createTexture({
      size,
      format: this._format,
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    })

    this._renderTargetView = this._renderTarget.createView()
  }

  private destroyRenderTarget(): void {
    assert(!_.isNil(this._renderTarget))

    LoggerService.verbose('Destroying render target of RenderCanvas ...')

    this._renderTarget.destroy()
  }
}
