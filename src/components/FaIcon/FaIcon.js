import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';


/**
  * Сахар для  font-awesome
  *
  * @param {Object} props - props
  * @property {boolean} spin -  fa-spin
  * @property {string} name -  название иконки
  * @property {string} className - название класса
  */
export default function FaIcon(props) {
  const nextClassNames = classnames({
    fa: true,
    [`fa-${props.name}`]: true,
    'fa-spin': props.spin,
  }, props.className);
  return (<span className={nextClassNames} />);
}

FaIcon.propTypes = {
  spin: PropTypes.bool,
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

FaIcon.defaultProps = {
  spin: false,
  className: '',
};
