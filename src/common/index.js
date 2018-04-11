/**
 * @module common
 */
import React from 'react';
import { setDisplayName } from 'recompose';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withCSS } from 'composable';

import { rectStyle } from 'styles';

/**
 * Deprecate error composable
 *
 * @param {Callback} callback - функция которая больше не поддерживается
 * @param {string} functionName - название функции
 * @param {string} use -  советы по использованию
 * @returns {Callback}
 */
export function deprecate(callback, functionName, use) {
  return (...args) => {
    // eslint-disable-next-line no-console
    console.warn(`${functionName} deprecated. You should use ${use}`);
    return callback(...args);
  };
}

/**
 * Фильтр для реакт свойств
 *
 * @param {Object} props - props
 * @returns {Object}
 */
function filterProps(props) {
  const {
    className,
    id,
    onClick,
    onBlur,
    children,
    onSubmit,
    src,
    href,
    type,
    value,
    name,
    onChange,
  } = props;


  const nextProps = {
    className,
    id,
    onBlur,
    onClick,
    children,
    onSubmit,
    src,
    href,
    type,
    value,
    name,
    onChange,
  };
  const ret = {};
  Object.entries(nextProps).forEach(([key, val]) => {
    if (typeof val !== 'undefined') {
      ret[key] = val;
    }
  });

  return ret;
}

/**
 *  Создает кастомный react  элемент
 *
 * @param {string} element - dom элемент
 * @param {string} name - название для devtools
 * @param {Object | string} styles -  css стили или класс
 * @returns {ReactComponent}
 */
export function createElement(element, name, styles) {
  const isClassName = typeof styles === 'string';
  const nextComponent = setDisplayName(name)((props) => {
    const { children, className, ...rest } = props;
    const nextClassName = isClassName ? classnames(className, styles) : className;
    const filteredProps = filterProps(rest);
    const nextProps = {
      ...filteredProps,
      className: nextClassName,
    };
    return React.createElement(element, nextProps, children);
  });

  if (styles && typeof styles !== 'string') {
    return withCSS(styles, true)(nextComponent);
  }
  return nextComponent;
}

/**
 * Создает div элемент
 *
 * @param {string} name - название для devtools
 * @param {Object | string} styles -  css стили или класс
 * @returns {ReactComponent}
 */
export function createDiv(name, styles) {
  return createElement('div', name, styles);
}

/**
 * fullsize div
 *
 * @param {string} name - название для devtools
 * @param {Object | string} styles -  css стили или класс
 * @returns {ReactComponent}
 */
export function createFullsizeDiv(name, styles) {
  return createDiv(name, {
    ...rectStyle('100%'),
    ...styles,
  });
}

/**
 * empty element
 *
 * @returns {ReactElement}
 */
export function Empty() {
  return '';
}


export const PropTypesExtends = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

