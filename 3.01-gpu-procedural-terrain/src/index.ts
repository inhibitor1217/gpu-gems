import { mat4, vec3 } from 'gl-matrix'
import _ from 'lodash'
import init from './init'
import { Mesh, cubeMesh } from './mesh'
import basicWGSL from './shaders/basic.wgsl'

async function main() {
  const resources = await init()

  if (!resources) {
    return
  }

  const { adapter, device, context, canvas } = resources

  function configure() {
    const devicePixelRatio = window.devicePixelRatio ?? 1

    const presentationSize = [canvas.clientWidth * devicePixelRatio, canvas.clientHeight * devicePixelRatio, 1]
    const presentationFormat = context.getPreferredFormat(adapter)

    context.configure({
      device,
      format: presentationFormat,
      size: presentationSize,
    })

    return { presentationFormat, presentationSize }
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

  const { presentationSize, presentationFormat } = configure()
  const [presentationWidth, presentationHeight] = presentationSize

  const vertexBuffer = createMappedBuffer(cubeMesh)

  const basicShaderModule = device.createShaderModule({ code: basicWGSL })

  const pipeline = device.createRenderPipeline({
    vertex: {
      module: basicShaderModule,
      entryPoint: 'vs_main',
      buffers: [
        {
          arrayStride: cubeMesh.stride,
          attributes: [
            {
              // position
              shaderLocation: 0,
              offset: cubeMesh.offsets.position,
              format: 'float32x4',
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
      cullMode: 'back', // NOTE: enable back-face culling.
    },

    // NOTE: enable depth test.
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth24plus',
    },
  })

  const depthTexture = device.createTexture({
    size: presentationSize,
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  })

  const uniformBufferSize = 4 * 16 // mat4x4<f32>
  const uniformBuffer = device.createBuffer({
    size: uniformBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })

  const uniformBindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      {
        binding: 0,
        resource: {
          buffer: uniformBuffer,
        },
      },
    ],
  })

  const renderPassDescriptor: GPURenderPassDescriptor = {
    // @ts-ignore
    colorAttachments: [
      {
        view: undefined, // NOTE: will be assigned later
        loadValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
        storeOp: 'store',
      },
    ],
    depthStencilAttachment: {
      view: depthTexture.createView(),

      depthLoadValue: 1.0,
      depthStoreOp: 'store',
      stencilLoadValue: 0,
      stencilStoreOp: 'store',
    },
  }

  const near = 0.1
  const far = 120
  const fov = 0.5 * Math.PI
  const aspectRatio = presentationWidth / presentationHeight
  const projectionMatrix = mat4.create()
  mat4.perspective(projectionMatrix, fov, aspectRatio, near, far)

  function getModelViewProjectionMatrix(): mat4 {
    const viewMatrix = mat4.create()
    mat4.translate(viewMatrix, viewMatrix, vec3.fromValues(0, 0, -4))
    mat4.rotate(viewMatrix, viewMatrix, 1, vec3.fromValues(Math.sin(Date.now() / 1000), Math.cos(Date.now() / 1000), 0))

    const modelViewProjectionMatrix = mat4.create()
    mat4.multiply(modelViewProjectionMatrix, projectionMatrix, viewMatrix)
    return modelViewProjectionMatrix
  }

  function frame(time: number) {
    const modelViewProjectionMatrix = getModelViewProjectionMatrix() as Float32Array
    device.queue.writeBuffer(
      uniformBuffer,
      0,
      modelViewProjectionMatrix.buffer,
      modelViewProjectionMatrix.byteOffset,
      modelViewProjectionMatrix.byteLength
    )

    const textureView = context.getCurrentTexture().createView()
    _.set(renderPassDescriptor.colorAttachments, '[0].view', textureView)

    const commandEncoder = device.createCommandEncoder()
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
    passEncoder.setPipeline(pipeline)
    passEncoder.setBindGroup(0, uniformBindGroup)
    passEncoder.setVertexBuffer(0, vertexBuffer)
    passEncoder.draw(cubeMesh.count, 1, 0, 0)
    passEncoder.endPass()

    device.queue.submit([commandEncoder.finish()])

    window.requestAnimationFrame(frame)
  }

  window.requestAnimationFrame(frame)
}

main()

export default {}
