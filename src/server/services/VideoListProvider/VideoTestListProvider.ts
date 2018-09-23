import { IVideoListProvider } from './IVideoListProvider';
import { Video } from "../../domain/Video";

export class VideoTestListProvider implements IVideoListProvider {

  public getVideos(): Video[] {
    return [];
  }

}
