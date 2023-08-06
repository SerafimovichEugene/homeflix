import { Client } from 'pg'
import { ScreenshotFile } from '../model/ScreenshotFile'
import format from 'pg-format'
import { File } from '../model/File'
import { VideoFile } from '../model/VideoFile'
import { VideoFileModel } from '../model/VideoFileModel'

export interface VideoFileRaw {
  file_id: string
  file_path: string
  file_name: string
  file_is_existent: boolean
  file_is_new: boolean
  file_created_at: string
  file_size: number
}

export class PostgresService {
  public client: Client
  constructor() {
    const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DATABASE, POSTGRES_HOST, POSTGRES_PORT } = process.env
    if (!POSTGRES_USER || !POSTGRES_PASSWORD || !POSTGRES_DATABASE || !POSTGRES_HOST || !POSTGRES_PORT) {
      throw new Error('Some env db variables are absent')
    }

    this.client = new Client({
      host: POSTGRES_HOST,
      port: Number(POSTGRES_PORT),
      user: POSTGRES_USER,
      password: POSTGRES_PASSWORD,
      database: POSTGRES_DATABASE,
    })
  }

  public async initConnection() {
    await this.client.connect()
  }

  async getExistentFiles(): Promise<VideoFileModel[]> {
    try {
      const { rows } = await this.client.query<VideoFileRaw>(PostgresService.getExistentFilesSql())
      return rows.map<VideoFileModel>(
        ({ file_id, file_name, file_path, file_is_new, file_is_existent, file_created_at, file_size }) =>
          new VideoFileModel(file_id, file_name, file_path, file_is_existent, file_created_at, file_size)
      )
    } catch (error) {
      console.log('db_level', error)
      throw error
    }
  }

  async getAllFiles(): Promise<VideoFileModel[]> {
    try {
      const { rows } = await this.client.query<VideoFileRaw>(PostgresService.getAllFilesSql())
      return rows.map<VideoFileModel>(
        ({ file_id, file_name, file_path, file_is_new, file_is_existent, file_created_at, file_size }) =>
          new VideoFileModel(file_id, file_name, file_path, file_is_existent, file_created_at, file_size)
      )
    } catch (error) {
      console.log('db_level', error)
      throw error
    }
  }

  async createScreenshots(screenshots: ScreenshotFile[]): Promise<void> {
    try {
      const sql = PostgresService.insertScreenshotBatchSql(screenshots)
      await this.client.query(sql)
    } catch (error) {
      console.log('-- createScreenshots db_level', error)
      throw error
    }
  }

  async insertNewFiles(files: VideoFileModel[]) {
    try {
      const sql = PostgresService.getInsertingNewFilesSql(files)
      await this.client.query(sql)
      console.log('--inserted')
    } catch (error) {
      console.log('db_level', error)
      throw error
    }
  }

  async markNonexistentFiles(files: VideoFileModel[]) {
    try {
      const sql = PostgresService.getMarkNonexistentFilesSql(files)
      await this.client.query(sql)
      console.log('nonexistent marked--')
    } catch (error) {
      console.log('db_level', error)
      throw error
    }
  }

  async markRestoredFiles(files: VideoFileModel[]) {
    try {
      await this.client.query(PostgresService.getMarkRestoredFilesSql(files))
      console.log('restored marked--')
    } catch (error) {
      console.log('db_level', error)
      throw error
    }
  }

  private static getInsertingNewFilesSql(files: VideoFileModel[]): string {
    const values = files.map((f) => [f.id, f.name, f.path, f.isExistent, f.created, f.size])
    return format(
      `
      INSERT INTO file (file_id, file_name, file_path, file_is_existent, file_is_new, file_created_at, file_size)
      VALUES %L
      ON CONFLICT (file_id) DO NOTHING;
    `,
      values
    )
  }

  private static getMarkNonexistentFilesSql(files: File[]): string {
    const values = files.map((f) => [f.id])
    return format(
      `
      UPDATE file SET file_is_existent = false
      WHERE file.file_id IN (%L);
    `,
      values
    )
  }

  private static getMarkRestoredFilesSql(files: VideoFile[]): string {
    const values = files.map((f) => [f.id])
    return format(
      `
      UPDATE file SET file_is_existent = true
      WHERE file.file_id IN (%L);
    `,
      values
    )
  }

  private static getExistentFilesSql(): string {
    return format(`
      SELECT f.*
      FROM file f
      WHERE file_is_existent IS true
      ORDER BY f.file_name ASC;
    `)
  }

  private static getAllFilesSql(): string {
    return format(`
      SELECT f.*
      FROM file f
      ORDER BY f.file_name ASC;
    `)
  }

  private static insertScreenshotBatchSql(screenshots: ScreenshotFile[]): string {
    const values = screenshots.map((s) => [s.id, s.name, s.parentId, s.path, s.resolution])
    return format(
      `
      INSERT INTO screenshot (screenshot_id, screenshot_name, file_id, screenshot_path, screenshot_resolution)
      VALUES %L
      ON CONFLICT (screenshot_id)
      DO UPDATE SET
        screenshot_id = screenshot.screenshot_id,
        screenshot_name = screenshot.screenshot_name,
        file_id = screenshot.file_id,
        screenshot_path = screenshot.screenshot_path,
        screenshot_resolution = screenshot.screenshot_resolution;
    `,
      values
    )
  }
}
