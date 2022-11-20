import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { ObjectSchema, StringSchema } from 'joi';

@Injectable()
export class VideosQueryPipe implements PipeTransform {
  constructor(private schema: ObjectSchema | StringSchema) {}

  transform(value: any) {
    const { error } = this.schema.validate(value);
    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}
