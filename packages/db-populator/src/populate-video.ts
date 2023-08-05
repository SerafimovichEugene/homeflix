import dotenv from 'dotenv'
import path from 'path'

import { PGProvider } from './model/db'
import { FileService, VideoFileExtension } from './service/file-service'
import { getDiff } from './utils/diff'

dotenv.config({ path: path.resolve(__dirname, '../../../.env') })

const fileService = new FileService()
const pgProvider = new PGProvider()

const populate = async () => {
  // we always add, not remove
  console.log('start populating--')

  await pgProvider.initConnection()
  console.log('--connected')

  const dbAllFiles = await pgProvider.getAllFiles()
  const dbExistentFiles = await pgProvider.getExistentFiles()
  const sourceFiles = fileService.getFiles([VideoFileExtension.mp4])

  console.log('--sourceFiles', sourceFiles.length)
  console.log('--dbAllFiles', dbAllFiles.length)
  console.log('--dbExistentFiles', dbExistentFiles.length)

  // TODO split getDiff to three different functions
  const [newFiles, deletedFiles] = getDiff(sourceFiles, dbExistentFiles)
  const [_1, _2, restoredFiles] = getDiff(sourceFiles, dbAllFiles)

  console.log('--new', newFiles.length)
  console.log('--deleted', deletedFiles.length)
  console.log('--restored', restoredFiles.length)

  if (newFiles.length > 0) {
    await pgProvider.insertNewFiles(newFiles)
  }
  if (deletedFiles.length > 0) {
    await pgProvider.markNonexistentFiles(deletedFiles)
  }
  if (restoredFiles.length > 0) {
    await pgProvider.markRestoredFiles(restoredFiles)
  }
}

populate()
  .then(() => {
    console.log('--Finished')
    process.exit(0)
  })
  .catch(async (error) => {
    console.log('--Error')
    console.log(error)
    process.exit(1)
  })
  .finally(async () => {
    await pgProvider.client.end()
  })
