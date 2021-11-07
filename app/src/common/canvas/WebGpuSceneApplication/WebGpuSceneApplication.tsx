import {
  useContext,
  useEffect,
} from 'react'

import EngineContext from 'Contexts/EngineContext'
import { O } from 'Util/Fx'
import type SceneApplication from 'Util/SceneApplication'

const WebGpuSceneApplication = (app: SceneApplication.SceneApplication) =>
  function Application() {
    const engineT = useContext(EngineContext)

    useEffect(function runApplication() {
      if (!engineT.fulfilled()) { return }
      if (O.isNone(engineT.data)) { return }

      const engine = engineT.data
      const sceneP = app.createScene(engine)

      sceneP.then(scene => engine.runRenderLoop(() => scene.render()))

      return function cleanup() {
        sceneP.then(scene => scene.dispose())
      }
    }, [engineT])

    return null
  }

export default WebGpuSceneApplication
