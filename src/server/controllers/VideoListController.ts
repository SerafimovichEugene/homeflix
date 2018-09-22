import * as fs from 'fs';
import * as path from 'path';
import { Video } from '../domain/Video';
import { VideoListModel } from '../models/VideoListModel/VideoListModel';
import { VideoListProvider } from '../services/VideoListProvider';
// import { VideoListRefresher } from '../services/VideoListRefresher';

export default class VideoListController {
  private videListModel: VideoListModel
  private videoListCached: Map<string, Video>;
  constructor() {
    this.videListModel = new VideoListModel();
    this.videoListCached = this.buildMap(VideoListProvider.getMp4Videos());
    this.getVideos = this.getVideos.bind(this);
    this.refreshVideos = this.refreshVideos.bind(this);
  }

  private buildMap(items: Video[]): Map<string, Video> {
    const newMap = new Map();
    items.forEach(item => {
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      newMap.set(id, item);
    });
    return newMap;
  }

  public getVideos(req: any, res: any, next: any) {
    res.send(Array.from( this.videoListCached.entries() ) );
  }

  public refreshVideos(req: any, res: any, next: any) {
    this.videoListCached = this.buildMap(VideoListProvider.getMp4Videos());
    res.send('refreshed');
  }
}
