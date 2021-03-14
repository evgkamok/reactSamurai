import React from 'react';
import {create} from 'react-test-renderer';
import ProfileSatusHOOK from "./ProfileSatusHOOK";
import ProfileSatus from "./ProfileSatus";
import ProfileStatus from "./ProfileSatus";

describe('ProfileStatus component', () => {
  test('status from props should be in the state', () => {
    const component = create(<ProfileSatus status={'it-kamasutra'} />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('it-kamasutra')
  })

  test('after creation span should be displayed', () => {
    const component = create(<ProfileSatus status={'it-kamasutra'} />);
    const root = component.root;
    const span = root.findByType('span');
    expect(span).not.toBeNull();
  })

  test('after creation span should be displayed status correctly', () => {
    const component = create(<ProfileSatus status={'it-kamasutra'} />);
    const root = component.root;
    const span = root.findByType('span');
    expect(span.children[0]).toBe('it-kamasutra');
  })

  test('after click on status, should be enable edit mode', () => {
    const component = create(<ProfileStatus />);
    const root = component.root;
    const span = root.findByType('span');
    span.props.onDoubleClick();
    const input = root.findByType('input');
    expect(input).not.toBeNull();
  })
})
