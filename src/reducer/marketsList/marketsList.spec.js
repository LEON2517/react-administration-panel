import {
  createActionStream,
  mockAjax,
  expectObservable,
} from 'utils/testUtils';

import reducer, { initialState } from './index';
import TYPES from './types';

import { requestExchangesEpic } from './epic';

import { loadExchangesAction } from './actions';


describe('searchMarket reducer spec', () => {
  test('initial state', () => {
    let state;
    const actualState = reducer(state, { type: 'foo' });
    expect(actualState).toEqual(initialState);
  });
  test(`reducer: ${TYPES.LOAD_EXCHANGES}`, () => {
    let state;
    const exchanges = ['bittrex '];
    const actualState = reducer(state, { type: TYPES.LOAD_EXCHANGES, payload: exchanges });
    expect(actualState).toEqual({ ...initialState, exchanges });
  });
  test(`reducer: ${TYPES.SELECT}`, () => {
    let state;
    const actualState = reducer(state, { type: TYPES.SELECT, payload: 'exmo' });
    expect(actualState).toEqual({ ...initialState, selectedExchange: 'exmo' });
  });

  test(`reducer: ${TYPES.LOAD_MARKETS}`, () => {
    let state;
    const markets = [['A', 'B']];
    const actualState = reducer(state, { type: TYPES.LOAD_MARKETS, payload: markets });
    expect(actualState).toEqual({ ...initialState, markets });
  });
});

describe('searchMarket epic spec', () => {
  test('test observable', async () => {
    const action$ = createActionStream(TYPES.REQUEST_EXCHANGES);
    const exchanges = ['bittrex'];
    mockAjax(exchanges);
    const stream$ = requestExchangesEpic(action$);
    await expectObservable(
      stream$,
      action => expect(action).toEqual(loadExchangesAction(exchanges)),
    );
  });
});
