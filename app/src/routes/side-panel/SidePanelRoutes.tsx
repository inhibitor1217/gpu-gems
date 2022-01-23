import { SidePanelContent } from '@channel.io/bezier-react'
import {
  Route,
  Routes,
} from 'react-router-dom'

import { SceneApplicationInspector } from 'Features/SceneApplicationInspector'

function SidePanelRoutes() {
  return (
    <SidePanelContent>
      <Routes>
        <Route path="*" element={<SceneApplicationInspector />} />
      </Routes>
    </SidePanelContent>
  )
}

export default SidePanelRoutes
