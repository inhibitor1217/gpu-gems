[[block]] struct PermutationBuffer {
  items : array<u32, 256>;
};

[[block]] struct GradientBuffer {
  items : array<vec2<f32>, 64>;
};

varying vPosition : vec3<f32>;

var<storage, read> permutation : PermutationBuffer;
var<storage, read> gradient : GradientBuffer;

fn fade2d(t : vec2<f32>) -> vec2<f32> {
  return t * t * t * (t * (t * 6. - 15.) + 10.);
}

fn noise2d(p : vec2<f32>) -> f32 {
  var i : vec2<u32> = vec2<u32>(vec2<i32>(floor(p)) & vec2<i32>(0xFF, 0xFF));

  var _i00 : u32 = permutation.items[i.x] + i.y;
  var _i01 : u32 = _i00 + 1u;
  var _i10 : u32 = permutation.items[(i.x + 1u) & 0xFFu] + i.y;
  var _i11 : u32 = _i10 + 1u;

  var i00 : u32 = permutation.items[_i00 & 0xFFu] & 0x3Fu;
  var i01 : u32 = permutation.items[_i01 & 0xFFu] & 0x3Fu;
  var i10 : u32 = permutation.items[_i10 & 0xFFu] & 0x3Fu;
  var i11 : u32 = permutation.items[_i11 & 0xFFu] & 0x3Fu;

  var f = fract(p);
  var e : vec2<f32> = fade2d(f);

  return mix(
    mix(
      dot(gradient.items[i00], f),
      dot(gradient.items[i10], f - vec2<f32>(1., 0.)),
      e.x,
    ),
    mix(
      dot(gradient.items[i01], f - vec2<f32>(0., 1.)),
      dot(gradient.items[i11], f - vec2<f32>(1., 1.)),
      e.x,
    ),
    e.y,
  );
}

[[stage(fragment)]]
fn main(input : FragmentInputs) -> FragmentOutputs {
  gl_FragColor = vec4<f32>(vec3<f32>(1., 1., 1.) * (noise2d(vPosition.xy) * 0.5 + 0.5), 1.);
}
