import {
  RawTexture,
  Scene,
  Texture,
} from '@babylonjs/core'

import * as Color from 'Util/Color'
import { A, F } from 'Util/Fx'

const COLOR_TABLE_SIZE = 4
const COLOR_TABLE = ([
  'bgtxt-red-normal',
  'bgtxt-blue-normal',
  'bgtxt-cobalt-normal',
  'bgtxt-teal-normal',
  'bgtxt-green-normal',
  'bgtxt-olive-normal',
  'bgtxt-yellow-normal',
  'bgtxt-orange-normal',
  'bgtxt-pink-normal',
  'bgtxt-purple-normal',
  'bgtxt-navy-normal',
  'bg-grey-darkest',
  'bg-grey-dark',
  'bg-grey-light',
  'bg-grey-lighter',
  'bgtxt-absolute-white-dark',
] as const)
  .map((semanticName) => Color.palette[semanticName])
  .map(Color.parseToRGBAInteger)

const colorTableCoord = (resolution: number) => (i: number): [number, number] =>
  [Math.floor(i / resolution) % COLOR_TABLE_SIZE, i % COLOR_TABLE_SIZE]

const coordToIndex = ([x, y]: [number, number]): number => x * COLOR_TABLE_SIZE + y

const mosaicBuffer = (resolution: number) =>
  new Uint8Array(
    A.flatten(
      [...F.range(resolution ** 2)]
        .map(colorTableCoord(resolution))
        .map(coordToIndex)
        .map((i) => COLOR_TABLE[i]),
    ),
  )

const mosaic = (resolution: number, scene: Scene): Texture =>
  RawTexture.CreateRGBATexture(
    mosaicBuffer(resolution),
    resolution,
    resolution,
    scene,
    false,
    undefined,
    Texture.NEAREST_NEAREST,
    undefined,
  )

export default mosaic
