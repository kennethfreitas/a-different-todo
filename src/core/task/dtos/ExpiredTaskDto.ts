import { BaseDto } from '@shared/helpers/BaseDto';
import { IsEmail, IsString } from 'class-validator';

export class ExpiredTaskDto extends BaseDto {
  @IsString()
  taskId!: string;

  @IsString()
  responsible!: string;

  @IsEmail()
  email!: string;

  constructor() {
    super();
  }
}
