import {
  memo,
  useState,
} from 'react'
import type { ReactNode } from 'react'

import EngineContext from 'Contexts/EngineContext'

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
    <EngineContext.Provider value={engineT}>
      <Styled.Canvas ref={setCanvas} />

      { children }
    </EngineContext.Provider>
  )
}

export default memo(WebGpuCanvasImpl)
