import {
  useContext,
  useState,
} from 'react'

import { EngineSubscriberContext } from 'Contexts/EngineContext'
import { O } from 'Util/Fx'

import type { FPS } from '../types/fps'

function useEngineFps() {
  const engineT = useContext(EngineSubscriberContext)
  const [fps, setFps] = useState<O.Option<FPS>>(null)

  return fps
}

export default useEngineFps
