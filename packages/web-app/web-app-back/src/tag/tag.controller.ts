import { Body, Controller, Post, Put, Get, Param, NotFoundException, UsePipes, Delete } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto, createTagSchema, tagSchemaId, updateTagSchema } from './dto/tag.dto';
import { TagPipe } from './tag.pipe';

@Controller('tag')
export class TagController {
  constructor(private tagService: TagService) {}

  @Get(':id')
  @UsePipes(new TagPipe(tagSchemaId))
  async getTag(@Param('id') id: string) {
    const result = await this.tagService.getTag(id);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Get()
  async getTags() {
    const result = this.tagService.getTags();
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Post()
  @UsePipes(new TagPipe(createTagSchema))
  async createTag(@Body() body: CreateTagDto) {
    return await this.tagService.createTag(body);
  }

  @Put(':id')
  async updateTag(
    @Param('id', new TagPipe(tagSchemaId)) id: string,
    @Body(new TagPipe(updateTagSchema)) { name, color }: CreateTagDto,
  ) {
    const updateBody = { tag_name: name, tag_color: color };
    const result = await this.tagService.updateTag(id, updateBody);
    if (!result) {
      throw new NotFoundException();
    }
    return result;
  }

  @Delete(':id')
  async deleteTag(@Param('id', new TagPipe(tagSchemaId)) id: string) {
    const result = await this.tagService.hardDeleteTag(id);

    if (result === null) {
      throw new NotFoundException();
    }
    return { status: 200 };
  }
}
