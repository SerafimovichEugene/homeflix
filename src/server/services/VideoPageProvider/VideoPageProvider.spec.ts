import { assert } from 'chai';
import { VideoPageProvider } from './VideoPageProvider';
import { VideoTestListProvider } from '../VideoListProvider/VideoTestListProvider';


const VideoPageProviderInstance = new VideoPageProvider(new VideoTestListProvider());

describe('get total pages, size = 20', () => {
  const size = 20;
  it('total = 31', () => {
      const pages = VideoPageProviderInstance.getTotalsPages(31, size);
      assert.equal(pages, 2);
  });

  it('total = 2', () => {
    const pages = VideoPageProviderInstance.getTotalsPages(2, size);
    assert.equal(pages, 1);
  });

  it('total = 0', () => {
    const pages = VideoPageProviderInstance.getTotalsPages(0, size);
    assert.equal(pages, 1);
  });
});

