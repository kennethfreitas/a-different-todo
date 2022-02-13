import { Kafka, KafkaConfig } from 'kafkajs';
import { BROKER_ENVS } from './envs/brokerEnvs';

const brokerConfigs: KafkaConfig = {
  clientId: BROKER_ENVS.CLIENT_ID,
  brokers: BROKER_ENVS.BROKERS_URLS?.split(','),
};

if (BROKER_ENVS.USER && BROKER_ENVS.PASSWORD) {
  brokerConfigs.ssl = true;
  brokerConfigs.sasl = {
    mechanism: 'scram-sha-256',
    username: BROKER_ENVS.USER,
    password: BROKER_ENVS.PASSWORD,
  };
}

export const brokerClient = new Kafka(brokerConfigs);
