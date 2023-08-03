import { v5 as uuid } from 'uuid'

export class File {
  id: string
  path: string
  name: string
  created: string
  size: number

  constructor(name: string, path: string, created: string, size: number, id?: string) {
    this.id = id || uuid(name, uuid.DNS)
    this.name = name
    this.path = path
    this.created = created
    this.size = size ?? 0
  }
}

export class VideoFile extends File {
  public length: number
  constructor(name: string, path: string, birthTime: string, size: number, length: number, id?: string) {
    super(name, path, birthTime, size, id)
    this.length = length
  }
}
