import {
  RawTexture,
  Scene,
  Texture,
} from '@babylonjs/core'

import * as Color from 'Util/Color'

const RESOLUTION = 2
const MONOCHROME_MOSAIC_BUFFER = () => new Uint8Array([
  ...Color.parseToRGBAInteger(Color.palette['bg-grey-darkest']),
  ...Color.parseToRGBAInteger(Color.palette['bg-grey-lightest']),
  ...Color.parseToRGBAInteger(Color.palette['bg-grey-lightest']),
  ...Color.parseToRGBAInteger(Color.palette['bg-grey-darkest']),
])

const monochromeMosaic = (scene: Scene): Texture =>
  RawTexture.CreateRGBATexture(
    MONOCHROME_MOSAIC_BUFFER(),
    RESOLUTION,
    RESOLUTION,
    scene,
    false,
    undefined,
    Texture.NEAREST_NEAREST,
    undefined,
  )

export default monochromeMosaic
