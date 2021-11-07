import {
  memo,
  useState,
} from 'react'
import _ from 'lodash'

import useWebGpuEngine from '../hooks/useWebGpuEngine'
import * as Styled from './WebGpuCanvasImpl.styled'

function WebGpuCanvasImpl() {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const engineT = useWebGpuEngine(canvas)

  return (
    <Styled.Canvas ref={setCanvas} />
  )
}

export default memo(WebGpuCanvasImpl)
