export default class BaseException extends Error {
  constructor(name: string, message?: string) {
    super()

    this.name = name
    this.message = message ?? 'no message specified'
  }
}
