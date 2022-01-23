import {
  useContext,
  useEffect,
  useState,
} from 'react'
import _ from 'lodash'

import { EngineSubscriberContext } from 'Contexts/EngineContext'
import { RegisterPostframeCallbackContext } from 'Contexts/RenderFrameCallbackContext'
import { O } from 'Util/Fx'

import type { FPS } from '../types/fps'

function useEngineFps() {
  const engineT = useContext(EngineSubscriberContext)
  const registerPostframeCallback = useContext(RegisterPostframeCallbackContext)

  const [fps, setFps] = useState<O.Option<FPS>>(null)

  useEffect(function registerFpsUpdater() {
    if (!engineT.fulfilled()) { return _.noop }
    if (O.isNone(engineT.data)) { return _.noop }

    return registerPostframeCallback(() => setFps(engineT.data?.getFps()))
  }, [
    engineT,
    registerPostframeCallback,
  ])

  return fps
}

export default useEngineFps
