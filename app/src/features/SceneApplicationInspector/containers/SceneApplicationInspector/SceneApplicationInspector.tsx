import { Inspectors } from '../../components/Inspectors'
import { AppPropertiesInspector } from '../AppPropertiesInspector'
import { EngineInspector } from '../EngineInspector'

function SceneApplicationInspector() {
  return (
    <Inspectors>
      <EngineInspector />
      <AppPropertiesInspector />
    </Inspectors>
  )
}

export default SceneApplicationInspector
