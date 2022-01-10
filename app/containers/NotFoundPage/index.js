/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import imagePageNotFound from '../../images/icon-512x512.png';
import { Image, Layout } from 'antd';

export default function NotFound() {
  return (
    <Layout className="bg-dark not-found-page">
      <div align="center">
        <Image src={imagePageNotFound} width={200} />
        <h1 className="not-found-subtitle">404</h1>
        <h2 className="not-found-subtitle">Page not found</h2>
      </div>
    </Layout>
  );
}
