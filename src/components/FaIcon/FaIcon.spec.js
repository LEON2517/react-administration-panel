import React from 'react';
import { expectSnapshot } from 'utils/testUtils';

import FaIcon from './FaIcon';

describe('FaIcon spec', () => {
  test('render name', () => {
    expectSnapshot(<FaIcon name="pensil" />);
  });
  test('render spin', () => {
    expectSnapshot(<FaIcon name="pensil" spin />);
  });
});
