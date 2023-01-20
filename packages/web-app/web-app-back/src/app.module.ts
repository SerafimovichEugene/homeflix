import { resolve } from 'path';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Video } from './videos/entity/video.entity';
import { VideosModule } from './videos/videos.module';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: resolve(__dirname, '../../../../.env'),
    }),
    ServeStaticModule.forRoot({
      rootPath: (() => {
        if (!process.env.SCREENSHOT_ROOT_DIR) {
          throw new Error('SCREENSHOT_ROOT_DIR is undefined');
        }
        return resolve(__dirname, process.env.SCREENSHOT_ROOT_DIR || '');
      })(),
      serveRoot: '/data',
    }),
    ServeStaticModule.forRoot({
      rootPath: resolve(__dirname, '../../web-app-front/public'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [Video],
    }),
    VideosModule,
  ],
})
export class AppModule {}
