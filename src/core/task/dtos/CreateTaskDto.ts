import { BaseDto } from '@shared/helpers/BaseDto';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Task } from '../interfaces/Task';

export class CreateTaskDto extends BaseDto implements Omit<Task, 'id'> {
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

  constructor() {
    super();
  }
}
