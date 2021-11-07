import { memo } from 'react'

import Loader from './components/Loader'
import UnsupportedBanner from './components/UnsupportedBanner'
import useIsWebGpuSupported from './hooks/useIsWebGpuSupported'
import * as Styled from './WebGpuCanvas.styled'

function WebGpuCanvas() {
  const isWebGpuSupported = useIsWebGpuSupported()

  if (isWebGpuSupported.pending()) {
    return (
      <Styled.Wrapper>
        <Loader />
      </Styled.Wrapper>
    )
  }

  if (isWebGpuSupported.rejected()) {
    return (
      <Styled.Wrapper>
        <UnsupportedBanner />
      </Styled.Wrapper>
    )
  }

  if (isWebGpuSupported.fulfilled()) {
    if (!isWebGpuSupported.data) {
      return (
        <Styled.Wrapper>
          <UnsupportedBanner />
        </Styled.Wrapper>
      )
    }

    return (
      <div>
        { `${isWebGpuSupported.data}` }
      </div>
    )
  }

  return null
}

export default memo(WebGpuCanvas)
