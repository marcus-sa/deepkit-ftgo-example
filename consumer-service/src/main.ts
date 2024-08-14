import { App } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { RestateKafkaProducerModule } from 'deepkit-restate/kafka';
import { provideRestateServiceProxy, RestateModule } from 'deepkit-restate';

import { AccountingServiceApi } from '@ftgo/accounting-service-api';
import { Consumer } from '@ftgo/consumer-service-api';
import { provideDatabase } from '@ftgo/common';

import { ConsumerServiceConfig } from './config';
import { ConsumerService } from './consumer.service';
import { ConsumerRepository } from './consumer.repository';

void new App({
  config: ConsumerServiceConfig,
  imports: [
    new FrameworkModule(),
    new RestateModule(),
    // TODO: should be configurable through RestateModule
    new RestateKafkaProducerModule({
      clientId: 'consumer-service',
      brokers: [''],
    }),
  ],
  controllers: [ConsumerService],
  providers: [
    provideDatabase([Consumer]),
    ConsumerRepository,
    provideRestateServiceProxy<AccountingServiceApi>(),
  ],
})
  .setup((module, config: ConsumerServiceConfig) => {
    module
      .getImportedModuleByClass(FrameworkModule)
      .configure(config.framework);

    module.getImportedModuleByClass(RestateModule).configure(config.restate);
  })
  .loadConfigFromEnv({ prefix: '' })
  .run();
