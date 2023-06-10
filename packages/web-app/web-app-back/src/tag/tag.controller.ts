import { Body, Controller, Post } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/tag.dto';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Post()
  async createTag(@Body() body: CreateTagDto) {
    console.log('CONTROLLER!');
    console.log('BODY: ', body.name);
    return await this.tagService.createTag(body.name);
  }
}
