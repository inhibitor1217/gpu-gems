import { css } from '@channel.io/bezier-react'
import type { InjectedInterpolation } from '@channel.io/bezier-react'

export default class EdgeInsets {
  readonly top: number
  readonly right: number
  readonly bottom: number
  readonly left: number

  private constructor(values: {
    top?: number
    right?: number
    bottom?: number
    left?: number
  }) {
    this.top = values.top ?? 0
    this.right = values.right ?? 0
    this.bottom = values.bottom ?? 0
    this.left = values.left ?? 0
  }

  static zero: EdgeInsets = new EdgeInsets({})

  static all = (offset: number): EdgeInsets =>
    new EdgeInsets({
      top: offset,
      right: offset,
      bottom: offset,
      left: offset,
    })

  static fromLTRB = (left: number, top: number, right: number, bottom: number): EdgeInsets =>
    new EdgeInsets({ left, top, right, bottom })
  
  static only =
    (direction: 'left' | 'top' | 'right' | 'bottom',
     offset: number): EdgeInsets =>
    new EdgeInsets({ [direction]: offset })
  
  static symmetric = (values: { horizontal?: number, vertical?: number }): EdgeInsets =>
    new EdgeInsets({
      top: values.vertical,
      bottom: values.vertical,
      left: values.horizontal,
      right: values.horizontal,
    })
  
  get interpolation(): InjectedInterpolation {
    return css`
      padding: ${this.top}px ${this.right}px ${this.bottom}px ${this.left}px;
    `
  }
}
