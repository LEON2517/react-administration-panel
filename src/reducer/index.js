import { combineReducers } from 'redux';
import { combineEpics } from 'redux-observable';
import windowScroll from './windowScroll';
import scrollEpics from './windowScroll/epic';

export const rootReducer = combineReducers({
  windowScroll,
});

// eslint-disable-next-line function-paren-newline
export const rootEpic = combineEpics(
  ...scrollEpics);
