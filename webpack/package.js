import fs from 'fs';
import ENV from './env.js';

const { PWD } = ENV;

export default JSON.parse(fs.readFileSync(`${PWD}/package.json`, {
  encoding: 'utf8',
}));
