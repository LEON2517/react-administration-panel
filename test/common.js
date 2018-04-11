import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

/* eslint-disable no-console */
const oldwarn = console.warn;
console.warn = (warn, ...rest) => {
  // @TODO: Check this after resolve #9
  const skiped = [
    'Warning: ReactTestUtils has been moved to react-dom/test-utils. Update references to remove this warning.',
  ];
  if (!skiped.includes(warn)) {
    oldwarn(warn, ...rest);
    throw new Error(`Warning: ${warn}`);
  }
};

const olderror = console.error;
console.error = (error, ...rest) => {
  // @TODO: Check this after resolve #9
  const skiped = [
    'react-addons-test-utils is an implicit dependency in order to support react@0.13-14. Please add the appropriate version to your devDependencies. See https://github.com/airbnb/enzyme#installation',
    'Warning: Shallow renderer has been moved to react-test-renderer/shallow. Update references to remove this warning.',
  ];
  if (!skiped.includes(error)) {
    olderror(error, ...rest);
    throw new Error(`Error: ${error}`);
  }
};

jest.mock('aphrodite/lib/inject');
