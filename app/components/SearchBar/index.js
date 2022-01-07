/**
 *
 * SearchBar
 *
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Row, Col, Input } from 'antd';

function SearchBar() {
  return (
    <Row>
      <Col lg={{ span: 6 }} offset={{ lg: 16 }}>
        <Input size="large" placeholder="Title, gender..." />
      </Col>
    </Row>
  );
}

SearchBar.propTypes = {};

export default memo(SearchBar);
