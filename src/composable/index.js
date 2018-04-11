/**
 * compose функции
 * @module composable
 */
import React from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, css } from 'aphrodite/no-important';
import { scrollObserverIsActiveAction } from 'reducer/windowScroll/actions';
import { connect } from 'react-redux';

import classnames from 'classnames';
import {
  getDisplayName,
  compose,
  lifecycle,
} from 'recompose';


/**
 *  добавляет стили к компоненту
 *
 * @param { Stales | Funtion} cssData - стили компонента
 * @param {boolean} cleared - запрет добавления служебных свойств
 * @returns {HOC}
 */
export function withCSS(cssData, cleared = false) {
  return (WrappedComponent) => {
    const applyStyles = (props) => {
      const {
        className,
        cssStyles,
        cssLastClassName,
        ...restProps
      } = props;
      const name = getDisplayName(WrappedComponent);
      const data = typeof cssData === 'function' ? cssData(props) : cssData;
      const styles = StyleSheet.create({
        [name]: {
          ...data,
          ...props.cssStyles,
        },
      });

      const styledClassName = css(styles[name]);


      let classNameObj = className || '';
      if (cssLastClassName) {
        classNameObj = classNameObj.split(' ')
          .reduce((obj, key) => {
          // eslint-disable-next-line no-param-reassign
            obj[key] = true;
            return obj;
          }, {});
        classNameObj[cssLastClassName] = false;
      }
      const nextClassName = classnames(styledClassName, classNameObj);

      let nextProps = restProps;
      if (!cleared) {
        nextProps = {
          ...restProps,
          cssStyles: data,
          cssLastClassName: styledClassName,
        };
      }

      return (<WrappedComponent className={nextClassName} {...nextProps} />);
    };

    applyStyles.propTypes = {
      className: PropTypes.string,
      // eslint-disable-next-line react/forbid-prop-types
      cssStyles: PropTypes.object,
      cssLastClassName: PropTypes.string,
    };

    applyStyles.defaultProps = {
      className: null,
      cssStyles: {},
      cssLastClassName: null,
    };
    return applyStyles;
  };
}

/**
 * Отправляет action для активации scroll observer, когда компонент монтируется
 * и деактивации когда отмонтируется
 *
 * @type {HOC}
 * */
export const withScrollObserver = compose(
  connect(),
  lifecycle({
    /**
     * dispatch scrollObserverIsActiveAction for subscribe
     *
     * @returns {void}
     */
    componentDidMount() {
      this.props.dispatch(scrollObserverIsActiveAction());
    },
    /**
     *
     * dispatch scrollObserverIsActiveAction for unsubscribe
     *
     * @returns {void}
     */
    componentWillUnmount() {
      this.props.dispatch(scrollObserverIsActiveAction(false));
    },
  }),
);


/**
  * упрощенный  recompose branch
 *
  * @param {callback} condition - условие
  * @param {ReactComponent} Left - элемент для условия
  * @returns {HOC}
  */
export function branched(condition, Left) {
  return Right => (props) => {
    if (condition(props)) {
      return <Left {...props} />;
    }
    return <Right {...props} />;
  };
}

/**
  * вызывает событие на onMount
  *
  * @param {ActionCreator} actionCreator - action который вызовется при запуске
  * @returns {HOC}
  */
export function loadable(actionCreator) {
  return compose(
    connect(),
    lifecycle({
      componentDidMount() {
        this.props.dispatch(actionCreator());
      },
    }),
  );
}

