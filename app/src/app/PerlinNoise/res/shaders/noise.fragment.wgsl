struct PermutationBuffer {
  items : array<u32, 256>;
};

struct GradientBuffer {
  items : array<vec3<f32>, 64>;
};

uniform time : f32;
uniform octaves : f32;
uniform scale : f32;
uniform lacunarity : f32;
uniform persistence : f32;

varying vPosition : vec3<f32>;

var<storage, read> permutation : PermutationBuffer;
var<storage, read> gradient : GradientBuffer;

// fn fade2d(t : vec2<f32>) -> vec2<f32> {
//   return t * t * t * (t * (t * 6. - 15.) + 10.);
// }

fn fade3d(t : vec3<f32>) -> vec3<f32> {
  return t * t * t * (t * (t * 6. - 15.) + 10.);
}

// fn noise2d(p : vec2<f32>) -> f32 {
//   var i : vec2<u32> = vec2<u32>(vec2<i32>(floor(p)) & vec2<i32>(0xFF, 0xFF));

//   var _i00 : u32 = permutation.items[i.x] + i.y;
//   var _i01 : u32 = _i00 + 1u;
//   var _i10 : u32 = permutation.items[(i.x + 1u) & 0xFFu] + i.y;
//   var _i11 : u32 = _i10 + 1u;

//   var i00 : u32 = permutation.items[_i00 & 0xFFu] & 0x3Fu;
//   var i01 : u32 = permutation.items[_i01 & 0xFFu] & 0x3Fu;
//   var i10 : u32 = permutation.items[_i10 & 0xFFu] & 0x3Fu;
//   var i11 : u32 = permutation.items[_i11 & 0xFFu] & 0x3Fu;

//   var f = fract(p);
//   var e : vec2<f32> = fade2d(f);

//   return mix(
//     mix(
//       dot(gradient.items[i00], f),
//       dot(gradient.items[i10], f - vec2<f32>(1., 0.)),
//       e.x,
//     ),
//     mix(
//       dot(gradient.items[i01], f - vec2<f32>(0., 1.)),
//       dot(gradient.items[i11], f - vec2<f32>(1., 1.)),
//       e.x,
//     ),
//     e.y,
//   );
// }

fn noise3d(p : vec3<f32>) -> f32 {
  var i : vec3<u32> = vec3<u32>(vec3<i32>(floor(p)) & vec3<i32>(0xFF, 0xFF, 0xFF));

  var _i00 : u32 = permutation.items[i.x] + i.y;
  var _i01 : u32 = _i00 + 1u;
  var _i10 : u32 = permutation.items[(i.x + 1u) & 0xFFu] + i.y;
  var _i11 : u32 = _i10 + 1u;

  var _i000 : u32 = permutation.items[_i00 & 0xFFu] + i.z;
  var _i001 : u32 = _i000 + 1u;
  var _i010 : u32 = permutation.items[_i01 & 0xFFu] + i.z;
  var _i011 : u32 = _i010 + 1u;
  var _i100 : u32 = permutation.items[_i10 & 0xFFu] + i.z;
  var _i101 : u32 = _i100 + 1u;
  var _i110 : u32 = permutation.items[_i11 & 0xFFu] + i.z;
  var _i111 : u32 = _i110 + 1u;

  var i000 : u32 = permutation.items[_i000 & 0xFFu] & 0x3Fu;
  var i001 : u32 = permutation.items[_i001 & 0xFFu] & 0x3Fu;
  var i010 : u32 = permutation.items[_i010 & 0xFFu] & 0x3Fu;
  var i011 : u32 = permutation.items[_i011 & 0xFFu] & 0x3Fu;
  var i100 : u32 = permutation.items[_i100 & 0xFFu] & 0x3Fu;
  var i101 : u32 = permutation.items[_i101 & 0xFFu] & 0x3Fu;
  var i110 : u32 = permutation.items[_i110 & 0xFFu] & 0x3Fu;
  var i111 : u32 = permutation.items[_i111 & 0xFFu] & 0x3Fu;

  var f : vec3<f32> = fract(p);
  var e : vec3<f32> = fade3d(f);

  return mix(
    mix(
      mix(
        dot(gradient.items[i000], f),
        dot(gradient.items[i100], f - vec3<f32>(1., 0., 0.)),
        e.x,
      ),
      mix(
        dot(gradient.items[i010], f - vec3<f32>(0., 1., 0.)),
        dot(gradient.items[i110], f - vec3<f32>(1., 1., 0.)),
        e.x,
      ),
      e.y,
    ),
    mix(
      mix(
        dot(gradient.items[i001], f - vec3<f32>(0., 0., 1.)),
        dot(gradient.items[i101], f - vec3<f32>(1., 0., 1.)),
        e.x,
      ),
      mix(
        dot(gradient.items[i011], f - vec3<f32>(0., 1., 1.)),
        dot(gradient.items[i111], f - vec3<f32>(1., 1., 1.)),
        e.x,
      ),
      e.y,
    ),
    e.z,
  );
}

fn noiseWithOctaves(position : vec2<f32>,
                    time : f32) -> f32 {
  var intensity : f32 = 0.0;

  for (var octave : f32 = 0.0; octave < uniforms.octaves; octave = octave + 1.0) {
    intensity = intensity
      + pow(uniforms.persistence, octave) *
        noise3d(vec3<f32>(
          (position + octave * vec2<f32>(1., 1.)) * uniforms.scale * pow(uniforms.lacunarity, octave),
          time,
        ));
  }

  return intensity;
}

@stage(fragment)
fn main(input : FragmentInputs) -> FragmentOutputs {
  var out = noiseWithOctaves(vPosition.xy, uniforms.time);
  gl_FragColor = vec4<f32>((out * 0.5 + 0.5) * vec3<f32>(1., 1., 1.), 1.);
}
