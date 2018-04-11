/* @flow */
import { withCSS } from 'composable';
import { RowContainerStyle } from 'styles';
import { createDiv } from 'common';

const RowContainer = createDiv('RowContainer');
export default withCSS(RowContainerStyle)(RowContainer);
