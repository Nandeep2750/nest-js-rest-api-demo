import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  transform(data: any, metadata: ArgumentMetadata) {
    const { error, value } = this.schema.validate(data);
    if (error) {
      throw new BadRequestException(error.message);
    }
    return value;
  }
}
