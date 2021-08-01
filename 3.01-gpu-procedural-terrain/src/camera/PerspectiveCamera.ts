import { mat4 } from 'gl-matrix'

export default class PerspectiveCamera {
  _near: number
  _far: number
  _fov: number
  _aspectRatio: number
  _projection: mat4
  _updated: boolean

  constructor() {
    this._near = 0.1
    this._far = 120.0
    this._fov = 0.5 * Math.PI
    this._aspectRatio = 1.33
    this._projection = mat4.create()
    this._updated = true
  }

  getProjection(): mat4 {
    if (this._updated) {
      mat4.perspective(this._projection, this._fov, this._aspectRatio, this._near, this._far)
      this._updated = false
    }
    return this._projection
  }

  getNear(): number {
    return this._near
  }
  setNear(near: number) {
    this._near = near
    this._updated = true
  }

  getFar(): number {
    return this._far
  }
  setFar(far: number) {
    this._far = far
    this._updated = true
  }

  getFOV(): number {
    return this._fov
  }
  setFOV(fov: number) {
    this._fov = fov
    this._updated = true
  }

  getAspectRatio(): number {
    return this._aspectRatio
  }
  setAspectRatio(aspectRatio: number) {
    this._aspectRatio = aspectRatio
    this._updated = true
  }
}
