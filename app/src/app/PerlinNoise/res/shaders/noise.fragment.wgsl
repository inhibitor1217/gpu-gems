varying vPosition : vec3<f32>;

[[stage(fragment)]]
fn main(input : FragmentInputs) -> FragmentOutputs {
  gl_FragColor = vec4<f32>(vPosition, 1.0);
}
