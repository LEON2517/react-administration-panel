/* @flow */
import React from 'react';
import { shallow } from 'enzyme';

import Select, { Option } from './Select';

describe('Select spec', () => {
  it('should render from string array', () => {
    const options = ['foo', 'bar'];
    const component = shallow(<Select options={options} />);
    expect(component.find(Option).length).toEqual(2);
    const firstOption = component.find(Option).first();
    expect(firstOption.props()).toEqual({
      value: 'foo',
      children: 'foo',
    });
    expect(component).toMatchSnapshot();
  });
});
