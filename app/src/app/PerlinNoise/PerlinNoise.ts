import {
  Layer,
  Scene,
} from '@babylonjs/core'

import SceneApplication from 'Util/SceneApplication'
import { mosaic } from 'Util/Texture'

const PerlinNoise: SceneApplication.SceneApplication = {
  createScene: (engine) => {
    const scene = new Scene(engine)
    scene.createDefaultCameraOrLight(false, true, false)

    const layer = new Layer('noise', null, scene, true)
    layer.texture = mosaic(4, scene)

    return Promise.resolve(scene)
  },
}

export default PerlinNoise
