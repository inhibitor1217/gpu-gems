import AsyncPhase from './AsyncPhase'
import type {
  FulfilledTask,
  PendingTask,
  RejectedTask,
} from './type'

export const pending = <S, E>(): PendingTask<S, E> =>
  ({
    fulfilled: () => false,
    rejected: () => false,
    completed: () => false,
    pending: () => true,

    data: undefined,
    error: undefined,

    __type: AsyncPhase.Pending,
  })

export const fulfilled = <S, E>(data: S): FulfilledTask<S, E> =>
  ({
    fulfilled: () => true,
    rejected: () => false,
    completed: () => true,
    pending: () => false,

    data,
    error: undefined,

    __type: AsyncPhase.Fulfilled,
  })

export const rejected = <S, E>(error: E): RejectedTask<S, E> =>
  ({
    fulfilled: () => false,
    rejected: () => true,
    completed: () => true,
    pending: () => false,

    data: undefined,
    error,

    __type: AsyncPhase.Rejected,
  })
