/**
 *
 * ContentMovies
 *
 */

import React, { memo } from 'react';
import { Layout, Row, Col } from 'antd';
import Movie from '../Movie';

function ContentMovies(props) {
  return (
    <div class="movie-card">
      <Layout.Content style={{ padding: '0 50px' }}>
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
