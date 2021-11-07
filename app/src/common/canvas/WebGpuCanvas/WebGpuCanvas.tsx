import { memo } from 'react'
import type { ReactNode } from 'react'

import Loader from './components/Loader'
import UnsupportedBanner from './components/UnsupportedBanner'
import WebGpuCanvasImpl from './components/WebGpuCanvasImpl'
import useIsWebGpuSupported from './hooks/useIsWebGpuSupported'
import * as Styled from './WebGpuCanvas.styled'

interface WebGpuCanvasProps {
  children: ReactNode
}

function WebGpuCanvas({
  children,
}: WebGpuCanvasProps) {
  const isWebGpuSupportedT = useIsWebGpuSupported()

  const Content = function Content(): ReactNode {
    if (isWebGpuSupportedT.pending()) return <Loader />
    
    if (isWebGpuSupportedT.rejected()) {
      return (
        <Styled.Padding>
          <UnsupportedBanner />
        </Styled.Padding>
      )
    }
    
    if (isWebGpuSupportedT.fulfilled()) {
      if (isWebGpuSupportedT.data) return (
        <WebGpuCanvasImpl>
          { children }
        </WebGpuCanvasImpl>
      )
      
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
