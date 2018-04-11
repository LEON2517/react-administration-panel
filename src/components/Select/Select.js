/**
 * @modules components
 */
import React from 'react';
import PropTypes from 'prop-types';

import { createElement } from 'common';

export const HtmlSelect = createElement('select', 'Select', 'form-control');
export const Option = createElement('option', 'Option');

/**
 * компонент Селекс
 *
 * @param {Object} props  - props
 * @property {Array<string>} options - массив для option
 * @returns {ReactElememt}
 */
export default function Select(props) {
  const { options, ...rest } = props;
  return (
    <HtmlSelect {...rest}>
      { options.map(option => (<Option key={option} value={option} >{option}</Option>))}
    </HtmlSelect>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string),
};

Select.defaultProps = {
  options: [],
};
