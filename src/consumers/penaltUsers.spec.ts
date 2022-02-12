import { brokerClient } from '@config/brokerClient';
import { penaltUsers } from './penaltUsers';
import { Consumer, ConsumerSubscribeTopic, ConsumerRunConfig } from 'kafkajs';

describe('penaltUsers Test Suite', () => {
  const consumerMock = {
    connect: async () => null,
    subscribe: async (_topic: ConsumerSubscribeTopic) => null,
    run: async (_config: ConsumerRunConfig) => null,
  } as unknown as Consumer;

  afterEach(async () => jest.restoreAllMocks());
  test('It should penalt users that have a expired task', async () => {
    jest.spyOn(brokerClient, 'consumer').mockImplementation(() => consumerMock);
    const subSpy = jest.spyOn(consumerMock, 'subscribe');

    await penaltUsers();

    expect(subSpy).toHaveBeenCalled();
  });
});
