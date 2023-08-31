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
    const result = this.tagRepository.save({ tag_name: name });
    result.then((data) => console.log('data:', data)).catch((err) => console.log('error:', err));
    return result;
  }
}
