import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import { Router } from 'app';


/**
 * Прмложение
 *
 * @param {Object} props - props
 * @property {Object} store - redux store
 * @returns {ReactElement}
 */
export default function Main(props) {
  const { store } = props;
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
}

Main.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  store: PropTypes.object.isRequired,
};
