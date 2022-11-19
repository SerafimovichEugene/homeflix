import path from 'path';
import dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './videos/entity/video.entity';
import { VideosModule } from './videos/videos.module';
import { ConfigModule } from '@nestjs/config';

// dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

@Module({
  imports: [
    ConfigModule.forRoot(),
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
