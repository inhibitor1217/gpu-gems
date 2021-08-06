import _ from 'lodash'
import LogLevel from './LogLevel'

export default class Logger {
  level: LogLevel

  constructor(level: LogLevel) {
    this.level = level
  }

  log(level: LogLevel, object: any): void {
    if (level.isVisible(this.level)) {
      console.log(this.format(level, object))
    }
  }

  error(error: Error): void {
    this.log(LogLevel.Error, error.toString())
    this.log(LogLevel.Debug, error.stack)
  }

  warning(object: any): void {
    this.log(LogLevel.Warning, object)
  }

  info(object: any): void {
    this.log(LogLevel.Info, object)
  }

  debug(object: any): void {
    this.log(LogLevel.Debug, object)
  }

  verbose(object: any): void {
    this.log(LogLevel.Verbose, object)
  }

  private format(level: LogLevel, object: any): string {
    const now = performance.now() // TODO: maybe align this to engine time
    return `[${level.toString()}] [${this.formatTimestamp(now)}] ${this.formatObject(object)}`
  }

  private formatObject(object: any): string {
    if (_.isObject(object)) {
      return JSON.stringify(object, null, 2)
    }

    if (_.isUndefined(object)) {
      return '(undefined)'
    }

    if (_.isNull(object)) {
      return '(null)'
    }

    return _.toString(object)
  }

  private formatTimestamp(ms: number): string {
    const millis = Math.round(ms) % 1000
    const seconds = Math.floor(ms / 1000) % 60
    const minutes = Math.floor(ms / (60 * 1000)) % 60
    const hours = Math.floor(ms / (60 * 60 * 1000))

    function zeroPad(value: number, length: number): string {
      return `${value}`.padStart(length, '0')
    }

    return [hours, zeroPad(minutes, 2), zeroPad(seconds, 2), zeroPad(millis, 3)].join(':')
  }
}
