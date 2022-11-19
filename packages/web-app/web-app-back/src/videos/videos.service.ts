import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  getVideos(page: number, limit: number): Promise<Video[]> {
    const take = limit;
    const skip = page * limit - limit;
    return this.videosRepository.find({ take, skip });
  }
}
