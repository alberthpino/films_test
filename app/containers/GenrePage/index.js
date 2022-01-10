/**
 *
 * GenrePage
 *
 */

import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectMoviesGenre,
  makeSelectTotalMoviesGenre,
  makeSelectIsLoadingMoviesGenre,
} from './selectors';
import {
  makeSelectGenres,
  makeSelectFavorites,
  makeSelectIsLoadingSendMessage,
} from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import { Layout } from 'antd';
import MainMenu from '../../components/MainMenu';
import HeaderMovies from '../../components/HeaderMovies';
import ContentMovies from '../../components/ContentMovies';
import history from '../../utils/history';
import { addFavorite, sendMessage } from '../App/actions';
import { getMoviesGenre } from './actions';
import ModalShare from '../../components/ModalShare';
import { exist, formatDate } from '../../utils/functions';

export function GenrePage(props) {
  useInjectReducer({ key: 'genrePage', reducer });
  useInjectSaga({ key: 'genrePage', saga });

  const formRef = useRef();
  const didMount = useRef(false);

  const [title, setTitle] = useState('');
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
      const slug = history.location.pathname.split('/');
      setTitle(slug[slug.length - 1]);
      const dataQuery = { genre: slug[slug.length - 1], page: 1 };
      props.getMoviesGenre(dataQuery);
    }
  }, []);

  const handleLoadMore = () => {
    if (props.isLoadingMovies) return;
    setPageMovies(pageMovies + 1);
    const dataQuery = {
      genre: title,
      page: pageMovies + 1,
      search: searchTerm,
    };
    props.getMoviesGenre(dataQuery);
  };

  const handleAddFavorite = movie => {
    props.addFavorite(movie);
  };

  const handleSearchMovie = term => {
    setPageMovies(1);
    const dataQuery = {
      page: 1,
      genre: title,
      search: searchTerm,
    };
    props.getMoviesGenre(dataQuery);
  };

  const handleSendMessage = ({ email }) => {
    const dataQuery = {
      email,
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
        menuActive="genres"
        genres={props.genres}
        searchTerm={searchTerm}
        onSearch={handleSearchMovie}
        onChange={setSearchTerm}
      />
      <HeaderMovies title={title} />
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
    </Layout>
  );
}

GenrePage.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  sendMessage: PropTypes.func.isRequired,
  getMoviesGenre: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  movies: makeSelectMoviesGenre(),
  favorites: makeSelectFavorites(),
  totalMovies: makeSelectTotalMoviesGenre(),
  isLoadingMovies: makeSelectIsLoadingMoviesGenre(),
  isLoadingShare: makeSelectIsLoadingSendMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    addFavorite: data => dispatch(addFavorite(data)),
    sendMessage: data => dispatch(sendMessage(data)),
    getMoviesGenre: data => dispatch(getMoviesGenre(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(GenrePage);
