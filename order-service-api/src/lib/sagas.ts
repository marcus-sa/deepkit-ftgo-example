import { UUID } from '@deepkit/type';
import { RestateSaga } from 'deepkit-restate';

import { Money } from '@ftgo/common';

import { OrderDetails, OrderRevision } from './entities';

export enum CreateOrderSagaState {
  STARTED = 'STARTED',
  CANCELLED = 'CANCELLED',
}

export class CreateOrderSagaData {
  readonly state: CreateOrderSagaState = CreateOrderSagaState.STARTED;
  readonly orderId: UUID;
  readonly orderDetails: OrderDetails;
  readonly ticketId?: UUID;
  readonly confirmCreateTicketAwakeableId?: string;
}

export type CreateOrderSagaApi = RestateSaga<
  'CreateOrder',
  CreateOrderSagaData
>;

export class CancelOrderSagaData {
  readonly orderId: UUID;
  readonly reverseRequestId: UUID;
  readonly restaurantId: UUID;
  readonly consumerId: UUID;
  readonly orderTotal: Money;
}

export type CancelOrderSagaApi = RestateSaga<
  'CancelOrder',
  CancelOrderSagaData
>;

export class ReviseOrderSagaData {
  readonly orderRevision: OrderRevision;
  readonly orderId: UUID;
  readonly expectedVersion: UUID;
  readonly restaurantId: UUID;
  readonly revisedOrderTotal: Money;
  readonly consumerId: UUID;
}

export type ReviseOrderSagaApi = RestateSaga<
  'ReviseOrder',
  ReviseOrderSagaData
>;
