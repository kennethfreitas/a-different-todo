import { AlertExpirationMock, TaskRepositoryMock } from '@spec/mocks';
import checkTasks from './checkTasks';

jest.mock('mongoose');
describe('checkTasks Test Suite', () => {
  test('It should bring all expired tasks and alert about them', async () => {
    const alertSpy = jest.spyOn(AlertExpirationMock, 'alert');
    const getSpy = jest.spyOn(TaskRepositoryMock, 'getIncompletedByDueDateRange');

    await expect(checkTasks()).resolves.not.toThrow();

    expect(alertSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalled();
  });
});
