/* @flow */
/*
import React from 'react';
import { connect } from 'react-redux';
import LOAD_DATA_TYPES from 'reducer/loadData/types';

import {
  compose,
  lifecycle,
  branch,
  renderComponent,
} from 'recompose';

import {
  FaSpiner,
} from 'components/icons';

import {
  withCSS,
} from 'composable';

import {
  createFullsizeDiv,
} from 'common';

import {
  flexCenterStyle,
} from 'styles';

const Spiner = withCSS({
  fontSize: '40pt',
  color: 'white',
})(FaSpiner);

const LoaderContainer = createFullsizeDiv('LoaderContainer', {
  ...flexCenterStyle,
});

function Loader() {
  return (
    <LoaderContainer>
      <Spiner />
    </LoaderContainer>
  );
}

const isLoadingHOC = (
  isLoading => branch(isLoading, renderComponent(Loader))
)(props => props.isLoading);

export default compose(
  connect(state => ({
    isLoading: state.loadData,
  })),
  lifecycle({
    componentWillMount() {
      this.props.dispatch({ type: LOAD_DATA_TYPES.LOADING });
      setTimeout(() => this.props.dispatch({ type: LOAD_DATA_TYPES.LOAD }), 1000);
    },
  }),
  isLoadingHOC,
);
 */
