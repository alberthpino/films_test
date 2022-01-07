/**
 *
 * SearchBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Row, Col, Input } from 'antd';

function SearchBar(props) {
  return (
    <Row>
      <Col lg={{ span: 6 }}>
        <Input
          allowClear
          size="large"
          value={props.searchTerm}
          onChange={({ target }) => props.onSearch(target.value)}
          placeholder="Title, gender..."
        />
      </Col>
    </Row>
  );
}

SearchBar.propTypes = {};

export default memo(SearchBar);
