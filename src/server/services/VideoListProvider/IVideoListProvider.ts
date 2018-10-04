import { Video } from "../../domain/Video";

export interface IVideoListProvider {
  getVideos(): Promise<Video[]>
}
