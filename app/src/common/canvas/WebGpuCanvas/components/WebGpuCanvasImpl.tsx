import {
  memo,
  useContext,
  useEffect,
  useState,
} from 'react'
import type { ReactNode } from 'react'

import { EnginePublisherContext } from 'Contexts/EngineContext'

import useWebGpuEngine from '../hooks/useWebGpuEngine'
import * as Styled from './WebGpuCanvasImpl.styled'

interface WebGpuCanvasImplProps {
  children: ReactNode
}

function WebGpuCanvasImpl({
  children,
}: WebGpuCanvasImplProps) {
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null)

  const publishEngine = useContext(EnginePublisherContext)
  const engineT = useWebGpuEngine(canvas)

  useEffect(() => {
    publishEngine(engineT)
  }, [
    publishEngine,
    engineT,
  ])

  return (
    <>
      <Styled.Canvas ref={setCanvas} />

      { children }
    </>
  )
}

export default memo(WebGpuCanvasImpl)
