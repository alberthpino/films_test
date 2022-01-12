/**
 *
 * FavoritesPage
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
  makeSelectGenres,
  makeSelectFavorites,
  makeSelectIsLoadingSendMessage,
} from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import MainMenu from '../../components/MainMenu';
import HeaderMovies from '../../components/HeaderMovies';
import ContentMovies from '../../components/ContentMovies';
import { addFavorite, getFavorites, sendMessage } from '../App/actions';
import ModalShare from '../../components/ModalShare';
import { exist, formatDate } from '../../utils/functions';

export function FavoritesPage(props) {
  useInjectReducer({ key: 'favoritesPage', reducer });
  useInjectSaga({ key: 'favoritesPage', saga });

  const formRef = React.useRef();
  const didMount = React.useRef(false);

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
      props.getFavorites();
    }
  }, []);

  const handleLoadMore = () => {};

  const handleAddFavorite = movie => {
    props.addFavorite(movie);
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
      <MainMenu menuActive="favorites" genres={props.genres} />
      <HeaderMovies title="favorites" />
      <Content style={{ padding: '0 50px' }}>
        <ContentMovies
          favorites={props.favorites}
          addFavorite={handleAddFavorite}
          loadMore={handleLoadMore}
          movies={props.favorites}
          totalMovies={0}
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

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  favorites: makeSelectFavorites(),
  isLoadingShare: makeSelectIsLoadingSendMessage(),
});

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: data => dispatch(sendMessage(data)),
    addFavorite: data => dispatch(addFavorite(data)),
    getFavorites: data => dispatch(getFavorites(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

FavoritesPage.propTypes = {
  getFavorites: PropTypes.func,
  addFavorite: PropTypes.func,
  sendMessage: PropTypes.func,
  isLoadingShare: PropTypes.bool,
  favorites: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  genres: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default compose(withConnect)(FavoritesPage);
