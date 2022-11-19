import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('file')
export class Video {
  @PrimaryGeneratedColumn('uuid')
  file_id: string;

  @Column()
  file_path: string;

  @Column()
  file_name: string;
}
