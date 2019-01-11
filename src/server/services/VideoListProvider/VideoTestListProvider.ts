import { IVideoListProvider } from './IVideoListProvider';
import { Video } from "../../domain/Video";

export class VideoTestListProvider implements IVideoListProvider {

  public async getVideos(): Promise<Video[]> {
    return [];
  }
}
