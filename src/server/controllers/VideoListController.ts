import * as fs from 'fs';
import * as path from 'path';
import { Video } from '../domain/Video';
import { VideoListModel } from '../models/VideoListModel/VideoListModel';
// import { VideoListRefresher } from '../services/VideoListRefresher';

export default class VideoListController {
  private videListModel: VideoListModel
  private videoListCached: Map<string, Video>;
  constructor(model: VideoListModel) {
    this.videListModel = model;
    this.videoListCached = this.videListModel.getLocalvideos();
    this.getVideos = this.getVideos.bind(this);
    this.refreshVideos = this.refreshVideos.bind(this);
  }

  public getVideos(req: any, res: any, next: any) {
    const map = {};
    this.videoListCached.forEach((value, key) => {
      map[key] = value;
    });
    res.send(map);
  }

  public refreshVideos(req: any, res: any, next: any) {
    this.videListModel.refreshVideoListCached();
    res.send('refreshed');
  }
}
