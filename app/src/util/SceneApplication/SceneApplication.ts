import type {
  Engine,
  Scene,
} from '@babylonjs/core'

namespace SceneApplication {
  export interface SceneApplication<T extends object = {}> {
    createScene(engine: Engine): Promise<Scene>
    defineProperties(engine: Engine, scene: Scene): PropertyMap<T>
  }

  export type Property<S> = {
    init: () => S
    update: (prev: S | null, current: S) => void
  }

  export type PropertyMap<T extends object> = {
    [K in keyof T]: Property<T[K]>
  }
}

export default SceneApplication
