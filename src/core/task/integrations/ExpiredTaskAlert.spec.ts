import { ExpiredTaskAlert } from './ExpiredTaskAlert';

jest.mock('kafkajs');

describe('ExpiredTaskAlert Test Suite', () => {
  const expiredTaskAlert = new ExpiredTaskAlert();

  afterEach(async () => jest.restoreAllMocks());
  test('It should publish an event from the expired tasks', async () => {
    const publishSpy = jest.spyOn(expiredTaskAlert, 'publishEvent' as any).mockImplementation(async () => null);
    const expiredTask = {
      taskId: 'id',
      responsible: 'joe',
      email: 'joe@email.com',
    };

    await expect(expiredTaskAlert.alert(expiredTask)).resolves.not.toThrow();

    expect(publishSpy).toHaveBeenCalled();
  });
});
