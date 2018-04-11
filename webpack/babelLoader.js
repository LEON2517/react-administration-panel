/* eslint-disable */

import fs from 'fs';
import ENV from './env';

const { PWD, NODE_ENV } = ENV;
export default function babelLoader() {
  const babelrc = fs.readFileSync(`${PWD}/.babelrc`, { encoding: 'utf8' });
  let babelrcObject = {};

  try {
    babelrcObject = JSON.parse(babelrc);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('==>     ERROR: Error parsing your .babelrc.');
    // eslint-disable-next-line no-console
    throw new Error(err);
  }

  const babelrcEnvObject = babelrcObject.env ? babelrcObject.env[NODE_ENV] : null;
  let babelLoaderQuery = { ...babelrcObject };
  let combinedPlugins = babelrcObject.plugins || [];
  if (babelrcEnvObject) {
    combinedPlugins = combinedPlugins.concat(babelrcEnvObject.plugins);
    babelLoaderQuery = {
      ...babelLoaderQuery,
      ...babelrcEnvObject,
      plugins: combinedPlugins,
    };
  }

  return ['babel-loader', JSON.stringify(babelLoaderQuery)].join('?');
}
