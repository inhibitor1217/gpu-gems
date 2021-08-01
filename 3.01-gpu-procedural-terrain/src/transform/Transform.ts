import { vec3, quat, mat4 } from 'gl-matrix'

export default class Transform {
  _position: vec3
  _rotation: quat
  _scale: vec3
  _localTransformation: mat4
  _updated: boolean

  constructor() {
    this._position = vec3.create()
    this._rotation = quat.create()
    this._scale = vec3.fromValues(1, 1, 1)
    this._localTransformation = mat4.create()
    this._updated = false
  }

  getLocalTransform(): mat4 {
    if (this._updated) {
      mat4.fromRotationTranslationScale(this._localTransformation, this._rotation, this._position, this._scale)
      this._updated = false
    }
    return this._localTransformation
  }

  getPosition(): vec3 {
    return vec3.copy(vec3.create(), this._position)
  }
  setPosition(position: vec3): void {
    if (!vec3.equals(this._position, position)) {
      vec3.copy(this._position, position)
      this._updated = true
    }
  }

  getRotation(): quat {
    return quat.copy(quat.create(), this._rotation)
  }
  setRotation(rotation: quat): void {
    if (!quat.equals(this._rotation, rotation)) {
      quat.copy(this._rotation, rotation)
      this._updated = true
    }
  }
  rotateEulerX(angle: number): void {
    quat.rotateX(this._rotation, this._rotation, angle)
    this._updated = true
  }
  rotateEulerY(angle: number): void {
    quat.rotateY(this._rotation, this._rotation, angle)
    this._updated = true
  }
  rotateEulerZ(angle: number): void {
    quat.rotateZ(this._rotation, this._rotation, angle)
    this._updated = true
  }

  getScale(): vec3 {
    return vec3.copy(vec3.create(), this._scale)
  }
  setScale(scale: vec3): void {
    if (!vec3.equals(this._scale, scale)) {
      vec3.copy(this._scale, scale)
      this._updated = true
    }
  }
}
