/**
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectIsLoadingMovies,
  makeSelectTotalMovies,
  makeSelectMovies,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Layout } from 'antd';
import HeaderMovies from '../../components/HeaderMovies';
import ContentMovies from '../../components/ContentMovies';
import { getMovies } from './actions';

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [pageMovies, setPageMovies] = useState(1);

  useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);

  useEffect(() => {
    const dataQuery = { search: '', page: pageMovies };
    props.getMovies(dataQuery);
  }, []);

  const handleSearchMovie = search => {
    const dataQuery = {
      search,
      page: 1,
    };
    props.getMovies(dataQuery);
    setSearchTerm(search);
  };

  const handleLoadMore = () => {
    if (props.isLoadingMovies) return;
    setPageMovies(pageMovies + 1);
    const dataQuery = {
      search: searchTerm,
      page: pageMovies + 1,
    };
    props.getMovies(dataQuery);
  };

  return (
    <Layout className="bg-dark">
      <HeaderMovies />
      <ContentMovies
        loadMore={handleLoadMore}
        searchTerm={searchTerm}
        onSearch={handleSearchMovie}
        movies={movies}
      />
    </Layout>
  );
}

HomePage.propTypes = {
  getMovies: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoadingMovies: makeSelectIsLoadingMovies(),
  totalMovies: makeSelectTotalMovies(),
  movies: makeSelectMovies(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMovies: data => dispatch(getMovies(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
