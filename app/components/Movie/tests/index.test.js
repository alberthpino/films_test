/**
 *
 * Tests for Movie
 *
 * @see https://github.com/react-boilerplate/react-boilerplate/tree/master/docs/testing
 *
 */

import React from 'react';
import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import Movie from '../index';
import { DEFAULT_LOCALE } from '../../../i18n';

configure({ adapter: new Adapter() });

describe('<Movie />', () => {
  const data = {
    movie: {
      title: 'Notorious',
      info: {
        rating: '',
        running_time_secs: '',
      },
    },
    favorite: false,
    addFavorite: () => {},
    onShare: () => {},
  };

  it('Expect to not log errors in console', () => {
    const spy = jest.spyOn(global.console, 'error');
    render(
      <IntlProvider locale={DEFAULT_LOCALE}>
        <Movie {...data} />
      </IntlProvider>,
    );
    expect(spy).not.toHaveBeenCalled();
  });

  it('Expect to have additional unit tests specified', () => {
    const header = shallow(<Movie {...data} />);
    const wrapper = header.find('.movie-title');
    expect(wrapper.text()).toBe('Notorious');
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
        <Movie {...data} />
      </IntlProvider>,
    );
    expect(firstChild).toMatchSnapshot();
  });
});
