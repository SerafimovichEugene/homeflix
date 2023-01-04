import { config } from "dotenv";
import path from "path";
import { FileService } from "./service/file-service";
import { PGProvider } from "./model/db";

config({ path: path.resolve(__dirname, "../../../.env") });

const fileSystemProvider = new FileService();
const pgProvider = new PGProvider();

const populate = async () => {
  await pgProvider.initConnection();
  const screenshots = fileSystemProvider.createScreenshots();
  await pgProvider.createScreenshots(screenshots);
};

populate()
  .then(() => {
    console.log("--Finished");
    process.exit(0);
  })
  .catch(async (error) => {
    console.log("--Error");
    console.log(error);
    process.exit(1);
  })
  .finally(async () => {
    // await pgProvider.client.end();
  });
