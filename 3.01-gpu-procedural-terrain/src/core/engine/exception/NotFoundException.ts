import { BaseException } from '../../util/exception'

export default class NotFoundException extends BaseException {
  constructor(message: string) {
    super('NotFoundException', message)
  }
}
