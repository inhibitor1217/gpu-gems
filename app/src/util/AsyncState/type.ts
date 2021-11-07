import type AsyncPhase from './AsyncPhase'

export interface Task<S, E = unknown> {
  fulfilled: () => this is FulfilledTask<S, E>
  rejected: () => this is RejectedTask<S, E>
  completed: () => this is CompletedTask<S, E>
  pending: () => this is PendingTask<S, E>

  data?: S
  error?: E
}

interface _PendingTask<S, E> extends Task<S, E> {
  fulfilled: () => false
  rejected: () => false
  completed: () => false
  pending: () => true

  data: undefined
  error: undefined
}

export type PendingTask<S, E> = _PendingTask<S, E> & { __type: AsyncPhase.Pending }

interface _CompletedTask<S, E> extends Task<S, E> {
  fulfilled: () => this is FulfilledTask<S, E>
  rejected: () => this is RejectedTask<S, E>
  completed: () => true
  pending: () => false
}

export type CompletedTask<S, E> = _PendingTask<S, E> & { __type: AsyncPhase.Fulfilled | AsyncPhase.Rejected }

interface _FulfilledTask<S, E> extends _CompletedTask<S, E> {
  fulfilled: () => true
  rejected: () => false
  completed: () => true
  pending: () => false

  data: S
  error: undefined
}

export type FulfilledTask<S, E> = _FulfilledTask<S, E> & { __type: AsyncPhase.Fulfilled }

interface _RejectedTask<S, E> extends _CompletedTask<S, E> {
  fulfilled: () => false
  rejected: () => true
  completed: () => true
  pending: () => false

  data: undefined
  error: E
}

export type RejectedTask<S, E> = _RejectedTask<S, E> & { __type: AsyncPhase.Rejected }
