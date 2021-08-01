[[block]] struct Uniforms {
  modelViewProjectionMatrix: mat4x4<f32>;
};
[[binding(0), group(0)]] var<uniform> uniforms: Uniforms;

struct VertexOutput {
  [[builtin(position)]] position: vec4<f32>;
};

[[stage(vertex)]]
fn vs_main([[location(0)]] position: vec4<f32>) -> VertexOutput {
  var output: VertexOutput;
  output.position = uniforms.modelViewProjectionMatrix * position;
  return output;
}

[[stage(fragment)]]
fn fs_main([[builtin(position)]] coord: vec4<f32>) -> [[location(0)]] vec4<f32> {
  return vec4<f32>(1.0, 1.0, 1.0, 1.0);
}
