#include<sceneUboDeclaration>
#include<meshUboDeclaration>

attribute position : vec3<f32>;

varying vPosition : vec3<f32>;

@stage(vertex)
fn main(input : VertexInputs) -> FragmentInputs {
  gl_Position = scene.viewProjection * mesh.world * vec4<f32>(position, 1.0);
  vPosition = 32.0 * position;
}
