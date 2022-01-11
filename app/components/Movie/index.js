/**
 *
 * Movie
 *
 */

import React, { memo, useEffect, useState, useRef } from 'react';
import { Image, Button, Tooltip, Popover, Input } from 'antd';
import {
  HeartOutlined,
  InfoCircleOutlined,
  ShareAltOutlined,
} from '@ant-design/icons';
import movieDetaulft from '../../images/movie-default.jpg';
import './index.less';
import { exist, getVideoDuration } from '../../utils/functions';

function Movie(props) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    setImage(props.movie.info.image_url);
  }, []);

  const handleError = () => {
    setImage(movieDetaulft);
  };

  const showInfo = movie => (
    <div className="movie-tooltip">
      <p>{movie.info.plot}</p>
      <p>Year: {movie.year}</p>
      {exist(movie.info.actors) && exist(movie.info.actors.join) && (
        <p>Actors: {movie.info.actors.join(', ')}</p>
      )}
      {exist(movie.info.genres) && exist(movie.info.genres.join) && (
        <p>Genres: {movie.info.genres.join(', ')}</p>
      )}
      {exist(movie.info.directors) && exist(movie.info.directors.join) && (
        <p>Directors: {movie.info.directors.join(', ')}</p>
      )}
    </div>
  );

  return (
    <div className="movie-card" align="center">
      <Image
        placeholder
        width={200}
        className="movie-image"
        src={image}
        onError={handleError}
      />
      <h2 align="center" className="movie-title">
        {props.movie.title}
      </h2>
      <p className="movie-info">
        {exist(props.movie.info.rating) && (
          <span className="rating">{props.movie.info.rating}/10</span>
        )}
        {exist(props.movie.info.running_time_secs) && (
          <span className="duration">
            {getVideoDuration(props.movie.info.running_time_secs)}
          </span>
        )}
      </p>
      <Button type="link" onClick={() => props.addFavorite(props.movie)}>
        <Tooltip
          title={props.favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <HeartOutlined
            className={props.favorite ? 'favorite-active' : 'favorite-disabled'}
            theme="filled"
          />
        </Tooltip>
      </Button>
      <Button type="link">
        <Popover
          content={showInfo(props.movie)}
          placement="top"
          title={props.movie.title}
        >
          <InfoCircleOutlined theme="filled" />
        </Popover>
      </Button>
      <Button type="link" onClick={() => props.onShare(props.movie)}>
        <ShareAltOutlined theme="filled" />
      </Button>
    </div>
  );
}

export default memo(Movie);
