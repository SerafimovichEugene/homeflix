import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { VideoDto } from '../dto/page.dto';

@Entity('file')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  file_id: string;

  @Column()
  file_path: string;

  @Column()
  file_name: string;

  public getDto(): VideoDto {
    return {
      id: this.file_id,
      name: this.file_name,
      path: this.file_path,
    };
  }
}
