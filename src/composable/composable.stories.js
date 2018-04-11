/* eslint require-jsdoc:0 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withCSS } from 'composable';
import { createDiv } from 'common';

const MainBase = withCSS({ height: '20px' })(createDiv('Div'));

const translateKeyframes = {
  '0%': {
    transform: 'translateX(0)',
  },

  '50%': {
    transform: 'translateX(100px)',
  },

  '100%': {
    transform: 'translateX(0)',
  },
};

const opacityKeyframes = {
  from: {
    opacity: 0,
  },
  to: {
    opacity: 1,
  },
};

/* Просто добавляем стили как объект */
const MainStatic = withCSS({
  backgroundColor: 'red',
  border: '1px solid blue',
  animationName: [translateKeyframes, opacityKeyframes],
  animationDuration: '3s, 1200ms',
  animationIterationCount: 'infinite',
})(MainBase);

/* Или используем функцию  (props) => styles */
const MainAwesome = withCSS(({ color }) => ({
  backgroundColor: 'blue',
  border: '1px solid blue',
  animationName: [translateKeyframes, opacityKeyframes],
  animationDuration: '3s, 1200ms',
  animationIterationCount: 'infinite',
  ':hover': {
    backgroundColor: color,
  },
  '@media (max-width: 600px)': {
    backgroundColor: 'red',
  },
}))(MainBase);


function Main() {
  return (
    <div>
      <MainStatic />
      <MainAwesome color="green" />
    </div>
  );
}

storiesOf('composable', module)
  .add('withCSS', () => (<Main />));
