/**
 *
 * EmptyResults
 *
 */

import React from 'react';
import { Image } from 'antd';
import imageDefault from '../../images/icon-512x512.png';
import './index.less';

function EmptyResults() {
  return (
    <div className="empty-section" align="center">
      <Image src={imageDefault} width={150} preview={false} />
      <h2 className="empty-text">No results found</h2>
    </div>
  );
}

export default EmptyResults;
