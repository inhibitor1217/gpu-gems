import {
  lazy,
  Suspense,
} from 'react'
import {
  Route,
  Routes,
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
        <Routes>
          <Route path="/" element={<SimpleSceneApplication />} />
          <Route path="simple-scene" element={<SimpleSceneApplication />} />
          <Route path="marching-cubes" element={<MarchingCubes />} />
        </Routes>
      </Suspense>
    </WebGpuCanvas>
  )
}

export default ContentRoutes
