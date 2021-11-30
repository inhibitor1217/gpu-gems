import type AsyncPhase from './AsyncPhase'

export interface Task<S, E = unknown> {
  fulfilled: () => this is FulfilledTask<S, E>
  rejected: () => this is RejectedTask<S, E>
  completed: () => this is CompletedTask<S, E>
  pending: () => this is PendingTask<S, E>

  data?: S
  error?: E
}

interface UnbrandedPendingTask<S, E> extends Task<S, E> {
  fulfilled: () => false
  rejected: () => false
  completed: () => false
  pending: () => true

  data: undefined
  error: undefined
}

export type PendingTask<S, E> = UnbrandedPendingTask<S, E> & { __type: AsyncPhase.Pending }

interface UnbrandedCompletedTask<S, E> extends Task<S, E> {
  fulfilled: () => this is FulfilledTask<S, E>
  rejected: () => this is RejectedTask<S, E>
  completed: () => true
  pending: () => false
}

export type CompletedTask<S, E> = UnbrandedCompletedTask<S, E> & {
  __type: AsyncPhase.Fulfilled | AsyncPhase.Rejected
}

interface UnbrandedFulfilledTask<S, E> extends UnbrandedCompletedTask<S, E> {
  fulfilled: () => true
  rejected: () => false
  completed: () => true
  pending: () => false

  data: S
  error: undefined
}

export type FulfilledTask<S, E> = UnbrandedFulfilledTask<S, E> & { __type: AsyncPhase.Fulfilled }

interface UnbrandedRejectedTask<S, E> extends UnbrandedCompletedTask<S, E> {
  fulfilled: () => false
  rejected: () => true
  completed: () => true
  pending: () => false

  data: undefined
  error: E
}

export type RejectedTask<S, E> = UnbrandedRejectedTask<S, E> & { __type: AsyncPhase.Rejected }
