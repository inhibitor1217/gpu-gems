import { memo } from 'react'

import * as Styled from './WebGpuCanvasImpl.styled'

function WebGpuCanvasImpl() {
  return (
    <Styled.Canvas />
  )
}

export default memo(WebGpuCanvasImpl)
