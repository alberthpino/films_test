/**
 *
 * Tests for ModalShare
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ModalShare from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

configure({ adapter: new Adapter() });

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

describe('<ModalShare />', () => {
  const data = {
    visible: true,
    formRef: null,
    onOk: () => {},
    onChangeEmail: () => {},
    onCancel: () => {},
    loading: false,
    email: '',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ModalShare {...data} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    const modal = shallow(<ModalShare {...data} />);
    const wrapper = modal.find('.input-share');
    expect(wrapper).toHaveLength(1);
  });

  /**
   * Unskip this test to use it
   *
   * @see {@link https://jestjs.io/docs/en/api#testskipname-fn}
   */
  it.skip('Should render and match the snapshot', () => {
    const {
      container: { firstChild },
    } = render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ModalShare {...data} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
