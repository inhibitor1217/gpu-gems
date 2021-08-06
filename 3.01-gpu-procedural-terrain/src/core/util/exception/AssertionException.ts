import BaseException from './BaseException'

export default class AssertionException extends BaseException {
  constructor(message?: string) {
    super('AssertionException', message ?? 'assertion failed')
  }
}
