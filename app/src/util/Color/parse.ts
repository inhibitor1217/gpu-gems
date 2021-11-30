import { F } from 'Util/Fx'

import type { PaletteColor } from './type'

const BYTE_MAX = 255

const rgb = (color: PaletteColor): number[] =>
  [[0, 2], [2, 4], [4, 6]]
    .map(([s, e]) => color.substring(1).substring(s, e))
    .map((c) => parseInt(c, 16))

const rgba = F.pipe(rgb, (c) => [...c, BYTE_MAX])

export const parseToRGBAInteger = rgba

export const parseToRGBA = F.pipe(rgba, (colors) => colors.map((c) => c / BYTE_MAX))
