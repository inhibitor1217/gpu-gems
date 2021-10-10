import { styled } from '@channel.io/bezier-react'

import { flex, padding } from 'Styles/interpolations'
import EdgeInsets from 'Styles/models/EdgeInsets'

const HEIGHT_PX = 72;

export const Container = styled.div`
  ${flex.container('horizontal', { cross: 'center' })}

  height: ${HEIGHT_PX}px;

  ${padding(EdgeInsets.symmetric({ horizontal: 20, vertical: 12 }))}
`
