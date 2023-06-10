import { Injectable } from '@nestjs/common';
import { Tag } from './entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async createTag(name: string): Promise<Tag> {
    console.log('SERVICE!');
    return this.tagRepository.save({ tag_name: name });
  }
}
