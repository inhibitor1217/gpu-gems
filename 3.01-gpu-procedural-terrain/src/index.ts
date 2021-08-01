import { mat4, vec3 } from 'gl-matrix'
import _ from 'lodash'
import { PerspectiveCamera } from './camera'
import init from './init'
import { Mesh, cubeMesh } from './mesh'
import { Transform } from './transform'
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

  const camera = new PerspectiveCamera()
  camera.setAspectRatio(presentationWidth / presentationHeight)

  const transform = new Transform()
  transform.setPosition(vec3.fromValues(0, 0, -4))

  let _time: number

  function update(deltaTime: number, time: number) {
    transform.rotateEulerX(deltaTime * 0.001)
    transform.rotateEulerY(deltaTime * 0.001)

    camera.setFOV(0.5 * Math.PI + 0.3 * Math.sin(time * 0.001))
  }

  function frame(time: number) {
    if (!_.isNil(_time)) {
      update(time - _time, time)
    }
    _time = time

    function getModelViewProjectionMatrix(): mat4 {
      const modelViewProjectionMatrix = mat4.create()
      mat4.multiply(modelViewProjectionMatrix, camera.getProjection(), transform.getLocalTransform())
      return modelViewProjectionMatrix
    }

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
