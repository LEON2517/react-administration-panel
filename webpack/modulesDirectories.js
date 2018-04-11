import path from 'path';
import ENV from './env';

const { PWD, SRC_DIR } = ENV;

const modulesDirectories = [
  SRC_DIR,
  path.resolve(PWD, 'node_modules'),
  path.resolve(PWD, 'common'),
];

export default modulesDirectories;
