import {
  createDiv,
  deprecate,
} from './index.js';

export default deprecate(createDiv, 'createDiv', 'createDiv from \'common\'');
