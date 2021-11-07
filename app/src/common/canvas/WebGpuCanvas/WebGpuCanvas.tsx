import { memo } from 'react'
import type { ReactNode } from 'react'

import Loader from './components/Loader'
import UnsupportedBanner from './components/UnsupportedBanner'
import WebGpuCanvasImpl from './components/WebGpuCanvasImpl'
import useIsWebGpuSupported from './hooks/useIsWebGpuSupported'
import * as Styled from './WebGpuCanvas.styled'

function WebGpuCanvas() {
  const isWebGpuSupported = useIsWebGpuSupported()

  const Content = function Content(): ReactNode {
    if (isWebGpuSupported.pending()) return <Loader />
    
    if (isWebGpuSupported.rejected()) {
      return (
        <Styled.Padding>
          <UnsupportedBanner />
        </Styled.Padding>
      )
    }
    
    if (isWebGpuSupported.fulfilled()) {
      if (isWebGpuSupported.data) return <WebGpuCanvasImpl />
      else return (
        <Styled.Padding>
          <UnsupportedBanner />
        </Styled.Padding>
      )
    }
    return null
  } ()

  return (
    <Styled.Wrapper>
      { Content }
    </Styled.Wrapper>
  )
}

export default memo(WebGpuCanvas)
