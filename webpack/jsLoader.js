import path from 'path';
import babelLoader from './babelLoader';
import ENV from './env';

const { PWD, SRC_DIR } = ENV;
const jsLoader = {
  test: /\.js$/,
  include: [
    SRC_DIR,
    path.resolve(PWD, 'node_modules/@nonlux/'),
  ],
  loaders: [babelLoader()],
};

export default jsLoader;
