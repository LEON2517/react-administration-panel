import {
  mergeReducers,
  createReducer,
} from '../utils';

import TYPES from './types';

/**
 * @typedef {Object} SearchMarketState
 * @property {Array<string>} exchanges - список бирж
 * @property {string | null} selectedExchange - выбранная биржа
 * @property {Array<Array<string>>} markets - список пар выбранной биржи
 */

/**
 * @type SearchMarketState
 */
export const initialState = {
  exchanges: [],
  selectedExchange: null,
  markets: [],
};

const loadExchangesReducer = createReducer(TYPES.LOAD_EXCHANGES, (state, action) => ({
  exchanges: action.payload,
}));

const selectedExchangeReducer = createReducer(TYPES.SELECT, (state, action) => ({
  selectedExchange: action.payload,
}));

const loadMarketsReducer = createReducer(TYPES.LOAD_MARKETS, (state, action) => ({
  markets: action.payload,
}));

export default mergeReducers([
  loadExchangesReducer,
  selectedExchangeReducer,
  loadMarketsReducer,
], initialState);
