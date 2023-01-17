import { ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  async getVideos(page: number, limit: number, search = ''): Promise<Video[]> {
    const take = limit;
    const skip = page * limit - limit;
    return this.videosRepository.find({
      take,
      skip,
      order: { file_name: 'ASC' },
      where: {
        file_name: ILike(`%${search}%`),
        file_is_existent: true,
      },
    });
  }

  async getVideosCount(search = ''): Promise<number> {
    return this.videosRepository.count({
      where: {
        file_name: ILike(`%${search}%`),
        file_is_existent: true,
      },
    });
  }

  async getVideo(id: string): Promise<Video> {
    const result = await this.videosRepository.findBy({ file_id: id });
    if (result.length === 0) {
      throw new NotFoundException();
    }
    return result[0];
  }
}
