import {
  ArcRotateCamera,
  AxesViewer,
  Color3,
  ComputeShader,
  HemisphericLight,
  Mesh,
  Scene,
  StandardMaterial,
  StorageBuffer,
  UniformBuffer,
  Vector3,
  VertexData,
} from '@babylonjs/core'
import _ from 'lodash'

import type SceneApplication from 'Util/SceneApplication'

import {
  edgeCases,
  edgeVertexIndices,
  triangleCases,
  vertexOffsets,
} from './res/buffers'
import marchingCubesWGSL from './res/shaders/marchingCubes.wgsl'

const CHUNK_SIZE = 32
const NUM_VOXELS = CHUNK_SIZE ** 3

const MarchingCubes: SceneApplication.SceneApplication = {
  createScene: (engine) => {
    const scene = new Scene(engine)
    scene.useRightHandedSystem = true

    const canvas = engine.getRenderingCanvas()

    const camera = new ArcRotateCamera('Camera', Math.PI / 4, Math.PI / 4, 32, Vector3.Zero(), scene)

    camera.attachControl(canvas, true)

    /* eslint-disable @typescript-eslint/no-unused-vars */
    const light = new HemisphericLight('light', Vector3.Up(), scene)
    const axesViewer = new AxesViewer(scene)
    /* eslint-enable @typescript-eslint/no-unused-vars */

    const meshBuffer = new StorageBuffer(engine, 15 * NUM_VOXELS * 4 * 8)
    const paramsBuffer = new UniformBuffer(engine)
    const edgeCasesBuffer = new StorageBuffer(engine, 4 * 256)
    const vertexOffsetsBuffer = new StorageBuffer(engine, 4 * 4 * 8)
    const edgeVertexIndicesBuffer = new StorageBuffer(engine, 4 * 2 * 12)
    const triangleCasesBuffer = new StorageBuffer(engine, 4 * 256 * 16)

    paramsBuffer.updateInt('chunkSize', CHUNK_SIZE)
    paramsBuffer.update()
    edgeCasesBuffer.update(edgeCases)
    vertexOffsetsBuffer.update(vertexOffsets)
    edgeVertexIndicesBuffer.update(edgeVertexIndices)
    triangleCasesBuffer.update(triangleCases)

    const marchingCubesCompute = new ComputeShader(
      'marchingCubes',
      engine,
      { computeSource: marchingCubesWGSL },
      {
        bindingsMapping: {
          mesh: { group: 0, binding: 0 },
          params: { group: 0, binding: 1 },
          edgeCases: { group: 0, binding: 2 },
          vertexOffsets: { group: 0, binding: 3 },
          edgeVertexIndices: { group: 0, binding: 4 },
          triangleCases: { group: 0, binding: 5 },
        },
      },
    )

    marchingCubesCompute.setStorageBuffer('mesh', meshBuffer)
    marchingCubesCompute.setUniformBuffer('params', paramsBuffer)
    marchingCubesCompute.setStorageBuffer('edgeCases', edgeCasesBuffer)
    marchingCubesCompute.setStorageBuffer('vertexOffsets', vertexOffsetsBuffer)
    marchingCubesCompute.setStorageBuffer('edgeVertexIndices', edgeVertexIndicesBuffer)
    marchingCubesCompute.setStorageBuffer('triangleCases', triangleCasesBuffer)

    const terrainMesh = new Mesh('terrain', scene)
    const wireframeMesh = terrainMesh.clone('terrainWireframe')

    marchingCubesCompute
      .dispatchWhenReady(CHUNK_SIZE, CHUNK_SIZE, CHUNK_SIZE)
      .then(() => meshBuffer.read())
      .then((meshBufferData) => {
        const buffer = new Float32Array(meshBufferData.buffer)
        meshBuffer.dispose()

        const positions = new Float32Array(3 * 15 * NUM_VOXELS)
        const normals = new Float32Array(3 * 15 * NUM_VOXELS)

        for (let i = 0; i < 15 * NUM_VOXELS; i += 1) {
          positions[3 * i + 0] = buffer[8 * i + 0]
          positions[3 * i + 1] = buffer[8 * i + 1]
          positions[3 * i + 2] = buffer[8 * i + 2]

          normals[3 * i + 0] = buffer[8 * i + 4]
          normals[3 * i + 1] = buffer[8 * i + 5]
          normals[3 * i + 2] = buffer[8 * i + 6]
        }

        const vertexData = new VertexData()
        vertexData.positions = positions
        vertexData.indices = _.range(15 * NUM_VOXELS)
        vertexData.normals = normals

        vertexData.applyToMesh(terrainMesh)
        vertexData.applyToMesh(wireframeMesh)
      })

    const terrainMat = new StandardMaterial('terrainMat', scene)
    terrainMat.diffuseColor = new Color3(1.0, 1.0, 1.0)

    const wireframeMat = new StandardMaterial('wireframeMat', scene)
    wireframeMat.diffuseColor = new Color3(1.0, 0.0, 0.0)
    wireframeMat.wireframe = true
    wireframeMesh.material = wireframeMat

    return Promise.resolve(scene)
  },
  defineProperties: () => ({}),
}

export default MarchingCubes
