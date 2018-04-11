import {
  mockAjax,
  createActionStream,
  expectObservable,
} from 'utils/testUtils';

import {
  createReducer,
  ActionError,
  mergeReducers,
  actionCreator,
  createApiEpic,
} from './utils';

const fooAction = { type: 'foo' };
const barAction = { type: 'bar' };
const reducer = createReducer('foo', () => ({ foo: 'foo' }));
const reducerOther = createReducer('foo', () => ({ bar: 'bar' }));


describe('redux utils spec', () => {
  describe('createReducer spec', () => {
    it('should throw error for bad action', () => {
      expect(() => reducer({})).toThrowError(ActionError);
    });
    it('should return state by default', () => {
      const state = { bar: 'bar' };
      expect(reducer(state, barAction)).toEqual(state);
    });
    it('should return next state', () => {
      expect(reducer({}, fooAction)).toEqual({ foo: 'foo' });
    });
    it('should return merge state', () => {
      expect(reducer({ bar: 'bar', foo: 'bar' }, fooAction))
        .toEqual({ bar: 'bar', foo: 'foo' });
    });
  });

  describe('mergeReducers spec', () => {
    it('should return initialState without reduces', () => {
      let state;
      const actualReducer = mergeReducers([], { foo: 'foo' });
      expect(actualReducer(state, fooAction)).toEqual({ foo: 'foo' });
    });
    it('should merge reduces', () => {
      let state;
      const actualReducer = mergeReducers([reducer, reducerOther], { boo: 'boo' });
      expect(actualReducer(state, fooAction)).toEqual({
        foo: 'foo',
        bar: 'bar',
        boo: 'boo',
      });
    });
  });
  describe('actionCreator spec', () => {
    const action = actionCreator('foo');
    it('should create simple action', () => {
      expect(action()).toEqual({ type: 'foo' });
    });
    it('should create action with payload', () => {
      expect(action({ bar: 'bar' })).toEqual({ type: 'foo', payload: { bar: 'bar' } });
    });
  });
  describe('createApiEpic spec', () => {
    it('should request from string', () => {
      const type = 'foo';
      const url = '/foo';
      const callback = data => data;
      const stringedEpic = createApiEpic(type, url, callback);
      const action$ = createActionStream(type);
      const mock = mockAjax('bar');
      const epic$ = stringedEpic(action$);
      expectObservable(epic$, (value) => {
        expect(value).toEqual('bar');
        expect(mock).toBeCalledWith(url);
      });
    });
    it('should request from mapper', () => {
      const type = 'foo';
      const url = () => '/foo';
      const callback = data => data;
      const stringedEpic = createApiEpic(type, url, callback);
      const action$ = createActionStream(type);
      const mock = mockAjax('bar');
      const epic$ = stringedEpic(action$);
      expectObservable(epic$, (value) => {
        expect(value).toEqual('bar');
        expect(mock).toBeCalledWith(url());
      });
    });
  });
});
