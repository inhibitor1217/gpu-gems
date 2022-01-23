import { styled } from '@channel.io/bezier-react'

import {
  flex,
  padding,
} from 'Styles/interpolations'
import EdgeInsets from 'Styles/models/EdgeInsets'

export const List = styled.div`
  ${flex.container('vertical', { main: 'start', cross: 'stretch' })}
  ${padding(EdgeInsets.all(8))}

  min-width: 300px;

  > * + * {
    margin-top: 8px;
  }
`
