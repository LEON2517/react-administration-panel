import React from 'react';
import { storiesOf } from '@storybook/react';
import createDiv from './createDiv';


const Head = createDiv('NameDiv');

storiesOf('createDiv', module)
  .add('with name', () => (<Head className="foo">Bar</Head>));
