import {
  Route,
  Switch,
} from 'react-router-dom'

import WebGpuCanvas from 'Common/canvas/WebGpuCanvas'

function ContentRoutes() {
  return (
    <WebGpuCanvas>
      <Switch>
        <Route component={() => null} />
      </Switch>
    </WebGpuCanvas>
  )
}

export default ContentRoutes
