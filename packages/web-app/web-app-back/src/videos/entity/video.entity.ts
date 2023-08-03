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

  @Column()
  file_is_new: boolean;

  @Column()
  file_is_existent: boolean;

  @Column()
  file_created_at: string;

  @Column()
  file_size: number;

  public getDto(): VideoDto {
    return {
      id: this.file_id,
      name: this.file_name,
      path: this.file_path,
      created: this.file_created_at,
      size: this.file_size,
    };
  }
}
