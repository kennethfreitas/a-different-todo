import { ValidateDto } from '@shared/helpers/ValidateDto';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import { CreateUserDto } from './dtos';
import { UserRepository } from './persistence/UserRepository';

@Service()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  @ValidateDto(CreateUserDto)
  async createUser(newUser: CreateUserDto): Promise<string> {
    const id = nanoid();
    await this.repository.save({ ...newUser, id, penalties: 0 });
    return id;
  }

  @ValidateDto(CreateUserDto)
  async addPenalty(currentUser: CreateUserDto): Promise<void> {
    const user = await this.repository.getbyEmail(currentUser.email);
    const id = user?.id || (await this.createUser(currentUser));
    const penalties = (user?.penalties || 0) + 1;

    await this.repository.update(id, { penalties });
  }
}
