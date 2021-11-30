import { css } from '@channel.io/bezier-react'
import type { InjectedInterpolation } from '@channel.io/bezier-react'

import EdgeInsets from 'Styles/models/EdgeInsets'

const padding = ({
  top, right, bottom, left,
}: EdgeInsets): InjectedInterpolation =>
  css`
    padding: ${top}px ${right}px ${bottom}px ${left}px;
  `

export default padding
