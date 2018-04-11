import React from 'react';
import PropTypes from 'prop-types';
import {
  PropTypesExtends,
  createElement,
  createDiv,
} from 'common';

export const BaseButton = createElement('button', 'BaseButton', 'btn');

/**
 * Кнопка
 *
 * @param {string} props - тип кнопки
 */
export function Button({ btnType, children, ...rest }) {
  const typeClass = btnType ? `btn-${btnType}` : '';
  return (<BaseButton className={typeClass} {...rest}>{children}</BaseButton>);
}

Button.propTypes = {
  btnType: PropTypes.string, // типы как в бутстрап: primary, danger
  children: PropTypesExtends.children.isRequired,
};

Button.defaultProps = {
  btnType: '',
};

export const ContainerFluid = createDiv('ContainerFluid', 'container-fluid');

/**
 * каркас страницы
 *
 * @param {string} props - props
 */
export function Page({ title, children }) {
  return (
    <ContainerFluid>
      <section className="content-header">
        <h1>{title}</h1>
      </section>
      {children}
    </ContainerFluid>
  );
}

Page.propTypes = {
  title: PropTypes.string.isRequired, // загаловок страницы
  children: PropTypesExtends.children.isRequired,
};

/**
 * Простой box. Только box-body и все
 *
 * @param {string} props - тип кнопки
 */
export function SimpleBox({ children }) {
  return (
    <div className="box">
      <div className="box-header" />
      <div className="box-body no-padding">
        {children}
      </div>
    </div>
  );
}

SimpleBox.propTypes = {
  children: PropTypesExtends.children.isRequired,
};


/**
 * info alert
 *
 * @param {string} props  - props
 */
export function InfoAlert({ children }) {
  return (
    <div className="alert alert-info">
      {children}
    </div>
  );
}

InfoAlert.propTypes = {
  children: PropTypesExtends.children.isRequired,
};

export const Row = createDiv('Row', 'row');

