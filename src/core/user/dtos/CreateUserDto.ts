import { BaseDto } from '@shared/helpers/BaseDto';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto extends BaseDto {
  @IsString()
  @IsNotEmpty({
    message: 'An user must have a name',
  })
  name!: string;

  @IsEmail({
    message: 'You must assign an email for an user',
  })
  email!: string;

  constructor() {
    super();
  }
}
