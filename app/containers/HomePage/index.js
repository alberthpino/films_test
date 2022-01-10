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
  makeSelectMovies,
  makeSelectTotalMovies,
  makeSelectIsLoadingMovies,
  makeSelectIsLoadingFavorites,
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
import { getMovies, getFavorites } from './actions';
import { addFavorite, sendMessage } from '../App/actions';
import { exist, formatDate } from '../../utils/functions';
import ModalShare from '../../components/ModalShare';
import './index.less';

export function HomePage(props) {
  useInjectReducer({ key: 'homePage', reducer });
  useInjectSaga({ key: 'homePage', saga });

  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [pageMovies, setPageMovies] = useState(1);
  const [dateRange, setDateRange] = useState([null, null]);
  const [modalVisible, setModalVisible] = useState(false);
  const [movieShare, setMovieShare] = useState({});
  const [email, setEmail] = useState('');

  const formRef = React.useRef();
  const didMount = React.useRef(false);

  useEffect(() => {
    setMovies(props.movies);
  }, [props.movies]);

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

      if (
        exist(dateRange) &&
        dateRange.length > 0 &&
        dateRange[0] &&
        dateRange[1]
      ) {
        dataQuery.start_date = dateRange[0];
        dataQuery.end_date = dateRange[1];
      }

      props.getMovies(dataQuery);
      props.getFavorites();
    }
  }, []);

  const handleLoadMore = () => {
    if (props.isLoadingMovies) return;
    setPageMovies(pageMovies + 1);
    const dataQuery = {
      search: searchTerm,
      page: pageMovies + 1,
    };
    if (
      exist(dateRange) &&
      dateRange.length > 0 &&
      dateRange[0] &&
      dateRange[1]
    ) {
      dataQuery.start_date = dateRange[0];
      dataQuery.end_date = dateRange[1];
    }
    props.getMovies(dataQuery);
  };

  const handleAddFavorite = movie => {
    props.addFavorite(movie);
  };

  const handleSearchMovie = search => {
    const dataQuery = {
      search,
      page: 1,
    };
    props.getMovies(dataQuery);
  };

  const handleSearchDates = () => {
    const dataQuery = {
      search: searchTerm,
      page: 1,
    };

    if (
      exist(dateRange) &&
      dateRange.length > 1 &&
      dateRange[0] &&
      dateRange[1]
    ) {
      dataQuery.start_date = dateRange[0];
      dataQuery.end_date = dateRange[1];
    }

    props.getMovies(dataQuery);
  };

  const { Content } = Layout;

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
        genres={props.genres}
        searchTerm={searchTerm}
        onSearch={handleSearchMovie}
        onChange={setSearchTerm}
      />
      <HeaderMovies />
      <Content style={{ padding: '0 50px' }}>
        <ContentMovies
          hasFilter
          favorites={props.favorites}
          addFavorite={handleAddFavorite}
          loadMore={handleLoadMore}
          movies={movies}
          totalMovies={props.totalMovies}
          dateRange={dateRange}
          setDateRange={setDateRange}
          onSearchDates={handleSearchDates}
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

HomePage.propTypes = {
  getMovies: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  genres: makeSelectGenres(),
  movies: makeSelectMovies(),
  favorites: makeSelectFavorites(),
  totalMovies: makeSelectTotalMovies(),
  isLoadingMovies: makeSelectIsLoadingMovies(),
  isLoadingShare: makeSelectIsLoadingSendMessage(),
  isLoadingFavorites: makeSelectIsLoadingFavorites(),
});

function mapDispatchToProps(dispatch) {
  return {
    getMovies: data => dispatch(getMovies(data)),
    addFavorite: data => dispatch(addFavorite(data)),
    getFavorites: data => dispatch(getFavorites(data)),
    sendMessage: data => dispatch(sendMessage(data)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(HomePage);
