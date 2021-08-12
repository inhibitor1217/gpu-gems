struct Vertex {
  [[size(16)]] position : vec3<f32>;
  [[size(16)]] normal   : vec3<f32>;
};

[[block]] struct Mesh {
  vertices : [[stride(32)]] array<Vertex>;
};

[[block]] struct Params {
  chunkSize : u32;
};

[[block]] struct EdgeCases {
  elements : [[stride(4)]] array<u32, 256>;
};

[[block]] struct VertexOffsets {
  elements : [[stride(16)]] array<vec3<f32>, 8>;
};

[[block]] struct EdgeVertexIndices {
  elements : [[stride(8)]] array<vec2<u32>, 12>;
};

[[block]] struct TriangleCases {
  elements: [[stride(4)]] array<u32, 4096>;
};

[[group(0), binding(0)]] var<storage, read_write> mesh : Mesh;
[[group(0), binding(1)]] var<uniform> params : Params;
[[group(0), binding(2)]] var<storage, read> edgeCases : EdgeCases;
[[group(0), binding(3)]] var<storage, read> vertexOffsets : VertexOffsets;
[[group(0), binding(4)]] var<storage, read> edgeVertexIndices : EdgeVertexIndices;
[[group(0), binding(5)]] var<storage, read> triangleCases: TriangleCases;

let sphereCenter : vec3<f32> = vec3<f32>(0.0, 0.0, 0.0);
let sphereRadius : f32 = 12.0;

fn density(position : vec3<f32>) -> f32 {
  return -position.y;
}

// normal(x) = normalize(- ∇ density(x))
fn normal(position : vec3<f32>) -> vec3<f32> {
  return normalize(vec3<f32>(0.0, 1.0, 0.0));
}

fn progress(one : f32,
            two : f32) -> f32 {
  if (two - one == 0.0) {
    return 0.5;
  }

  return - one / (two - one);
}

[[stage(compute), workgroup_size(1, 1, 1)]]
fn main([[builtin(workgroup_id)]] workgroupID : vec3<u32>,
        [[builtin(global_invocation_id)]] globalInvocationID : vec3<u32>,
        [[builtin(local_invocation_index)]] localInvocationIndex: u32) {
  
  let correction : vec3<f32> = -0.5 * f32(params.chunkSize) * vec3<f32>(1.0, 1.0, 1.0);
  let offset : vec3<f32>     = vec3<f32>(workgroupID) + correction;

  // Calculate density function at each cube vertex.
  var cubeDensities : array<f32, 8> = array<f32, 8>(
    density(offset                           ),
    density(offset + vec3<f32>(1.0, 0.0, 0.0)),
    density(offset + vec3<f32>(1.0, 1.0, 0.0)),
    density(offset + vec3<f32>(0.0, 1.0, 0.0)),
    density(offset + vec3<f32>(0.0, 0.0, 1.0)),
    density(offset + vec3<f32>(1.0, 0.0, 1.0)),
    density(offset + vec3<f32>(1.0, 1.0, 1.0)),
    density(offset + vec3<f32>(0.0, 1.0, 1.0)),
  );

  // Determine cube case.
  var cubeCase : u32 = 0u;
  for (var i : u32 = 0u; i < 8u; i = i + 1u) {
    if (cubeDensities[i] > 0.0) {
      cubeCase = cubeCase | (1u << i);
    }
  }

  // If this voxel is not at the surface, return immediately
  if (cubeCase == 0x00u ||
      cubeCase == 0xffu) {
    return;
  }

  // Find edge case from lookup table.
  let edgeCase : u32 = edgeCases.elements[cubeCase];

  // Calculate vertex position where the density is exactly zero.
  var edgeVertices : array<vec3<f32>, 12> = array<vec3<f32>, 12>();
  for (var i : u32 = 0u; i < 12u; i = i + 1u) {
    if ((edgeCase & (1u << i)) != 0u) {
      var vertexOneIndex : u32 = edgeVertexIndices.elements[i].x;
      var vertexTwoIndex : u32 = edgeVertexIndices.elements[i].y;

      var densityOne : f32 = cubeDensities[vertexOneIndex];
      var densityTwo : f32 = cubeDensities[vertexTwoIndex];

      var _progress  : f32 = progress(densityOne, densityTwo);

      edgeVertices[i] = offset
        + vertexOffsets.elements[vertexOneIndex] * (1.0 - _progress)
        + vertexOffsets.elements[vertexTwoIndex] * _progress;
    }
  }

  let indexOffset : u32 = (
      workgroupID.x * params.chunkSize * params.chunkSize
    + workgroupID.y * params.chunkSize
    + workgroupID.z
  ) * 15u;

  // Fill at most 5 triangles per voxel.
  for (var i : u32 = 0u; i < 5u; i = i + 1u) {
    let baseIndex : u32 = cubeCase * 16u + i * 3u;
    let edgeVertexFirstIndex : u32 = triangleCases.elements[baseIndex];

    if (edgeVertexFirstIndex < 0u) {
      return;
    }

    let vertexIndex0 : u32 = triangleCases.elements[baseIndex];
    let position0 : vec3<f32> = edgeVertices[vertexIndex0];
    mesh.vertices[indexOffset + i * 3u     ].position = position0;
    mesh.vertices[indexOffset + i * 3u     ].normal   = normal(position0);

    let vertexIndex1 : u32 = triangleCases.elements[baseIndex + 1u];
    let position1 : vec3<f32> = edgeVertices[vertexIndex1];
    mesh.vertices[indexOffset + i * 3u + 1u].position = position1;
    mesh.vertices[indexOffset + i * 3u + 1u].normal   = normal(position1);

    let vertexIndex2 : u32 = triangleCases.elements[baseIndex + 2u];
    let position2 : vec3<f32> = edgeVertices[vertexIndex2];
    mesh.vertices[indexOffset + i * 3u + 2u].position = position2;
    mesh.vertices[indexOffset + i * 3u + 2u].normal   = normal(position2);
  }
}
