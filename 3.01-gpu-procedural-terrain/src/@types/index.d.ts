interface HTMLCanvasElement extends HTMLElement {
  getContext(contextId: 'webgpu'): GPUPresentationContext | null
}
