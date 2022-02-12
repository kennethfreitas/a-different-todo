import { ExpiredTaskAlert } from './ExpiredTaskAlert';

jest.mock('kafkajs');

describe('ExpiredTaskAlert Test Suite', () => {
  const expiredTaskAlert = new ExpiredTaskAlert();

  afterEach(async () => jest.restoreAllMocks());
  test('It should publish an event from the expired tasks', async () => {
    const publishSpy = jest.spyOn(expiredTaskAlert, 'publishEvent' as any).mockImplementation(async () => null);

    await expect(expiredTaskAlert.alert('id', 'joe', 'joe@email.com')).resolves.not.toThrow();

    expect(publishSpy).toHaveBeenCalled();
  });
});
