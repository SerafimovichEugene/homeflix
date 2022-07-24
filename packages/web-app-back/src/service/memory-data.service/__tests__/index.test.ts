import { JestDataService } from './index';
import { MemoryDataService } from '../index';

describe('MemoryDataService class', () => {
  it('should get paginated files', async () => {
    const testDataServiceInst = new JestDataService();
    const files = testDataServiceInst.files;
    const memoryDataServiceInst = new MemoryDataService(testDataServiceInst);
    await memoryDataServiceInst.refreshFiles();

    const filesPage1 = await memoryDataServiceInst.getFileEntities(1, 5, '');
    const filesPage2 = await memoryDataServiceInst.getFileEntities(2, 5, '');
    const filesPage3 = await memoryDataServiceInst.getFileEntities(3, 5, '');
    await expect(async () => await memoryDataServiceInst.getFileEntities(4, 5, '')).rejects.toThrow();
    expect(filesPage1).toEqual([
      files[0],
      files[1],
      files[2],
      files[3],
      files[4],
    ]);
    expect(filesPage2).toEqual([
      files[5],
      files[6],
      files[7],
      files[8],
      files[9],
    ]);
    expect(filesPage3).toEqual([
      files[10],
      files[11],
    ]);
  });
});


