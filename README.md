### Homeflix
This package allows you to stream videos from your folder on your computer to your home network to a browser. It supports only .mp4 videos.

##### Required
- docker
- node.js 18+
- `npm i`
- Create a folder with video files. Only .mp4 file extension supported.
- Create an empty folder for screenshots (SCREENSHOT_ROOT_DIR) where they are stored after populating.
- Create a file with name .env within repo with the next Environment variables:

`POSTGRES_USER=postgres`

`POSTGRES_PASSWORD=password_for_db`

`POSTGRES_PORT=5434`

`POSTGRES_HOST=localhost`

`POSTGRES_DATABASE=postgres`

`FILE_ROOT_DIR=/your/path/to/videos/folder`

`SCREENSHOT_ROOT_DIR=/your/path/to/screenshot/folder`

### How to run
- `npm run start`
- To sync db with files within FILE_ROOT_DIR: `npm run populate`
- To stop and remove containers: `npm run stop`

### How to run in Dev mode
- Start database in container `npm run start:db`
- To sync db with files within FILE_ROOT_DIR: `npm run populate`
- Build web app ui part in watch mode `npm run ff`
- Start web app server in watch mode `npm run bb`



