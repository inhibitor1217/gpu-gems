struct Vertex {
  position: vec4<f32>;
  normal: vec4<f32>;
};

[[block]] struct Mesh {
  vertices: [[stride(32)]] array<Vertex>;
};

[[group(0), binding(0)]] var<storage, read_write> mesh : Mesh;

[[stage(compute), workgroup_size(64, 1, 1)]]
fn main([[builtin(local_invocation_id)]] localInvocationID : vec3<u32>,
        [[builtin(local_invocation_index)]] localInvocationIndex: u32) {

  let offset : vec3<f32> = vec3<f32>(f32(localInvocationID.x), 0.0, 0.0);

  mesh.vertices[3u * localInvocationIndex].position = vec4<f32>(offset, 1.0);
  mesh.vertices[3u * localInvocationIndex + 1u].position = vec4<f32>(offset + vec3<f32>(1.0, 0.0, 0.0), 1.0);
  mesh.vertices[3u * localInvocationIndex + 2u].position = vec4<f32>(offset + vec3<f32>(1.0, 0.0, 1.0), 1.0);

  mesh.vertices[3u * localInvocationIndex].normal = vec4<f32>(0.0, 1.0, 0.0, 0.0);
  mesh.vertices[3u * localInvocationIndex + 1u].normal = vec4<f32>(0.0, 1.0, 0.0, 0.0);
  mesh.vertices[3u * localInvocationIndex + 2u].normal = vec4<f32>(0.0, 1.0, 0.0, 0.0);

}
