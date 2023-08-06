import { File } from './File'

export class VideoFile extends File {
  // HH:MM:SS.MICROSECONDS
  public length: string

  constructor(name: string, path: string, birthTime: string, size: number, length: string, id?: string) {
    super(name, path, birthTime, size, id)
    this.length = length
  }

  // HH:MM:SS.MICROSECONDS
  public getLength(): string {
    return this.length
  }

  public getPercentagePositionOfLength(percent: number): number {
    return (this.getLengthInSeconds() / percent) * 100
  }

  public getLengthInSeconds(): number {
    const [hours, minutes, seconds] = this.length.split(':')
    return Number(seconds) + Number(minutes) * 60 + Number(hours) * 60 * 60
  }

  static convertSecondsToLength(seconds: number): string {
    const addExtraZero = (value: number) => (value < 10 ? `0${value}` : value)
    const hour = Math.round(seconds / 3600)
    const hourDivisionRest = seconds % 3600
    const minute = Math.round(hourDivisionRest / 60)
    const minuteDivisionRest = hourDivisionRest % 60
    return `${addExtraZero(hour)}:${addExtraZero(minute)}:${addExtraZero(minuteDivisionRest)}`
  }
}
