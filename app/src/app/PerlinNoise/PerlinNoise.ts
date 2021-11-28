import {
  ArcRotateCamera,
  Scene,
  Vector3,
} from '@babylonjs/core'

import SceneApplication from 'Util/SceneApplication'

const PerlinNoise: SceneApplication.SceneApplication = {
  createScene: (engine) => {
    const scene = new Scene(engine)

    const canvas = engine.getRenderingCanvas()

    const camera = new ArcRotateCamera('Camera', Math.PI / 4, Math.PI / 4, 32, Vector3.Zero(), scene)
    camera.attachControl(canvas, true)

    return Promise.resolve(scene)
  },
}

export default PerlinNoise
