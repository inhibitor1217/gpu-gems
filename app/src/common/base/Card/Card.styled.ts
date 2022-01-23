import { styled } from '@channel.io/bezier-react'

import { padding } from 'Styles/interpolations'
import EdgeInsets from 'Styles/models/EdgeInsets'

export const Card = styled.div`
  ${padding(EdgeInsets.all(8))}

  ${({ foundation }) => foundation?.elevation.ev3()}
  ${({ foundation }) => foundation?.rounding.round12}
`
