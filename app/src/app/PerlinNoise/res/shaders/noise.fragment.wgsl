[[block]] struct PermutationBuffer {
  items : array<u32, 256>;
};

[[block]] struct GradientsBuffer {
  items : array<vec3<f32>, 16>;
};

varying vPosition : vec3<f32>;

var<storage, read> permutation : PermutationBuffer;
var<storage, read> gradients : GradientsBuffer;

fn fade2d(t : vec2<f32>) -> vec2<f32> {
  return t * t * t * (t * (t * 6. - 15.) + 10.);
}

fn noise2d(p : vec2<f32>) -> f32 {
  var i : vec2<u32> = vec2<u32>(vec2<i32>(floor(p)) & vec2<i32>(0xFF, 0xFF));

  var _i00 : u32 = permutation.items[i.x] + i.y;
  var _i01 : u32 = _i00 + 1u;
  var _i10 : u32 = permutation.items[(i.x + 1u) & 0xFFu] + i.y;
  var _i11 : u32 = _i10 + 1u;

  var i00 : u32 = permutation.items[_i00 & 0xFFu] % 0x0Fu;
  var i01 : u32 = permutation.items[_i01 & 0xFFu] % 0x0Fu;
  var i10 : u32 = permutation.items[_i10 & 0xFFu] % 0x0Fu;
  var i11 : u32 = permutation.items[_i11 & 0xFFu] % 0x0Fu;

  return f32(i00) * 0.0625;
}

[[stage(fragment)]]
fn main(input : FragmentInputs) -> FragmentOutputs {
  gl_FragColor = vec4<f32>(vec3<f32>(1., 1., 1.) * noise2d(vPosition.xy), 1.);
}
