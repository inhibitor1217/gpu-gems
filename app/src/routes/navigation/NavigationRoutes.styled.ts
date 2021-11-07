import {
  styled,
  NavigationContent as BaseNavigationContent,
  Text,
  Typography,
} from '@channel.io/bezier-react'

import { padding } from 'Styles/interpolations'
import EdgeInsets from 'Styles/models/EdgeInsets'

export const RouteItemText = styled(Text)
  .attrs({ typo: Typography.Size14 })``

export const NavigationContent = styled(BaseNavigationContent)`
  ${padding(EdgeInsets.all(6))}
`
