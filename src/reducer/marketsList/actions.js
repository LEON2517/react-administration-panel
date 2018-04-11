import TYPES from './types';
import { actionCreator } from '../utils';

export const requestExchangesAction = actionCreator(TYPES.REQUEST_EXCHANGES);
export const loadExchangesAction = actionCreator(TYPES.LOAD_EXCHANGES);
export const selectExchangeAction = actionCreator(TYPES.SELECT);
export const requestMarketsAction = actionCreator(TYPES.REQUEST_MARKETS);
export const loadMarketsAction = actionCreator(TYPES.LOAD_MARKETS);
