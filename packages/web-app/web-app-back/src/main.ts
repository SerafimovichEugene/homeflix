import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: false }));
  await app.listen(8282);
  console.log(`-- Application is running on: ${await app.getUrl()}`);
}

bootstrap()
  .then()
  .catch((error) => {
    console.log('-- error during bootstrapping', error);
  });
