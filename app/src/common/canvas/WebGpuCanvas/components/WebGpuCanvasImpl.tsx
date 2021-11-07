import {
  memo,
  useState,
} from 'react'
import type { ReactNode } from 'react'
import _ from 'lodash'

import useWebGpuEngine from '../hooks/useWebGpuEngine'
import * as Styled from './WebGpuCanvasImpl.styled'

interface WebGpuCanvasImplProps {
  children: ReactNode
}

function WebGpuCanvasImpl({
  children,
}: WebGpuCanvasImplProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)
  const engineT = useWebGpuEngine(canvas)

  return (
    <>
      <Styled.Canvas ref={setCanvas} />

      { children }
    </>
  )
}

export default memo(WebGpuCanvasImpl)
