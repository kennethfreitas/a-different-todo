import { Service } from 'typedi';
import { User } from '../interfaces/User';
import { UserModel } from './models/UserModel';

@Service()
export class UserRepository {
  async save(user: User): Promise<void> {
    await UserModel.create(user);
  }

  async update(id: string, changes: Partial<User>): Promise<void> {
    await UserModel.findOneAndUpdate({ id }, changes, { runValidators: true });
  }

  async getbyEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email });
  }
}
