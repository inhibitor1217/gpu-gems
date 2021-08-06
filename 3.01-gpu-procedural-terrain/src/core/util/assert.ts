import { AssertionException } from './exception'

export default function assert(predicate: boolean, message?: string): asserts predicate {
  if (!predicate) {
    throw new AssertionException(message)
  }
}
