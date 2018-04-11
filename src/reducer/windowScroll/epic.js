/**
 * @module 'reducer/windowScroll/epic'
 */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/observable/empty';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switch';
import 'rxjs/add/operator/map';

import { windowWasScrolledAction } from './actions';
import TYPES from './types';

const scroll$ = Observable.fromEvent(window, 'scroll')
  .debounceTime(16)
  .map(() => {
    if (typeof window.pageYOffset !== 'undefined') {
      return windowWasScrolledAction(window.pageYOffset);
    }
    if (document.documentElement && typeof document.documentElement.scrollTop !== 'undefined') {
      return windowWasScrolledAction(document.documentElement.scrollTop);
    }
    return windowWasScrolledAction(0);
  });

let subscribers = 0;

/**
 * Эпик для scroll events
 *
 * @param {ObservableAction} action$ -  action stream
 * @returns {ObservableAction} - next actions stream
 */
export function scrollEpic(action$) {
  return action$.map((action) => {
    if (action.type === TYPES.SUBSCRIBE) {
      subscribers += 1;
    }
    if (action.type === TYPES.UNSUBSCRIBE) {
      subscribers = subscribers ? subscribers - 1 : 0;
    }
    if (!subscribers) return Observable.empty();
    return scroll$;
  })
    .switch();
}

export default [
  scrollEpic,
];
