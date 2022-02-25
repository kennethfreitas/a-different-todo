import { ValidateDto } from '@shared/helpers/ValidateDto';
import { nanoid } from 'nanoid';
import { Service } from 'typedi';
import { CreateUserDto } from './dtos';
import { User } from './interfaces/User';
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
    const user = await this.getOrCreateUser(currentUser);
    const penalties = user.penalties + 1;

    await this.repository.update(user.id, { penalties });
  }

  private async getOrCreateUser(currentUser: CreateUserDto): Promise<User> {
    const user = await this.repository.getbyEmail(currentUser.email);
    return user || {
      ...currentUser, 
      id: await this.createUser(currentUser),
      penalties: 0
    }
  }
}
