struct Vertex {
  position : vec4<f32>;
  normal : vec4<f32>;
};

[[block]] struct Mesh {
  vertices : [[stride(32)]] array<Vertex>;
};

[[block]] struct Params {
  chunkSize : u32;
};

[[group(0), binding(0)]] var<storage, read_write> mesh : Mesh;
[[group(0), binding(1)]] var<uniform> params : Params;

let triangleOffsets = array<vec3<f32>, 3>(
  vec3<f32>(0.0, 0.0, 0.0),
  vec3<f32>(1.0, 0.0, 0.0),
  vec3<f32>(1.0, 0.0, 1.0),
);

let normal = vec4<f32>(0.0, 1.0, 0.0, 0.0);

[[stage(compute), workgroup_size(1, 1, 1)]]
fn main([[builtin(workgroup_id)]] workgroupID : vec3<u32>,
        [[builtin(global_invocation_id)]] globalInvocationID : vec3<u32>,
        [[builtin(local_invocation_index)]] localInvocationIndex: u32) {

  let offset : vec3<f32> = vec3<f32>(workgroupID);
  let indexOffset : u32  = (
      workgroupID.x * params.chunkSize * params.chunkSize
    + workgroupID.y * params.chunkSize
    + workgroupID.z
  ) * 3u;

  mesh.vertices[indexOffset     ].position = vec4<f32>(offset + triangleOffsets[0], 1.0);
  mesh.vertices[indexOffset + 1u].position = vec4<f32>(offset + triangleOffsets[1], 1.0);
  mesh.vertices[indexOffset + 2u].position = vec4<f32>(offset + triangleOffsets[2], 1.0);

  mesh.vertices[indexOffset     ].normal = normal;
  mesh.vertices[indexOffset + 1u].normal = normal;
  mesh.vertices[indexOffset + 2u].normal = normal;

}
