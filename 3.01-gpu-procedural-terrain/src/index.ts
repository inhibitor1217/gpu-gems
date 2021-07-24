import init from './init'
import { Mesh, triangleMesh } from './mesh'
import basicWGSL from './shaders/basic.wgsl'
import GPUBufferUsage from './webgpu/GPUBufferUsage'

async function main() {
  const resources = await init()

  if (!resources) {
    return
  }

  const { adapter, device, context, canvas } = resources

  function configure() {
    const devicePixelRatio = window.devicePixelRatio ?? 1

    const presentationFormat = context.getPreferredFormat(adapter)

    context.configure({
      device,
      format: presentationFormat,
      size: [canvas.clientWidth * devicePixelRatio, canvas.clientHeight * devicePixelRatio, 1],
    })

    return presentationFormat
  }

  function createMappedBuffer(mesh: Mesh) {
    const buffer = device.createBuffer({
      size: mesh.vertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    })

    new Float32Array(buffer.getMappedRange()).set(mesh.vertexArray)

    buffer.unmap()

    return buffer
  }

  const presentationFormat = configure()

  const triangleVertexBuffer = createMappedBuffer(triangleMesh)

  const basicShaderModule = device.createShaderModule({ code: basicWGSL })

  const pipeline = device.createRenderPipeline({
    vertex: {
      module: basicShaderModule,
      entryPoint: 'vs_main',
      buffers: [
        {
          arrayStride: triangleMesh.stride,
          attributes: [
            {
              // position
              shaderLocation: 0,
              offset: triangleMesh.offsets.position,
              format: 'float32x2',
            },
          ],
        },
      ],
    },
    fragment: {
      module: basicShaderModule,
      entryPoint: 'fs_main',
      targets: [{ format: presentationFormat }],
    },
    primitive: {
      topology: 'triangle-list',
    },
  })

  function frame(time: number) {
    const commandEncoder = device.createCommandEncoder()

    const textureView = context.getCurrentTexture().createView()

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [
        {
          view: textureView,
          loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
          storeOp: 'store',
        },
      ],
    }

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
    passEncoder.setPipeline(pipeline)
    passEncoder.setVertexBuffer(0, triangleVertexBuffer)
    passEncoder.draw(3, 1, 0, 0)
    passEncoder.endPass()

    device.queue.submit([commandEncoder.finish()])

    window.requestAnimationFrame(frame)
  }

  window.requestAnimationFrame(frame)
}

main()

export default {}
