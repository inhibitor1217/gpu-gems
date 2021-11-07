import { memo } from 'react'
import { Spinner, SpinnerSize } from '@channel.io/bezier-react'

function Loader() {
  return (
    <Spinner
      size={SpinnerSize.XL}
      color="txt-black-dark"
    />
  )
}

export default memo(Loader)
