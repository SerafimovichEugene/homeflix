import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  async getVideos(page: number, limit: number, search: string = ''): Promise<Video[]> {
    const take = limit;
    const skip = page * limit - limit;
    return this.videosRepository.find({ 
      take, 
      skip, 
      order: { file_name: 'ASC' }, 
      where: {
        file_name: Like(`%${search}%`)
      }
    });
  };

  async getVideosCount(search: string = ''): Promise<number> {
    return this.videosRepository.count({
      where: {
        file_name: Like(`%${search}%`)
      }
    });
  }
}
