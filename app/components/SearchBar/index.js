/**
 *
 * SearchBar
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { SearchOutlined } from '@ant-design/icons';
import { DatePicker, Button } from 'antd';
import './index.less';

function SearchBar(props) {
  return (
    <div className="date-picker">
      <p className="label-by-release">Search by release:</p>
      <DatePicker.RangePicker
        allowClear
        size="large"
        format="DD/MM/YYYY"
        value={props.dateRange}
        onChange={dates => {
          props.setDateRange(dates);
        }}
      />
      <Button
        type="danger"
        className="search-bar-button"
        onClick={props.onSearchDates}
        size="large"
        loading={props.loading}
      >
        <SearchOutlined /> Search
      </Button>
    </div>
  );
}

SearchBar.propTypes = {
  dateRange: PropTypes.array,
  setDateRange: PropTypes.func,
  onSearchDates: PropTypes.func,
  loading: PropTypes.bool,
};

export default memo(SearchBar);
