import { Kafka } from 'kafkajs';
import { BROKER_ENVS } from './envs/brokerEnvs';

export const brokerClient = new Kafka({
  clientId: BROKER_ENVS.CLIENT_ID,
  brokers: BROKER_ENVS.BROKERS_URLS?.split(','),
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256',
    username: BROKER_ENVS.USER,
    password: BROKER_ENVS.PASSWORD,
  },
});
