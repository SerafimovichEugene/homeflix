import { Injectable } from '@nestjs/common';
import { Tag } from './entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { CreateTagDto } from './dto/tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async getTag(id: string): Promise<Tag | null> {
    return await this.tagRepository.findOneBy({ tag_id: id });
  }

  async getTags(): Promise<Tag[] | null> {
    return await this.tagRepository.find({ order: { tag_name: 'ASC' } });
  }

  async createTag(bodyDto: CreateTagDto): Promise<Tag> {
    const { name, color } = bodyDto;
    return await this.tagRepository.save({ tag_name: name, tag_color: color });
  }

  async updateTag(id: string, bodyDto: DeepPartial<Tag>): Promise<Tag | null> {
    const tag = await this.getTag(id);
    if (tag) {
      this.tagRepository.merge(tag, bodyDto);
      return await this.tagRepository.save(tag);
    } else {
      return null;
    }
  }

  async hardDeleteTag(id: string) {
    const tag = await this.getTag(id);
    if (tag) {
      await this.tagRepository.delete({ tag_id: id });
    } else {
      return null;
    }
  }
}
