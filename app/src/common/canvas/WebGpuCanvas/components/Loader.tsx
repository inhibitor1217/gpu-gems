import { memo } from 'react'
import { SpinnerSize } from '@channel.io/bezier-react'

import * as Styled from './Loader.styled'

function Loader() {
  return (
    <Styled.Spinner
      size={SpinnerSize.XL}
      color="txt-black-dark"
    />
  )
}

export default memo(Loader)
