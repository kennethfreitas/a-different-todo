import { penaltUsers } from './penaltUsers';
import Container from 'typedi';
import { UserService } from '@core/user';

describe('penaltUsers Test Suite', () => {
  test('It should penalt users that have a expired task', async () => {
    const addSpy = jest.spyOn(Container.get(UserService), 'addPenalty');
    const expiredTask = {
      taskId: 'id',
      responsible: 'joe',
      email: 'joe@email.com',
    };

    await expect(penaltUsers(expiredTask)).resolves.not.toThrow();

    expect(addSpy).toHaveBeenCalled();
  });
});
