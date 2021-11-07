import type {
  Engine,
  Scene,
} from '@babylonjs/core'

namespace SceneApplication {
  export interface SceneApplication {
    createScene(engine: Engine): Promise<Scene>
  }
}

export default SceneApplication
