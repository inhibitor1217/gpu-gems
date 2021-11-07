import type {
  Engine,
  Scene,
} from '@babylonjs/core'

namespace SceneApplication {
  export interface SceneApplication {
    createScene(
      canvas: HTMLCanvasElement,
      engine: Engine,
    ): Promise<Scene>
  }
}

export default SceneApplication
