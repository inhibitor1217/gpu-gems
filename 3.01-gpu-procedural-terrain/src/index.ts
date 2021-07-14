async function main() {
  if (!navigator.gpu) {
    console.warn('WebGPU is not supported or enabled in this browser.')
    return
  }

  const adapter = await navigator.gpu.requestAdapter()
  const device = await adapter?.requestDevice()

  const canvas = document.getElementById('renderCanvas')

  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    console.warn('HTMLCanvasElement with id #renderCanvas not found.')
    return
  }

  const context = canvas.getContext('webgpu')
}

main()

export default {}
