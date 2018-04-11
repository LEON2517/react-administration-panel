/**
 * сахар для тестов
 * @module utils/testUtils
 */

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import { StyleSheetServer } from 'aphrodite';
import cssToObject from 'css-to-object';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

/**
 *  Проверка CSS для aphrodite
 *
 *  @param {ReactDOM} render - React дерево
 *  @param {callback} expection - Функкция для проверки css
 *  @returns {void} no
 *  @example no
 */
export function expectCSS(render, expection) {
  const { css } = StyleSheetServer.renderStatic(render);
  expection(cssToObject(css.content));
}

/**
 * Сахар - снапшот для ReactDOM
 *
 * @param {ReactDOM} reactDom - React дерево
 * @returns {ReactTree} tree -  отрендереное дерево
 * @example no
 */
export function expectSnapshot(reactDom) {
  const tree = renderer.create(reactDom);
  expect(tree).toMatchSnapshot();

  return tree;
}

/**
 * Виртуальный скролл
 *
 * @param {number} offset -  новая позиция скролла
 * @returns {void} no
 * @example no
 */
export function scrollTo(offset) {
  window.pageYOffset = offset;
  window.dispatchEvent(new window.UIEvent('scroll', { detail: offset }));
}

/**
 * Создает поток для тестов епиков
 *
 * @param {string} type - тип для потока
 * @returns {ObservableAction} action$
 * @example
 * const action$ = createActionStream(TYPES.REQUEST_EXCHANGES);
 * const stream$ = requestExchangesEpic(action$);
 */
export function createActionStream(type) {
  const action$ = Observable.from([{ type }]);
  action$.ofType = (expectedType) => {
    if (type === expectedType) {
      return action$;
    }
    return Observable.empty();
  };
  return action$;
}

/**
 * Мок для  Observable.ajax
 *
 * @param {Object} result - ответ ajax
 * @returns {MockObservalbe} no
 * @example
 * const exchanges = ['bittrex'];
 * mockAjax(exchanges);
 * // теперь любой вызов  Observable.ajax - вернет  ['bittrex']
 */
export function mockAjax(result) {
  Observable.ajax = jest.fn(() => Observable.from([{
    response: {
      result,
    },
  }]));
  return Observable.ajax;
}

/**
 * Тест для observable
 *
 * @param {Observable} stream$ -  тестируемый поток
 * @param {Callback} callback - проверка результатат
 * @returns {Promise} promise
 * @example
 * await expectObservable(
 *  stream$,
 *  action => expect(action).toEqual(loadExchangesAction(exchanges)),
 * );
 */
export function expectObservable(stream$, callback) {
  return new Promise((resolve, reject) => {
    stream$.subscribe((value) => {
      try {
        callback(value);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  });
}

/**
 * mock для express.response
 *
 * @param {Object} expected - Роут должен возвращать этот объект
 */
export function createTestedResponse(expected) {
  return {
    send(data) {
      expect(data).toEqual(expected);
    },
    json(data) {
      this.send(data);
    },
  };
}

/**
 * инстремент для тестов Express
 *
 * @class ExpressTester
 */
export class ExpressTester {
  /**
   * конструктор
   */
  constructor() {
    this.getRoutes = new Map();
    this.postRoutes = new Map();
    this.router = {
      get: (key, callback) => {
        this.getRoutes.set(key, callback);
      },
      post: (key, callback) => {
        this.postRoutes.set(key, callback);
      },
    };
  }
  /**
    * getter router
    *
    * @returns {MockRouter}
    */
  getRouter() {
    return this.router;
  }
  /**
    * Мок для  get запроса
    *
    * @param {string} url - адресс
    * @param {Object} expected - ожидаемый ответ
    * @param {MockRequest} request -  мок для express.request
    *
    */
  get(url, expected, request = null) {
    if (this.getRoutes.has(url)) {
      return this.getRoutes.get(url)(request, createTestedResponse(expected));
    }
    throw new Error(`GET url not existed: ${url}`);
  }
  /**
   * Мок для post запроса
   *
   * @param {string} url - адресс
   * @param {Object} expected - ожидаемый ответ
   * @param {MockRequest} request -  мок для express.request
   *
   */
  post(url, expected, request = null) {
    if (this.postRoutes.has(url)) {
      return this.postRoutes.get(url)(request, createTestedResponse(expected));
    }
    throw new Error(`POST url not existed: ${url}`);
  }
}


/**
 * Мок для редукс store
 *
 * @param {Object} initialState - началный state
 * @returns {ReduxStore} store
 */
export function mockStore(initialState) {
  const mockStoreCreator = configureStore([]);
  const store = mockStoreCreator(initialState);
  store.getRealState = store.getState;
  store.getState = () => {
    const state = store.getRealState();
    return new Proxy(state, {
      get(target, prop) {
        if (prop === 'searchMarket') {
          // eslint-disable-next-line no-console
          console.error('searchMarket reducers deprecated use marketsList');
        }
        return target[prop];
      },
    });
  };

  return store;
}

