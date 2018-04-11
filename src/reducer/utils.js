/**
 * @module reducer/utils
 */
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { deprecate } from 'common';


/**
 * Исключение для редисера
 *
 * @class ActionError
 * @param {string} message - сообщение об ошибке
 */
export function ActionError(message) {
  this.name = 'ActionError';
  this.message = message;
  this.stack = (new Error()).stack;
}
ActionError.prototype = new Error();

/**
 * создает редюсер для указаного типа.
 * Aвтоматически объединяет со state
 *
 * @param {string} type - тип для редисера
 * @param {callback} callback -  редюсер
 * @returns {Reducer} reducer
 * @example
 * createReducer('Foo event', () => { foo: 'bar'});
 */
export function createReducer(type, callback) {
  return (state, action) => {
    if (!action || !action.type) {
      throw new ActionError('Action should have type');
    }
    if (action.type === type) {
      return {
        ...state,
        ...callback(state, action),
      };
    }
    return state;
  };
}

/**
 * Cоздает  корневой редюсер из массива редюсеров
 *
 * @param {Array<Reducer>} reducers - массив функций редюсеров
 * @param {State} initialState -  первоначальное состояние для редьсера
 * @returns {Reducer} reducer
 */
export function mergeReducers(reducers, initialState) {
  return (state = initialState, action) => {
    if (reducers.length) {
      return reducers.reduce((nextState, callback) => callback(nextState, action), state);
    }
    return state;
  };
}

/**
 * сахар для action
 *
 * @param {string} type - тип для action
 * @returns {ActionCreator} function
 * @example
 * export const someAction = actionCreator('Some Event');
 * someAction({id: 222});
 * //returns { type: 'Some Event', id: 222}
 */
export function actionCreator(type) {
  return payload => ({ type, payload });
}

/**
 * deprecate action creater
 *
 * @param {Function} type - редюсер
 * @param {string} oldName - страрoе имя редюсера
 * @param {string} nextName - страрoе имя редюсера
 *
 * @returns {Function}
 */
export function deprecateActionCreator(type, oldName, nextName) {
  return deprecate(actionCreator(type), `${oldName} reducer actions`, nextName);
}


/**
 * Создает  epic  который делает запрос на backend
 *
 * @param {string} type - redux type
 * @param {string | function} urlMap - маппер для  url
 * @param {ActionCreator} nextAction - следующий action
 */
export function createApiEpic(type, urlMap, nextAction) {
  const nextUrlMap = typeof urlMap === 'string' ? () => urlMap : urlMap;
  const streamedRequest = action => Observable.ajax(nextUrlMap(action))
    .map(({ response }) => nextAction(response.result));

  return action$ => action$.ofType(type).mergeMap(streamedRequest);
}

