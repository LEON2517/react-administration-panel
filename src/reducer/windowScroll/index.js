/**
 * @module 'reducer/windowScroll'
 */
import TYPES from './types';

/**
 * Reducer for window scroll events.
 *
 * @param { State } state - state
 * @param { Action } action - action object
 * @returns { State } modificated state
 * @example no
 */
export default function reducer(state = {}, action) {
  switch (action.type) {
    case TYPES.SCROLLED:
      return {
        ...state,
        position: action.payload,
      };
    default:
      return state;
  }
}
