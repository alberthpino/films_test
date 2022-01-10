/**
 *
 * HeaderMovies
 *
 */

import React, { memo } from 'react';
import { Carousel } from 'antd';
import './index.less';
function HeaderMovies() {
  return (
    <Carousel autoplay className="carousel-header">
      <div className="home-header second">
        <div className="info container">
          <h1>Tetralogía de Avengers</h1>
          <h3>
            Este fin de semana llega a su fin la tan esperada segunda parte de
            "Avengers: Infinity War".
          </h3>
        </div>
      </div>
      <div className="home-header third">
        <div className="info container">
          <h1>The Justice League</h1>
          <h3>
            La Liga de la Justicia de Zack Snyder' se estrena antes de tiempo
            por accidente: HBO Max cambió 'Tom y Jerry' por la película de
            superhéroes.
          </h3>
        </div>
      </div>
      <div className="home-header first">
        <div className="info container">
          <h1>Extraction</h1>
          <h3>
            Película protagonizada por Chris Hemsworth, lanza el trailer
            oficial.
          </h3>
        </div>
      </div>
    </Carousel>
  );
}

export default memo(HeaderMovies);
