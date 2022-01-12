/**
 *
 * Tests for MainMenu
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
// import 'jest-dom/extend-expect'; // add some helpful assertions
import { BrowserRouter as Router } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import MainMenu from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

configure({ adapter: new Adapter() });

describe('<MainMenu />', () => {
  const data = {
    menuActive: 'movies',
    genres: [],
    onSearch: () => {},
    onChange: () => {},
    searchTerm: '',
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Router>
          <MainMenu {...data} />
        </Router>
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    const header = shallow(
      <Router>
        <MainMenu {...data} />
      </Router>,
    );
    const wrapper = header.find(MainMenu);
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
        <Router>
          <MainMenu {...data} />
        </Router>
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
