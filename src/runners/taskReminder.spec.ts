import { NotifyTaskMock, TaskRepositoryMock } from '@spec/mocks';
import taskReminder from './taskReminder';

jest.mock('mongoose');
describe('taskReminder Test Suite', () => {
  test('It should bring all tasks in a range of 3 days and send a reminder to the responsible', async () => {
    const alertSpy = jest.spyOn(NotifyTaskMock, 'alert');
    const getSpy = jest.spyOn(TaskRepositoryMock, 'getIncompletedByDueDateRange');

    await expect(taskReminder()).resolves.not.toThrow();

    expect(alertSpy).toHaveBeenCalled();
    expect(getSpy).toHaveBeenCalled();
  });
});
