/**
 * @module composable
 */
import { withFormik } from 'formik';
import { connect } from 'react-redux';

import { compose } from 'recompose';

/**
 * упрoщение работы с formik
 * автоматический запрет  submit
 *
 * @param {Object} options - настройки компонента
 * handleSubmit - callback для сабмита формы
 * @returns {HOC}
 */
export function withFormikExtended(options) {
  const {
    handleSubmit,
    ...rest
  } = options;
  return withFormik({
    ...rest,
    handleSubmit: (values, formikBag) => {
      formikBag.setSubmitting(false);
      handleSubmit(values, formikBag);
    },
  });
}

/**
 *  Сахар formik + redux connect
 *
 * @param {Array} formikArgs  - параметеры withFormikExtended
 * @param {Array} connectArgs - параметеры для connect
 * @returns {HOC}
 */
export function withFormikConnected(formikArgs, connectArgs = []) {
  return compose(
    connect(...connectArgs),
    withFormikExtended(...formikArgs),
  );
}
