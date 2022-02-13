import {
  useContext,
  useEffect,
} from 'react'
import { useDispatch } from 'react-redux'
import _ from 'lodash'

import { EngineSubscriberContext } from 'Contexts/EngineContext'
import {
  SetRegisterPostframeCallbackContext,
  SetRegisterPreframeCallbackContext,
} from 'Contexts/RenderFrameCallbackContext'
import store from 'Redux/store'
import {
  mountProperty,
  unmountProperty,
} from 'Redux/modules/applicationProperty'
import { O } from 'Util/Fx'
import type SceneApplication from 'Util/SceneApplication'

const WebGpuSceneApplication = <T extends object>(app: SceneApplication.SceneApplication<T>) =>
  function Application() {
    const dispatch = useDispatch()

    const engineT = useContext(EngineSubscriberContext)
    const setRegisterPreframeCallback = useContext(SetRegisterPreframeCallbackContext)
    const setRegisterPostframeCallback = useContext(SetRegisterPostframeCallbackContext)

    useEffect(function runApplication() {
      if (!engineT.fulfilled()) { return _.noop }
      if (O.isNone(engineT.data)) { return _.noop }

      const engine = engineT.data
      const sceneP = app.createScene(engine)
      const propertiesP = sceneP.then((scene) => app.defineProperties(engine, scene))

      sceneP.then((scene) => engine.runRenderLoop(() => scene.render()))

      propertiesP.then((properties) => (
        Object.keys(properties)
          .forEach((name) =>
            dispatch(mountProperty({ name, init: properties[name as keyof T].init() })))
      ))

      const propertiesListener = (() => {
        let prev: T | null = null

        return (properties: SceneApplication.PropertyMap<T>) => () => {
          const state = store.getState()
          const current = _.pick(state.applicationProperty, Object.keys(properties)) as T

          Object.keys(properties)
            .forEach((key) =>
              properties[key as keyof T]
                .update(prev?.[key as keyof T] ?? null, current[key as keyof T]))

          prev = current
        }
      })()
      const instancedPropertiesListener = propertiesP.then(propertiesListener)

      Promise.all([sceneP, instancedPropertiesListener])
        .then(([scene, listener]) => scene.registerBeforeRender(listener))

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

        propertiesP.then((properties) => (
          Object.keys(properties)
            .forEach((name) => dispatch(unmountProperty({ name })))
        ))

        Promise.all([sceneP, instancedPropertiesListener])
          .then(([scene, listener]) => scene.unregisterBeforeRender(listener))
      }
    }, [
      dispatch,
      engineT,
    ])

    return null
  }

export default WebGpuSceneApplication
