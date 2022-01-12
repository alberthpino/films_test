/**
 *
 * ContentMovies
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import { Layout, Row, Col, Skeleton } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import Movie from '../Movie';
import SearchBar from '../SearchBar';
import EmptyResults from '../EmptyResults';
import { evalFavorite } from '../../utils/functions';
import './index.less';

function ContentMovies(props) {
  return (
    <div className="movie-card">
      <div className="movie-card-title">
        <h1>Películas en estreno</h1>
        <div>
          {props.hasFilter && (
            <SearchBar
              dateRange={props.dateRange}
              setDateRange={props.setDateRange}
              onSearchDates={props.onSearchDates}
              loading={props.loadingMovies}
            />
          )}
        </div>
      </div>
      <Layout.Content style={{ padding: '0 50px' }}>
        {props.movies.length > 0 ? (
          <InfiniteScroll
            dataLength={props.movies.length}
            next={props.loadMore}
            hasMore={props.movies.length < props.totalMovies}
            loader={<Skeleton.Button active size="large" shape="round" block />}
          >
            <Row>
              {props.movies.map(movie => (
                <Col lg={6} sm={12} key={uuidv4()}>
                  <Movie
                    movie={movie}
                    favorite={evalFavorite(movie, props.favorites)}
                    addFavorite={props.addFavorite}
                    onShare={props.onShare}
                  />
                </Col>
              ))}
            </Row>
          </InfiniteScroll>
        ) : (
          <EmptyResults />
        )}
      </Layout.Content>
    </div>
  );
}

ContentMovies.propTypes = {
  hasFilter: PropTypes.bool,
  dateRange: PropTypes.any,
  setDateRange: PropTypes.func,
  movies: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  onShare: PropTypes.func,
  addFavorite: PropTypes.func,
  loadMore: PropTypes.func,
  onSearchDates: PropTypes.func,
  loadingMovies: PropTypes.bool,
  totalMovies: PropTypes.number,
  favorites: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default memo(ContentMovies);
