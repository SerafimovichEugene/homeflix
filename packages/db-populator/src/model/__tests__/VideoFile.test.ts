import { VideoFile } from '../VideoFile'

describe('VideoFile class', () => {
  describe('convertSecondsToLength static method', () => {
    it('should convert seconds into HH:MM:SS format string', () => {
      expect(VideoFile.convertSecondsToLength(3)).toEqual('00:00:03')
      expect(VideoFile.convertSecondsToLength(11)).toEqual('00:00:11')
      expect(VideoFile.convertSecondsToLength(60)).toEqual('00:01:00')
      expect(VideoFile.convertSecondsToLength(125)).toEqual('00:02:05')
      expect(VideoFile.convertSecondsToLength(3600)).toEqual('01:00:00')
      expect(VideoFile.convertSecondsToLength(3667)).toEqual('01:01:07')
    })
  })

  describe('getLengthInSeconds', () => {
    it('should return HH:MM:SS length transformed into seconds', () => {
      const name = 'file123.mp4'
      const path = 'some/path'
      const birth = ''
      const size = 12312

      expect(new VideoFile(name, path, birth, size, '00:01:00').getLengthInSeconds()).toEqual(60)
      expect(new VideoFile(name, path, birth, size, '01:01:01').getLengthInSeconds()).toEqual(3661)
      expect(new VideoFile(name, path, birth, size, '00:35:47').getLengthInSeconds()).toEqual(2147)
    })
  })
})
