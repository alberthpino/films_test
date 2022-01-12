/**
 *
 * Tests for HeaderMovies
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import HeaderMovies from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

configure({ adapter: new Adapter() });

describe('<HeaderMovies />', () => {
  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <HeaderMovies />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    const header = shallow(<HeaderMovies />);
    const wrapper = header.find('.home-header');
    expect(wrapper.length).toEqual(3);
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
        <HeaderMovies />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
