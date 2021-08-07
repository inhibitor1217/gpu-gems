import { ArcRotateCamera, HemisphericLight, Mesh, MeshBuilder, Scene, Vector3, WebGPUEngine } from '@babylonjs/core'

class App {
  private readonly canvas: HTMLCanvasElement

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
  }

  async run(): Promise<void> {
    const engine = new WebGPUEngine(this.canvas)
    await engine.initAsync()

    const scene = new Scene(engine)

    const camera: ArcRotateCamera = new ArcRotateCamera('Camera', Math.PI / 2, Math.PI / 2, 2, Vector3.Zero(), scene)
    camera.attachControl(this.canvas, true)

    const light1: HemisphericLight = new HemisphericLight('light1', new Vector3(1, 1, 0), scene)

    engine.runRenderLoop(() => {
      scene.render()
    })
  }
}

export default App
