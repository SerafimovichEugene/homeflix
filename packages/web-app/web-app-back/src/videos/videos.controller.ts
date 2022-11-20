import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { schema, VideosPageDto } from './dto/page.dto';
import { VideosQueryPipe } from './videos.pipe';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  @UsePipes(new VideosQueryPipe(schema))
  async getVideos(@Query() { page, limit, search }: VideosPageDto) {
    const page_ = page ?? 1;
    const limit_ = limit ?? 10;

    console.log('page_ ', page_);
    console.log('limit_ ', limit_);

    const videos = await this.videosService.getVideos(page_, limit_, search);
    const count = await this.videosService.getVideosCount(search);
    return {
      items: videos,
      count,
      page: page_,
      limit: limit_,
    };
  }
}
