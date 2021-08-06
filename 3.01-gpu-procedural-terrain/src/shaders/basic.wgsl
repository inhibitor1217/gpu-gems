[[block]] struct TransformParams {
  transformation: mat4x4<f32>;
};

[[block]] struct CameraParams {
  inverse_camera_transformation: mat4x4<f32>;
  projection: mat4x4<f32>;
};

[[binding(0), group(0)]] var<uniform> transformParams: TransformParams;
[[binding(1), group(0)]] var<uniform> cameraParams: CameraParams;

struct VertexOutput {
  [[builtin(position)]] position: vec4<f32>;
  [[location(0)]] world_normal: vec3<f32>;
};

[[stage(vertex)]]
fn vs_main([[location(0)]] position: vec3<f32>,
           [[location(1)]] normal: vec3<f32>) -> VertexOutput {
  var output: VertexOutput;
  
  output.position = cameraParams.projection *
    cameraParams.inverse_camera_transformation * 
    transformParams.transformation *
    vec4<f32>(position, 1.0);
  
  output.world_normal = (transformParams.transformation * vec4<f32>(normal, 0.0)).xyz;

  return output;
}

let light_direction = vec3<f32>(1.0, 1.0, 1.0);
let light_intensity: f32 = 1.0;
let light_color = vec3<f32>(1.0, 1.0, 1.0);

[[stage(fragment)]]
fn fs_main([[builtin(position)]] coord: vec4<f32>,
           [[location(0)]] world_normal: vec3<f32>) -> [[location(0)]] vec4<f32> {
  var n_world_normal = normalize(world_normal);
  var n_light_direction = normalize(light_direction);
  var diffuse = clamp(dot(n_world_normal, n_light_direction), 0.0, 1.0);
  
  return vec4<f32>(diffuse * light_intensity * light_color, 1.0);
}
