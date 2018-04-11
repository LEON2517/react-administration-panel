/* eslint-disable react/prop-types */
import React from 'react';
import { shallow } from 'enzyme';
import { getDisplayName } from 'recompose';
import { createDiv } from './index.js';


const Foo = ({ name, className, child }) => {
  const Bar = createDiv(name);
  return <Bar className={className}>{child}</Bar>;
};


const props = {
  name: 'foo',
  className: 'foo',
  child: <h1>hello</h1>,
};


describe('create div function', () => {
  test('set displayname', () => {
    const Bar = createDiv('foo');
    expect(getDisplayName(Bar)).toBe('foo');
  });
  test('create div', () => {
    const Bar = createDiv('foo');
    const result = shallow(<Bar />);
    expect(result.name()).toBe('div');
  });
  test('set displayName', () => {
    const result = shallow(<Foo
      name={props.name}
      className={props.className}
      child={props.child}
    />);
    expect(result.name()).toBe('foo');
  });
  test('set className', () => {
    const result = shallow(<Foo
      name={props.name}
      className={props.className}
      child={props.child}
    />);
    expect(result.props().className).toBe('foo');
  });
  test('set child', () => {
    const result = shallow(<Foo
      name={props.name}
      className={props.className}
      child={props.child}
    />);
    expect(result.props().children).toBe(props.child);
  });
});
