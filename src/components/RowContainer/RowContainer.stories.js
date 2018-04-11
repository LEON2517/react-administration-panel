import React from 'react';
import { storiesOf } from '@storybook/react';
import { withCSS } from 'composable';
import RowContainer from './RowContainer';
import Column from '../Column/Column';

const RowContainer500 = withCSS({
  height: '500px',
})(RowContainer);

storiesOf('Grid', module)
  .add('with 3 column and h 500', () => (
    <RowContainer500>
      <Column>Column 1</Column>
      <Column>Column 2</Column>
      <Column>Column 3</Column>
    </RowContainer500>
  ));
