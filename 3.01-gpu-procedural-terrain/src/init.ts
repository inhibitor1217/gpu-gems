export default async function init() {
  if (!navigator.gpu) {
    console.warn('WebGPU is not supported or enabled in this browser.')
    return null
  }

  const adapter = await navigator.gpu.requestAdapter()
  const device = await adapter?.requestDevice()

  const canvas = document.getElementById('renderCanvas')

  if (!canvas || !(canvas instanceof HTMLCanvasElement)) {
    console.warn('HTMLCanvasElement with id #renderCanvas not found.')
    return null
  }

  if (!adapter || !device) {
    console.warn('GPUAdapter or GPUDevice was not created.')
    return null
  }

  const context = canvas.getContext('webgpu')

  if (!context) {
    console.warn('unable to get WebGPU context from canvas.')
    return null
  }

  return { adapter, device, context, canvas }
}
