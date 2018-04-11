/* @flow */
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Main } from 'app';
import store from 'store';

require('styles/normalize.css');
require('styles/additional.css');

ReactDOM.render(<Main store={store} />, document.getElementById('content'));
