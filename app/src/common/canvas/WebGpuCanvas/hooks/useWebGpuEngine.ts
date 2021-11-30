import {
  useEffect,
  useMemo,
} from 'react'
import { WebGPUEngine } from '@babylonjs/core'

import { useAsyncState } from 'Util/AsyncState'
import type { Task } from 'Util/AsyncState'
import { O } from 'Util/Fx'

const initEngine = O.mapT(
  async (canvas: HTMLCanvasElement): Promise<WebGPUEngine> => {
    const engine = new WebGPUEngine(canvas)
    await engine.initAsync()
    return engine
  },
)

const cleanupEngine = O.map(
  (engine: WebGPUEngine) => {
    try {
      engine.dispose()
    } catch (e) { /* ignore exception. */ }
  },
)

function useWebGpuEngine(
  canvas: HTMLCanvasElement | null,
): Task<O.Option<WebGPUEngine>> {
  const engineP = useMemo(() => initEngine(canvas), [canvas])
  const engineT = useAsyncState(engineP)

  useEffect(() => function cleanup() {
    if (engineT.fulfilled()) cleanupEngine(engineT.data)
  }, [engineT])

  return engineT
}

export default useWebGpuEngine
