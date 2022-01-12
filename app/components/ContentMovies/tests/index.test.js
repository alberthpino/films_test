/**
 *
 * Tests for ContentMovies
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import ContentMovies from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

configure({ adapter: new Adapter() });

describe('<ContentMovies />', () => {
  const data = {
    hasFilter: false,
    dateRange: [null, null],
    setDateRange: () => {},
    movies: [],
    onShare: () => {},
    addFavorite: () => {},
    loadMore: () => {},
    onSearchDates: () => {},
    loadingMovies: false,
    totalMovies: 0,
    favorites: [],
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <ContentMovies {...data} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    const empty = shallow(<ContentMovies {...data} />);
    const title = empty.find('h1');
    expect(title.text()).toBe('Películas en estreno');
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
        <ContentMovies {...data} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
