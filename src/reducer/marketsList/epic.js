/**
 * @module reducer/searchMarket/epic
 */
import { createApiEpic } from 'reducer/utils';

import TYPES from './types';
import { loadExchangesAction, loadMarketsAction } from './actions';

/**
 * Эпик -  Запрос exchanges
 */
export const requestExchangesEpic = createApiEpic(
  TYPES.REQUEST_EXCHANGES,
  '/api/v1/exchanges',
  loadExchangesAction,
);

export const requestMarketsEpic = createApiEpic(
  TYPES.SELECT,
  action => `/api/v1/${action.payload}/markets`,
  loadMarketsAction,
);

export default [
  requestExchangesEpic,
  requestMarketsEpic,
];
