export interface Task<S, E> {
  fulfilled: () => this is FulfilledTask<S, E>
  rejected: () => this is RejectedTask<S, E>
  completed: () => this is CompletedTask<S, E>
  pending: () => this is PendingTask<S, E>

  data?: S
  error?: E
}

export interface PendingTask<S, E> extends Task<S, E> {
  fulfilled: () => false
  rejected: () => false
  completed: () => false
  pending: () => true

  data: undefined
  error: undefined
}

export interface CompletedTask<S, E> extends Task<S, E> {
  fulfilled: () => this is FulfilledTask<S, E>
  rejected: () => this is RejectedTask<S, E>
  completed: () => true
  pending: () => false
}

export interface FulfilledTask<S, E> extends CompletedTask<S, E> {
  fulfilled: () => true
  rejected: () => false
  completed: () => true
  pending: () => false

  data: S
  error: undefined
}

export interface RejectedTask<S, E> extends CompletedTask<S, E> {
  fulfilled: () => false
  rejected: () => true
  completed: () => true
  pending: () => false

  data: undefined
  error: E
}
