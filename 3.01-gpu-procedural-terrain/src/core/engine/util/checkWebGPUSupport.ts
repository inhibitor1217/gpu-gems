import _ from 'lodash'
import { InitializationException } from '../exception'

export function hasWebGPUSupport(): boolean {
  return !_.isNil(navigator.gpu)
}

export function ensureWebGPUSupport(): void {
  if (!hasWebGPUSupport()) {
    throw InitializationException.unsupportedBrowser()
  }
}
