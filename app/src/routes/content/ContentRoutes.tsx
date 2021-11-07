import {
  Route,
  Switch,
} from 'react-router-dom'

import WebGpuCanvas from 'Common/canvas/WebGpuCanvas'

function ContentRoutes() {
  return (
    <Switch>
      <Route component={WebGpuCanvas} />
    </Switch>
  )
}

export default ContentRoutes
