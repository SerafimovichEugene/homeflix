import { schema } from './dto/page.dto';
import { VideosQueryPipe } from './videos.pipe';

describe('VideosPipe', () => {
  it('should be defined', () => {
    expect(new VideosQueryPipe(schema)).toBeDefined();
  });
});
