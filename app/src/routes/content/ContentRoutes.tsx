import {
  lazy,
  Suspense,
} from 'react'
import {
  Route,
  Switch,
} from 'react-router-dom'

import WebGpuCanvas from 'Common/canvas/WebGpuCanvas'
import WebGpuSceneApplication from 'Common/canvas/WebGpuSceneApplication'
import { SR } from 'Util/Fx'

const SimpleSceneApplication = lazy(() =>
  import('App/SimpleSceneApplication')
    .then(SR.evolve({ default: WebGpuSceneApplication })))

const MarchingCubes = lazy(() =>
  import('App/MarchingCubes')
    .then(SR.evolve({ default: WebGpuSceneApplication })))

function ContentRoutes() {
  return (
    <WebGpuCanvas>
      <Suspense fallback={null}>
        <Switch>
          <Route path="/simple-scene" component={SimpleSceneApplication} />
          <Route path="/marching-cubes" component={MarchingCubes} />
          <Route component={SimpleSceneApplication} />
        </Switch>
      </Suspense>
    </WebGpuCanvas>
  )
}

export default ContentRoutes
