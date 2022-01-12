/**
 *
 * MoviesPage
 *
 */

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { Layout } from 'antd';
import {
  makeSelectIsLoadingMovies,
  makeSelectMovies,
  makeSelectTotalMovies,
} from './selectors';
import {
  makeSelectGenres,
  makeSelectFavorites,
  makeSelectIsLoadingSendMessage,
} from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import HeaderMovies from '../../components/HeaderMovies';
import ContentMovies from '../../components/ContentMovies';
import { getMovies } from './actions';
import { addFavorite, sendMessage } from '../App/actions';
import ModalShare from '../../components/ModalShare';
import { exist, formatDate } from '../../utils/functions';

export function MoviesPage(props) {
  useInjectReducer({ key: 'moviesPage', reducer });
  useInjectSaga({ key: 'moviesPage', saga });

  const formRef = React.useRef();
  const didMount = React.useRef(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [pageMovies, setPageMovies] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [movieShare, setMovieShare] = useState({});
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (didMount.current && !props.isLoadingShare) {
      setModalVisible(false);
      setEmail('');
      formRef.current.resetFields();
    }
  }, [props.isLoadingShare]);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      const dataQuery = { search: '', page: pageMovies };
      props.getMovies(dataQuery);
    }
  }, []);

  const handleSearchMovie = term => {
    setPageMovies(1);
    const dataQuery = {
      search: term,
      page: 1,
    };
    props.getMovies(dataQuery);
  };

  const handleAddFavorite = movie => {
    props.addFavorite(movie);
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

  const { Content } = Layout;

  const handleSendMessage = data => {
    const dataQuery = {
      email: data.email,
      title: movieShare.title,
      date: exist(movieShare.info.release_date)
        ? formatDate(movieShare.info.release_date)
        : '',
      image: movieShare.info.image_url,
    };
    props.sendMessage(dataQuery);
  };

  const handleShareMovie = movie => {
    setMovieShare(movie);
    setModalVisible(true);
  };

  return (
    <Layout className="bg-dark wrapper-main">
      <MainMenu
        menuActive="movies"
        genres={props.genres}
        searchTerm={searchTerm}
        onSearch={handleSearchMovie}
        onChange={setSearchTerm}
      />
      <HeaderMovies title="movies" />
      <Content style={{ padding: '0 50px' }}>
        <ContentMovies
          favorites={props.favorites}
          addFavorite={handleAddFavorite}
          loadMore={handleLoadMore}
          movies={props.movies}
          totalMovies={props.totalMovies}
          onShare={handleShareMovie}
        />
        <ModalShare
          formRef={formRef}
          visible={modalVisible}
          email={email}
          onChangeEmail={() => setEmail(false)}
          onCancel={() => setModalVisible(false)}
          onOk={handleSendMessage}
          loading={props.isLoadingShare}
        />
      </Content>
    </Layout>
  );
}

MoviesPage.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  sendMessage: PropTypes.func,
  isLoadingMovies: PropTypes.bool,
  genres: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  favorites: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  movies: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  totalMovies: PropTypes.number,
  isLoadingShare: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  favorites: makeSelectFavorites(),
  isLoadingMovies: makeSelectIsLoadingMovies(),
  movies: makeSelectMovies(),
  totalMovies: makeSelectTotalMovies(),
  isLoadingShare: makeSelectIsLoadingSendMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: data => dispatch(sendMessage(data)),
    getMovies: data => dispatch(getMovies(data)),
    addFavorite: data => dispatch(addFavorite(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(MoviesPage);
