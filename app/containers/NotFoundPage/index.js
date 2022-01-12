/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { Image, Layout } from 'antd';
import imagePageNotFound from '../../images/icon-512x512.png';

export default function NotFound() {
  return (
    <Layout className="bg-dark not-found-page">
      <div align="center">
        <Image src={imagePageNotFound} preview={false} width={200} />
        <h1 className="not-found-subtitle">Wellcome</h1>
      </div>
    </Layout>
  );
}
