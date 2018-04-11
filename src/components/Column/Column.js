/* @flow */
import { withCSS } from 'composable';
import { ColumnStyle } from 'styles';
import { createDiv } from 'common';

const Column = createDiv('Column');

export default withCSS(ColumnStyle)(Column);
