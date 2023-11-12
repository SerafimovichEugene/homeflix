import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tag')
export class Tag {
  @PrimaryGeneratedColumn('uuid')
  tag_id: string;

  @Column({ unique: true })
  tag_name: string;

  @Column()
  tag_color: string;
}
