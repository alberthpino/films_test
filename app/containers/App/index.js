import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import HomePage from 'containers/HomePage/index';
import NotFound from 'containers/NotFoundPage/index';
import GenrePage from 'containers/GenrePage/index';
import FavoritesPage from 'containers/FavoritesPage/index';
import MoviesPage from 'containers/MoviesPage/index';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { compose } from 'redux';
import saga from './saga';
import reducer from './reducer';
import { getGenders, getFavorites } from './actions';
import {
  makeSelectGenres,
  makeSelectIsLoadingFavorites,
  makeSelectFavorites,
} from './selectors';

import 'antd/dist/antd.less';
import './theme.less';

const App = props => {
  useInjectReducer({ key: 'app', reducer });
  useInjectSaga({ key: 'app', saga });

  useEffect(() => {
    props.getGenders();
    props.getFavorites();
  }, []);

  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/favorites" component={FavoritesPage} />
        <Route exact path="/movies" component={MoviesPage} />
        {props.genres.map(genre => (
          <Route
            exact
            key={uuidv4()}
            path={`/genre/${genre}`}
            component={GenrePage}
          />
        ))}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

function mapDispatchToProps(dispatch) {
  return {
    getGenders: data => dispatch(getGenders(data)),
    getFavorites: data => dispatch(getFavorites(data)),
  };
}

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  favorites: makeSelectFavorites(),
  isLoadingFavorites: makeSelectIsLoadingFavorites(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

App.propTypes = {
  getGenders: PropTypes.func,
  getFavorites: PropTypes.func,
  genres: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default compose(withConnect)(App);
