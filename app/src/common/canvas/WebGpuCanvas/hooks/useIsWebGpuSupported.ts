import { WebGPUEngine } from '@babylonjs/core'

import { useAsyncState } from 'Util/AsyncState'

function useIsWebGpuSupported() {
  return useAsyncState(WebGPUEngine.IsSupportedAsync)
}

export default useIsWebGpuSupported
