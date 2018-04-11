import ENV from './env';

const { NODE_ENV, CLIENT, DEBUG } = ENV;

export default {
  __CLIENT__: CLIENT,
  __DEBUG__: DEBUG,
  NODE_ENV: `"${NODE_ENV}"`,
  'process.env.NODE_ENV': `"${NODE_ENV}"`,
  __IS_DEV__: NODE_ENV === 'development',
  __IS_PROD__: NODE_ENV === 'production',
  __IS_TEST__: NODE_ENV === 'test',
};

