/**
 * @module styles
 */
// css сахар
const center = 'center';
const flex = 'flex';

// контейнер для сетки
export const RowContainerStyle = {
  display: flex,
  alignItems: 'stretch',
};

//  колонка сетки
export const ColumnStyle = {
  'flex-grow': '1',
};

/**
 * Css квадрат
 *
 * @param {string} size - размер квадрата
 * @returns {Style} style - стили
 * @example
 * rectStyle('20px');
 */
export function rectStyle(size) {
  return {
    width: size,
    height: size,
  };
}


// объявления шрифтов
export const fontsStyle = {
  oswald: {
    fontFamily: '"Oswald", sans-serif',
  },
  openSans: {
    fontFamily: '"Open Sans", sans-serif',
  },
  sourceSans: {
    fontFamily: '"Source Sans Pro", sans-serif',
  },
  roboto: {
    fontFamily: '"Roboto", sans-serif',
  },
};

fontsStyle.active = fontsStyle.roboto;

// цвета
export const colors = {
  green: '#219DA5',
  dark: '#180F20',
  darkBorder: '#404550',
  light: '#bdc3ce',
  white: '#fff',
  purple: '#B278E8',
  blue1: '#3E99F7',
  blue2: '#0538bb',
  blue3: '#030d65',

};

// флекс по центру
export const flexCenterStyle = {
  display: flex,
  alignItems: center,
  justifyContent: center,
};
