import { Controller, Get, Query } from '@nestjs/common';
import { VideosService } from './videos.service';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  getVideos(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('search') search?: string
  ) {
    const page_ = page ?? 1;
    const limit_ = limit ?? 10;

    console.log('page_ ', page_);
    console.log('limit_ ', limit_);

    return this.videosService.getVideos(page_, limit_);
  }
}
