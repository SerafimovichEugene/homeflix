import { createReadStream, statSync } from 'fs';
import { Controller, Get, Param, Query, UsePipes, Headers, Res } from '@nestjs/common';
import { Response } from 'express';
import { schema, schemaId, VideosPageDto } from './dto/page.dto';
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
    const videos = await this.videosService.getVideos(page_, limit_, search);
    const count = await this.videosService.getVideosCount(search);
    return {
      items: videos.map((v) => v.getDto()),
      count,
      page: page_,
      limit: limit_,
    };
  }

  @Get(':id')
  @UsePipes(new VideosQueryPipe(schemaId))
  async getVideoChunk(@Param('id') id: string, @Headers('range') range: string, @Res() res: Response) {
    const file = await this.videosService.getVideo(id).then((r) => r.getDto());
    const path = `${file.path}/${file.name}`;
    const stat = statSync(path);
    const fileSize = stat.size;
    if (range) {
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
      const chunksize = end - start + 1;
      const file = createReadStream(path, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'video/mp4',
      };
      res.writeHead(200, head);
      createReadStream(path).pipe(res);
    }
  }
}
