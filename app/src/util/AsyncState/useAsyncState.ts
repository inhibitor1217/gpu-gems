import {
  useCallback,
  useEffect,
  useState,
} from 'react'

import AsyncPhase from './AsyncPhase'
import type { Task } from './type'

function useAsyncState<S, E>(promise: Promise<S>): Task<S, E> {
  const [phase, setPhase] = useState(AsyncPhase.Pending)
  const [data, setData] = useState<S | undefined>(undefined)
  const [error, setError] = useState<E | undefined>(undefined)

  useEffect(function sync() {
    promise
      .then(data => {
        setPhase(AsyncPhase.Fulfilled)
        setData(data)
      })
      .catch(error => {
        setPhase(AsyncPhase.Rejected)
        setError(error)
      })
  }, [])

  const fulfilled = useCallback(() => phase === AsyncPhase.Fulfilled, [phase])
  const rejected = useCallback(() => phase === AsyncPhase.Rejected, [phase])
  const completed = useCallback(() => phase !== AsyncPhase.Pending, [phase])
  const pending = useCallback(() => phase === AsyncPhase.Pending, [phase])

  return {
    fulfilled,
    rejected,
    completed,
    pending,
    data,
    error,
  }
}

export default useAsyncState
