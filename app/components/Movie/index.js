/**
 *
 * Movie
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import { Image } from 'antd';
import movieDetaulft from '../../images/movie-default.jpg';
import './index.less';

function Movie(props) {
  const imageRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(props.movie.info.image_url);
  }, []);

  const handleError = () => {
    setImage(movieDetaulft);
  };

  return (
    <div className="movie-card" align="center">
      <Image ref={imageRef} width={200} src={image} onError={handleError} />
      <h2 align="center" className="movie-title">
        {props.movie.title}
      </h2>
    </div>
  );
}

Movie.propTypes = {};

export default memo(Movie);
