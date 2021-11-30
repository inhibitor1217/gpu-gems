import {
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Scene,
  Vector3,
} from '@babylonjs/core'

import type SceneApplication from 'Util/SceneApplication'

const SimpleSceneApplication: SceneApplication.SceneApplication = {
  createScene: (engine) => {
    const scene = new Scene(engine)
    const canvas = engine.getRenderingCanvas()

    const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene)
    camera.setTarget(Vector3.Zero())
    camera.attachControl(canvas, true)

    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene)
    light.intensity = 0.7

    const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2, segments: 32 }, scene)
    sphere.position.y = 1

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const ground = MeshBuilder.CreateGround('ground', { width: 6, height: 6 }, scene)
    /* eslint-enable @typescript-eslint/no-unused-vars */

    return Promise.resolve(scene)
  },
}

export default SimpleSceneApplication
