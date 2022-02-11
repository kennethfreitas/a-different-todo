import { BaseDto } from '@shared/helpers/BaseDto';
import { IsDateString, IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateTaskDto extends BaseDto {
  @IsString()
  @MinLength(10, {
    message: 'The description is too short',
  })
  description!: string;

  @IsString()
  @IsNotEmpty({
    message: 'A task must have a responsible',
  })
  responsible!: string;

  @IsEmail({
    message: 'You must assign an email for a responsible for a task',
  })
  email!: string;

  @IsDateString({
    message: 'A task must have a deadline',
  })
  dueDate!: string;

  constructor() {
    super();
  }
}
