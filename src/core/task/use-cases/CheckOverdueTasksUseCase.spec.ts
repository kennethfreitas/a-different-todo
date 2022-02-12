import Container from 'typedi';
import { AlertExpirationMock, TaskRepositoryMock } from '@spec/mocks';
import { CheckOverdueTasksUseCase } from './CheckOverdueTasksUseCase';

describe('CheckOverdueTasksUseCase Test Suite', () => {
  const checkOverdueTasksUseCase = Container.get(CheckOverdueTasksUseCase);
  test('It should bring all expired tasks and alert about them', async () => {
    const alertSpy = jest.spyOn(AlertExpirationMock, 'alert');
    const result = checkOverdueTasksUseCase.exec();

    await expect(result).resolves.not.toThrow();

    expect(alertSpy).toHaveBeenCalled();
  });

  test('It should do nothing it does not exist a task expired', async () => {
    const alertSpy = jest.spyOn(AlertExpirationMock, 'alert');
    jest.spyOn(TaskRepositoryMock, 'getIncompletedByDueDateRange').mockImplementation(async (_start, _end) => []);
    const result = checkOverdueTasksUseCase.exec();

    await expect(result).resolves.not.toThrow();

    expect(alertSpy).not.toHaveBeenCalled();
  });
});
