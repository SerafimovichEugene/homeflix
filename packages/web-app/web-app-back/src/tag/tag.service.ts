import { Injectable } from '@nestjs/common';
import { Tag } from './entity/tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { TagDto } from './dto/tag.dto';

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

  async createTag(tagBodyDto: TagDto): Promise<Tag> {
    const { name, color } = tagBodyDto;
    return await this.tagRepository.save({ tag_name: name, tag_color: color });
  }

  async updateTag(id: string, tagBodyDto: DeepPartial<Tag>): Promise<Tag | null> {
    const tag = await this.getTag(id);
    if (tag) {
      this.tagRepository.merge(tag, tagBodyDto);
      return await this.tagRepository.save(tag);
    } else {
      return null;
    }
  }

  async deleteTag(id: string) {
    const tag = await this.getTag(id);
    if (tag) {
      await this.tagRepository.delete({ tag_id: id });
    } else {
      return null;
    }
  }
}
