import _ from 'lodash'
import LoggerService from '../service/LoggerService'
import Completer from '../util/Completer'
import { InitializationException } from './exception'
import { ensureWebGPUSupport } from './util'

export default class Engine {
  private static _adapter: GPUAdapter | null = null
  private static _device: GPUDevice | null = null

  private static _adapterInitializationCompleter = new Completer<GPUAdapter>()
  private static _deviceInitializationCompleter = new Completer<GPUDevice>()

  constructor() {
    ensureWebGPUSupport()

    this.initialize()
  }

  get adapter(): Promise<GPUAdapter> {
    return Engine._adapterInitializationCompleter.promise
  }

  get device(): Promise<GPUDevice> {
    return Engine._deviceInitializationCompleter.promise
  }

  private async initialize(): Promise<void> {
    await Engine.initializeAdapter()
    await Engine.initializeDevice(await this.adapter)
  }

  private static async initializeAdapter(): Promise<void> {
    if (this._adapterInitializationCompleter.invoked) {
      LoggerService.verbose('Adapter initialization is already running. Aborted')
      return
    }

    LoggerService.debug('Initialize GPU adapter for Engine.')

    LoggerService.verbose('Requesting GPU adapter from user agent ...')
    this._adapter = await navigator.gpu.requestAdapter()

    if (_.isNil(this._adapter)) {
      throw InitializationException.adapterRequestFailed()
    }

    this._adapterInitializationCompleter.resolve(this._adapter)

    LoggerService.debug('Successfully initialized GPU adapter for Engine.')
  }

  private static async initializeDevice(adapter: GPUAdapter): Promise<void> {
    if (this._deviceInitializationCompleter.invoked) {
      LoggerService.verbose('Device initialization is already running. Aborted')
      return
    }

    LoggerService.debug('Initialize GPU device for Engine.')

    LoggerService.verbose('Requesting GPU device from user agent ...')
    this._device = await adapter.requestDevice()

    if (_.isNil(this._device)) {
      throw InitializationException.deviceRequestFailed()
    }

    this._deviceInitializationCompleter.resolve(this._device)

    LoggerService.debug('Successfully initialized GPU device for Engine.')
  }
}
