/**
 * @module 'reducer/windowScroll/actions'
 */
import TYPES from './types';

/**
 * Action creator for dispatch when window was scrolled.
 *
 * @param {number} currentPosition - позиция скролла
 * @returns {Action} action
 */
export function windowWasScrolledAction(currentPosition) {
  return {
    type: TYPES.SCROLLED,
    payload: currentPosition,
  };
}

/**
 * Action creator for adding or removing subscribers to scroll observer.
 *
 * @param {boolean} isActive - статус подписки
 * @returns {Action} action
 */
export function scrollObserverIsActiveAction(isActive = true) {
  const nextType = isActive ? TYPES.SUBSCRIBE : TYPES.UNSUBSCRIBE;
  return {
    type: nextType,
  };
}
