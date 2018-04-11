/* @flow */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { StyleSheetTestUtils } from 'aphrodite';
import { expectCSS, mockStore } from 'utils/testUtils.js';
import { createDiv } from 'common';

import TYPES from 'reducer/windowScroll/types';

import {
  withCSS,
  withScrollObserver,
  loadable,
} from './index';

const Foo = createDiv('Foo');

afterEach(() => new Promise((resolve) => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  return process.nextTick(resolve);
}));

describe('composable functions', () => {
  describe('withCSS spec', () => {
    test.skip('add class by component', () => {
      const Styled = withCSS({ backgroud: 'red' })(Foo);
      const result = shallow(<Styled />);
      expect(result.props().className).toMatch(/Foo_.*/);
    });

    test.skip('fill className', () => {
      const Styled = withCSS({ backgroud: 'red' })(Foo);
      const result = shallow(<Styled className="Bar" />).first().shallow();
      expect(result.props().className).toMatch(/Foo_.* Bar/);
    });
    test.skip('styles as function', () => {
      const Styled = withCSS(({ color = 'red' }) => ({ color }))(Foo);

      expectCSS(
        () => {
          const result = shallow(<Styled className="Bar" />).first().shallow();
          expect(result.props().className).toMatch(/Foo_.* Bar/);
        },
        (css) => {
          expect(css[Object.keys(css)[0]].color).toBe('red');
        },
      );
    });
    test.skip('nested', () => {
      const Styled = withCSS({
        color: 'blue',
      })(withCSS({
        backgroud: 'red',
        color: 'green',
      })(Foo));

      expectCSS(
        () => {
          const result = shallow(<Styled />).first().shallow();
          const classNames = result.props().className.split(' ').filter(item => item);
          expect(classNames.length).toBe(1);
          expect(classNames[0]).toMatch(/Foo_.*/);
        },
        (css) => {
          expect(css[Object.keys(css)[0]].color).toBe('blue');
        },
      );
    });
  });
  describe('withScrollObserver spec', () => {
    const initialState = {};
    const store = mockStore(initialState);
    const WithObserver = withScrollObserver(Foo);
    const wrapper = mount(<WithObserver store={store} />);
    test('dispatch subscribe action to store', () => {
      expect(store.getActions()).toEqual([{ type: TYPES.SUBSCRIBE }]);
    });
    test('dispatch unsubscribe action to store', () => {
      wrapper.unmount();
      expect(store.getActions()).toEqual([{ type: TYPES.SUBSCRIBE }, { type: TYPES.UNSUBSCRIBE }]);
    });
  });
});

describe('loadable spec', () => {
  test('should dispatch loadable action', () => {
    const store = mockStore({});
    const action = { type: 'foo' };
    const LoadableFoo = loadable(() => action)(Foo);
    expect(store.getActions()).toHaveProperty('length', 0);
    mount(<LoadableFoo store={store} />);
    expect(store.getActions()).toEqual([action]);
  });
});
