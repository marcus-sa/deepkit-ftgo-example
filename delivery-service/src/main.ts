import { App } from '@deepkit/app';
import { FrameworkModule } from '@deepkit/framework';
import { RestateModule } from 'deepkit-restate';

import { provideDatabase } from '@ftgo/common';
import { Delivery } from '@ftgo/delivery-service-api';

import { DeliveryServiceConfig } from './config';
import { DeliveryRepository } from './delivery.repository';
import { DeliveryService } from './delivery.service';

void new App({
  config: DeliveryServiceConfig,
  imports: [new FrameworkModule(), new RestateModule()],
  controllers: [DeliveryService],
  providers: [provideDatabase([Delivery]), DeliveryRepository],
})
  .loadConfigFromEnv({ prefix: '' })
  .run();
