import _ from 'lodash'

enum LogLevelValue {
  Verbose = 'Verbose',
  Debug = 'Debug',
  Info = 'Info',
  Warning = 'Warning',
  Error = 'Error',
}

export default class LogLevel {
  private readonly value: LogLevelValue

  private constructor(value: LogLevelValue) {
    this.value = value

    Object.freeze(this)
  }

  static readonly Verbose: LogLevel = new LogLevel(LogLevelValue.Verbose)
  static readonly Debug: LogLevel = new LogLevel(LogLevelValue.Debug)
  static readonly Info: LogLevel = new LogLevel(LogLevelValue.Info)
  static readonly Warning: LogLevel = new LogLevel(LogLevelValue.Warning)
  static readonly Error: LogLevel = new LogLevel(LogLevelValue.Error)

  private static readonly severities: {
    [level in LogLevelValue]: number
  } = {
    [LogLevelValue.Verbose]: 100,
    [LogLevelValue.Debug]: 200,
    [LogLevelValue.Info]: 300,
    [LogLevelValue.Warning]: 400,
    [LogLevelValue.Error]: 500,
  }

  private get severity(): number {
    return LogLevel.severities[this.value]
  }

  isVisible(given: LogLevel): boolean {
    return this.severity >= given.severity
  }

  isInvisible(given: LogLevel): boolean {
    return !this.isVisible(given)
  }

  toString(): string {
    return _.upperCase(this.value.toString())
  }
}
