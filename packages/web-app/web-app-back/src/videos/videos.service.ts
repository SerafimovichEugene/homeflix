import { ILike, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Video } from './entity/video.entity';
import { ASC, DESC, SortBy, SortTo } from './dto/page.dto';

const sortingParamsColumnMap = {
  name: 'file_name',
  created: 'file_created_at',
  size: 'file_size',
};

@Injectable()
export class VideosService {
  constructor(
    @InjectRepository(Video)
    private videosRepository: Repository<Video>,
  ) {}

  async getVideos(page: number, limit: number, sortTo: SortTo, sortBy: SortBy, search = ''): Promise<Video[]> {
    const take = limit;
    const skip = page * limit - limit;

    const column = sortingParamsColumnMap[sortBy];

    if (!column) {
      throw new Error('invalid sortBy parameter');
    }

    if (sortTo !== ASC && sortTo !== DESC) {
      throw new Error('invalid sortTo parameter');
    }

    return this.videosRepository.find({
      take,
      skip,
      order: {
        [column]: sortTo,
      },
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
