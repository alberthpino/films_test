/**
 *
 * ContentMovies
 *
 */

import React, { memo } from 'react';
import { Layout, Row, Col } from 'antd';
import Movie from '../Movie';
import SearchBar from '../SearchBar';

function ContentMovies(props) {
  return (
    <div className="movie-card">
      <Layout.Content style={{ padding: '0 50px' }}>
        <SearchBar />
        <Row>
          {props.movies.map(movie => (
            <Col lg={6} key={movie.id}>
              <Movie movie={movie} />
            </Col>
          ))}
        </Row>
      </Layout.Content>
    </div>
  );
}

ContentMovies.propTypes = {};

export default memo(ContentMovies);
