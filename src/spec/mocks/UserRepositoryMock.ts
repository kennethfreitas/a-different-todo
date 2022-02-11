import { User } from '@core/user/interfaces/User';
import { UserRepository } from '@core/user/persistence/UserRepository';

export const UserRepositoryMock: UserRepository = {
  async save(_user: User): Promise<void> {},
  async update(_id: string, _changes: Partial<User>): Promise<void> {},
  async getbyEmail(email: string): Promise<User | null> {
    return {
      id: 'owNKWvV32Lf2izCcDgNjo',
      name: 'Mr Joe',
      email,
      penalties: 1,
    };
  },
};
