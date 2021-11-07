import { useContext } from 'react'

import EngineContext from 'Contexts/EngineContext'
import type SceneApplication from 'Util/SceneApplication'

const WebGpuSceneApplication = (app: SceneApplication.SceneApplication) =>
  function Application() {
    const engine = useContext(EngineContext)

    return null
  }

export default WebGpuSceneApplication
