import * as fs from 'fs';
import * as path from 'path';
import { Video } from '../domain/Video';
import { VideoListModel } from '../models/VideoListModel/VideoListModel';
import { VideoListProvider } from '../services/VideoListProvider';
import { VideoListRefresher } from '../services/VideoListRefresher';

export default class VideoListController {
  private videListModel: VideoListModel
  private videoListCached: Video[]
  constructor() {
    this.videListModel = new VideoListModel();
    this.videoListCached = VideoListProvider.getMp4Videos();
    this.getVideos = this.getVideos.bind(this);
  }

  public getVideos(req: any, res: any, next: any) {
    res.send(this.videoListCached);
  }

  public refreshVideos(req: any, res: any, next: any) {
    res.send('refreshVideos');
  }
}
