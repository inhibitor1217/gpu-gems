import useEngineFps from '../../hooks/useEngineFps'
import { FPS } from '../../types/fps'
import { InspectorField } from '../InspectorField'

const mapFps = (value: FPS) => value.toFixed(3).toString()

function EngineFps() {
  const fps = useEngineFps()

  return (
    <InspectorField
      keyIcon="graph"
      keyName="FPS"
      value={fps}
      mapValue={mapFps}
    />
  )
}

export default EngineFps
