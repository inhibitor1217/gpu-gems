import {
  useEffect,
  useMemo,
} from 'react'
import { WebGPUEngine } from '@babylonjs/core'
import _ from 'lodash'

import SimpleSceneApplication from 'App/SimpleSceneApplication'
import { useAsyncState } from 'Util/AsyncState'
import type { Task } from 'Util/AsyncState'
import { O } from 'Util/Fx'

const initEngine =
  O.mapT(
    async (canvas: HTMLCanvasElement): Promise<WebGPUEngine> => {
      const engine = new WebGPUEngine(canvas)
      await engine.initAsync()
      return engine
    })

const cleanupEngine =
  O.map(
    (engine: WebGPUEngine) => {
      try {
        engine.dispose()
      } catch (e) { /* ignore exception. */ }
    })

function useWebGpuEngine(
  canvas: HTMLCanvasElement | null,
): Task<O.Option<WebGPUEngine>> {
  const engineP = useMemo(() => initEngine(canvas), [canvas])
  const engineT = useAsyncState(engineP)

  useEffect(() => function cleanup() {
    if (engineT.fulfilled()) cleanupEngine(engineT.data)
  }, [engineT])

  useEffect(function runApp() {
    if (engineT.fulfilled()) {
      if (O.isNotNone(engineT.data)) {
        const engine = engineT.data
        const sceneP = SimpleSceneApplication.createScene(engine)
        sceneP.then(scene => engine.runRenderLoop(() => scene.render()))

        return function cleanup() {
          sceneP.then(scene => scene.dispose())
        }
      }
    }
  }, [engineT])

  return engineT
}

export default useWebGpuEngine
