import { assert } from 'chai';
import { VideoListModel } from './VideoListModel';

const VideListModelInstance = new VideoListModel();

describe('VideoListModel', () => {
  it('escape single quote in the middle of string', () => {
      const str = VideListModelInstance.escapeSingleQuote('super\'s string quote');
      assert.equal(str, 'super\'\'s string quote');
  });
  it('escape single quote in the start of string', () => {
    const str = VideListModelInstance.escapeSingleQuote('\'super string quote');
    assert.equal(str, '\'\'super string quote');
  });
  it('escape single quote in the end of string', () => {
    const str = VideListModelInstance.escapeSingleQuote('super string quote\'');
    assert.equal(str, 'super string quote\'\'');
  });
  it('many single quotes in the string', () => {
    const str = VideListModelInstance.escapeSingleQuote('\'super stri\'ng quote\'');
    assert.equal(str, '\'\'super stri\'\'ng quote\'\'');
  });
});
