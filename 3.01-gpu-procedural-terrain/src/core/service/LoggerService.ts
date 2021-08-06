import Logger, { LogLevel } from '../util/logger'

class LoggerService {
  private readonly logger: Logger

  constructor() {
    this.logger = new Logger(LogLevel.Verbose) // TODO: connect this to process.env
  }

  error(error: Error): void {
    this.logger.error(error)
  }

  warning(object: any): void {
    this.logger.warning(object)
  }

  info(object: any): void {
    this.logger.info(object)
  }

  debug(object: any): void {
    this.logger.debug(object)
  }

  verbose(object: any): void {
    this.logger.verbose(object)
  }
}

export default new LoggerService()
