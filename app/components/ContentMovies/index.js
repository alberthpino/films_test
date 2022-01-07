/**
 *
 * ContentMovies
 *
 */

import React, { memo } from 'react';
import { Layout, Row, Col, Skeleton } from 'antd';
import Movie from '../Movie';
import SearchBar from '../SearchBar';
import EmptyResults from '../EmptyResults';
import InfiniteScroll from 'react-infinite-scroll-component';

function ContentMovies(props) {
  return (
    <div className="movie-card">
      <Layout.Content style={{ padding: '0 50px' }}>
        <SearchBar searchTerm={props.searchTerm} onSearch={props.onSearch} />
        {props.movies.length > 0 ? (
          <InfiniteScroll
            dataLength={props.movies.length}
            next={props.loadMore}
            hasMore={props.movies.length < 50}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            //endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
            scrollableTarget="scrollableDiv"
          >
            <Row>
              {props.movies.map(movie => (
                <Col lg={6} key={movie.id}>
                  <Movie movie={movie} />
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

ContentMovies.propTypes = {};

export default memo(ContentMovies);
