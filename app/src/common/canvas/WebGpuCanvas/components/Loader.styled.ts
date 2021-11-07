import {
  styled,
  Spinner as BaseSpinner,
} from '@channel.io/bezier-react'

import { flex } from 'Styles/interpolations'

export const Spinner = styled(BaseSpinner)`
  ${flex.centered()}
`
