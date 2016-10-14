import React from 'react';
import { mount, shallow } from 'enzyme';
import chai, { expect } from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import PasswordMask from '../src/index';

chai.use(chaiEnzyme());

describe('<PasswordMask />', () => {
  it('renders password field', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    expect(component.find('input[type="password"]')).to.be.present();
  });

  it('renders text field', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    expect(component.find('input[type="text"]')).to.be.present();
  });

  it('renders show/hide button', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    expect(component.find('a')).to.be.present();
  });

  it('defines HTML attributes passed from props', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        id="password"
        name="password"
        placeholder="Enter password"
        onChange={() => ({})}
      />
    );

    const input = component.find('input[type="password"]');

    expect(input).to.have.attr('id').equal('password');
    expect(input).to.have.attr('name').equal('password');
    expect(input).to.have.attr('placeholder').equal('Enter password');
  });

  it('shows password field by default', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    expect(component.find('input[type="password"]')).to.have.style('display', 'block');
  });

  it('hides text field by default', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    expect(component.find('input[type="text"]')).to.have.style('display', 'none');
  });

  it('updates internal passwordShown state', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    const showHideButton = component.find('a');
    showHideButton.simulate('click', { preventDefault: () => ({}) });

    expect(component.instance().state.passwordShown).to.equal(true);
  });

  it('updates internal hasBeenFocused state', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    const input = component.find('input[type="password"]');
    input.simulate('focus');

    expect(component.instance().state.hasBeenFocused).to.equal(true);
  });

  it('applies input styles passed from props', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        inputStyles={{ borderColor: 'aqua' }}
        onChange={() => ({})}
      />
    );

    expect(component.find('input[type="password"]')).to.have.style('border-color', 'aqua');
  });

  it('applies button styles passed from props', () => {
    const component = shallow(
      <PasswordMask
        value={''}
        buttonStyles={{ background: 'cornsilk' }}
        onChange={() => ({})}
      />
    );

    expect(component.find('a')).to.have.style('background', 'cornsilk');
  });

  it('calls onChange callback', () => {
    const onChange = sinon.spy();

    const component = shallow(
      <PasswordMask
        value={''}
        onChange={onChange}
      />
    );

    const input = component.find('input[type="password"]');
    input.simulate('change');

    expect(onChange.calledOnce).to.equal(true);
  });

  it('calls onShow callback with value argument', () => {
    const onShow = sinon.spy();

    const component = shallow(
      <PasswordMask
        value={''}
        onShow={onShow}
        onChange={() => ({})}
      />
    );

    const showHideButton = component.find('a');
    showHideButton.simulate('click', { preventDefault: () => ({}) });

    expect(onShow.withArgs('').calledOnce).to.equal(true);
  });

  it('calls onHide callback with value argument', () => {
    const onHide = sinon.spy();

    const component = shallow(
      <PasswordMask
        value={''}
        onHide={onHide}
        onChange={() => ({})}
      />
    );

    const showHideButton = component.find('a');
    showHideButton.simulate('click', { preventDefault: () => ({}) });
    showHideButton.simulate('click', { preventDefault: () => ({}) });

    expect(onHide.withArgs('').calledOnce).to.equal(true);
  });

  it('calls onToggle callback with value argument', () => {
    const onToggle = sinon.spy();

    const component = shallow(
      <PasswordMask
        value={''}
        onToggle={onToggle}
        onChange={() => ({})}
      />
    );

    const showHideButton = component.find('a');
    showHideButton.simulate('click', { preventDefault: () => ({}) });
    showHideButton.simulate('click', { preventDefault: () => ({}) });

    expect(onToggle.withArgs('').calledTwice).to.equal(true);
  });

  it('focuses visible text field on show', () => {
    const component = mount(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    const passwordInput = component.ref('password');
    const textInput = component.ref('text');
    const spy = sinon.spy(textInput.node, 'focus');
    const showHideButton = component.find('a');

    passwordInput.simulate('focus');
    showHideButton.simulate('click');

    expect(spy.calledOnce).to.equal(true);
  });

  it('focuses visible password field on hide', () => {
    const component = mount(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    const passwordInput = component.ref('password');
    const textInput = component.ref('text');
    const spy = sinon.spy(passwordInput.node, 'focus');
    const showHideButton = component.find('a');

    showHideButton.simulate('click');
    textInput.simulate('focus');
    showHideButton.simulate('click');

    expect(spy.calledOnce).to.equal(true);
  });

  it('cancels mouseDown event', () => {
    const preventDefault = sinon.spy();

    const component = shallow(
      <PasswordMask
        value={''}
        onChange={() => ({})}
      />
    );

    const showHideButton = component.find('a');
    showHideButton.simulate('mouseDown', { preventDefault });

    expect(preventDefault.calledOnce).to.equal(true);
  });
});
