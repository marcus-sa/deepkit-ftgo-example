import { RestateKafkaTopic } from 'deepkit-restate';

import { Consumer } from './entities.js';

export type KafkaConsumerTopic = RestateKafkaTopic<
  'consumer',
  [consumer: Consumer]
>;
