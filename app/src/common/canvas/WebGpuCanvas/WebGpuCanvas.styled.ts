import { styled } from '@channel.io/bezier-react'

import {
  flex,
  padding,
} from 'Styles/interpolations'
import EdgeInsets from 'Styles/models/EdgeInsets'

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  ${flex.container('vertical', { main: 'start', cross: 'start' })}
`

export const Padding = styled.div`
  ${padding(EdgeInsets.all(12))}
`
