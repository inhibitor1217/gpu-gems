import {
  useContext,
  useEffect,
} from 'react'
import _ from 'lodash'

import { EngineSubscriberContext } from 'Contexts/EngineContext'
import {
  SetRegisterPostframeCallbackContext,
  SetRegisterPreframeCallbackContext,
} from 'Contexts/RenderFrameCallbackContext'
import { O } from 'Util/Fx'
import type SceneApplication from 'Util/SceneApplication'

const WebGpuSceneApplication = (app: SceneApplication.SceneApplication) =>
  function Application() {
    const engineT = useContext(EngineSubscriberContext)
    const setRegisterPreframeCallback = useContext(SetRegisterPreframeCallbackContext)
    const setRegisterPostframeCallback = useContext(SetRegisterPostframeCallbackContext)

    useEffect(function runApplication() {
      if (!engineT.fulfilled()) { return _.noop }
      if (O.isNone(engineT.data)) { return _.noop }

      const engine = engineT.data
      const sceneP = app.createScene(engine)

      sceneP.then((scene) => engine.runRenderLoop(() => scene.render()))

      setRegisterPreframeCallback(
        (callback) => {
          sceneP.then((scene) => scene.registerBeforeRender(callback))
          return () => sceneP.then((scene) => scene.unregisterBeforeRender(callback))
        },
      )

      setRegisterPostframeCallback(
        (callback) => {
          sceneP.then((scene) => scene.registerAfterRender(callback))
          return () => sceneP.then((scene) => scene.unregisterAfterRender(callback))
        },
      )

      return function cleanup() {
        sceneP.then((scene) => scene.dispose())
      }
    }, [engineT])

    return null
  }

export default WebGpuSceneApplication
