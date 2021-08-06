import { BaseException } from '../../util/exception'

export enum InitializationExceptionCode {
  WebGPU = 'WebGPU',
  GPUAdapter = 'GPUAdapter',
  GPUDevice = 'GPUDevice',
}

export default class InitializationException extends BaseException {
  readonly code: InitializationExceptionCode

  constructor(code: InitializationExceptionCode, message: string) {
    super('InitializationException', message)

    this.code = code
  }

  static unsupportedBrowser(): InitializationException {
    return new InitializationException(
      InitializationExceptionCode.WebGPU,
      'WebGPU is not supported or enabled in this browser'
    )
  }

  static adapterRequestFailed(): InitializationException {
    return new InitializationException(InitializationExceptionCode.GPUAdapter, 'GPUAdapter request was not resolved')
  }

  static deviceRequestFailed(): InitializationException {
    return new InitializationException(InitializationExceptionCode.GPUDevice, 'GPUDevice request was not resolved')
  }
}
