/* @flow */
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/concat';
import { ActionsObservable } from 'redux-observable';
import { scrollTo } from 'utils/testUtils';

import reducer from './index';
import { scrollEpic } from './epic';

import { windowWasScrolledAction, scrollObserverIsActiveAction } from './actions';
import TYPES from './types';

const numberParam = 7;

describe('Reducer windowScroll', () => {
  test('reducer should return state by default', () => {
    const state = { foo: 'bar' };
    const action = {
      type: 'TEST',
    };
    expect(reducer(undefined, action)).toEqual({});
    expect(reducer(state, action)).toEqual(state);
  });
  test(`"${TYPES.SCROLLED}" spec`, () => {
    const state = { foo: 'bar' };
    const action = { type: TYPES.SCROLLED, payload: numberParam };
    const res = {
      ...state,
      position: action.payload,
    };
    expect(reducer(state, action)).toEqual(res);
  });
});

describe('Action creators', () => {
  describe('windowWasScrolledAction', () => {
    test('return action with scroll value', () => {
      expect(windowWasScrolledAction(numberParam))
        .toEqual({ type: TYPES.SCROLLED, payload: numberParam });
    });
  });
  describe('scrollObserverIsActiveAction', () => {
    test('return subscribe action for empty or true parameter', () => {
      expect(scrollObserverIsActiveAction()).toEqual({ type: TYPES.SUBSCRIBE });
      expect(scrollObserverIsActiveAction(true)).toEqual({ type: TYPES.SUBSCRIBE });
    });
    test('return unsubscribe action for false parameter', () => {
      expect(scrollObserverIsActiveAction(false)).toEqual({ type: TYPES.UNSUBSCRIBE });
    });
  });
});


// eslint-disable-next-line require-jsdoc
function scrollEpicTest(actions$, offset) {
  return new Promise((resolve) => {
    scrollEpic(actions$).subscribe((data) => {
      resolve(data);
    });
    scrollTo(offset);
  });
}

const subscribe$ = ActionsObservable.of(scrollObserverIsActiveAction());
const unsubscribe$ = ActionsObservable.of(scrollObserverIsActiveAction(false));

describe('scrollEpic Epic', () => {
  it('switch to scroll', () => {
    expect.assertions(1);
    const offset = 10;
    return expect(scrollEpicTest(subscribe$, offset))
      .resolves.toEqual(windowWasScrolledAction(offset));
  });
  it('empty on unsubscribe', (done) => {
    scrollEpic(unsubscribe$)
      .toArray()
      .subscribe((value) => {
        expect(value).toEqual([]);
        done();
      });
  });
  it('counter test', async () => {
    expect.assertions(2);
    const offset = 20;
    const nextActions$ = subscribe$.concat(subscribe$, subscribe$, unsubscribe$);
    await expect(scrollEpicTest(nextActions$, offset))
      .resolves.toEqual(windowWasScrolledAction(offset));
    scrollEpic(unsubscribe$.concat(unsubscribe$))
      .toArray()
      .subscribe(value => expect(value).toEqual([]));
  });
});

