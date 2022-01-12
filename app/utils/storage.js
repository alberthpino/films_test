import { message } from 'antd';
import moment from 'moment';
import { PAGE_SIZE, FAVORITES_KEY } from './constants';
import { exist } from './functions';
import data from './data/moviedata.json';

export const getMoviesStore = dataQuery => {
  const { search, startDate, endDate } = dataQuery;

  const queryPromise = new Promise(resolve => {
    if (search) {
      let results = data.filter(movie => {
        const title = movie.title.toLowerCase();

        const genres = exist(movie.info.genres)
          ? movie.info.genres.join(', ').toLowerCase()
          : '';

        const valueSearch = search.toLowerCase();

        if (startDate && endDate) {
          return (
            (title.includes(valueSearch) || genres.includes(valueSearch)) &&
            (movie.info.release_date >= startDate &&
              movie.info.release_date <= endDate)
          );
        }

        return title.includes(valueSearch) || genres.includes(valueSearch);
      });

      const rows = results.length;
      results = results.slice(0, dataQuery.page * PAGE_SIZE);

      resolve({ results, rows });
    }

    if (startDate && endDate) {
      let results = data.filter(
        movie =>
          exist(movie.info.release_date) &&
          moment(movie.info.release_date) >= startDate &&
          moment(movie.info.release_date) <= endDate,
      );

      const rows = results.length;
      results = results.slice(0, dataQuery.page * PAGE_SIZE);
      resolve({ results, rows });
    }

    const results = data.slice(0, dataQuery.page * PAGE_SIZE);

    const rows = data.length;
    resolve({ results, rows });
  });

  return queryPromise
    .then(result => result)
    .catch(reason => {
      throw reason;
    });
};

export const addFavorite = favorite => {
  let favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];

  const isFavorite =
    favorites.filter(record => record.title === favorite.title).length > 0;
  if (isFavorite) {
    favorites = favorites.filter(record => record.title !== favorite.title);
    message.success('Removed from favorites');
  } else {
    favorites.push(favorite);
    message.success('Added to favorites');
  }

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
};

export const getFavoriteMovies = () => {
  const favorites = JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  return favorites.reverse();
};

export const getGenres = () => {
  const genres = data
    .map(movie =>
      exist(movie.info.genres) ? movie.info.genres.join(', ') : '',
    )
    .join(', ')
    .split(', ')
    .filter((item, index, array) => array.indexOf(item) === index)
    .sort();

  return genres;
};

export const getMoviesGenre = dataQuery => {
  const queryPromise = new Promise(resolve => {
    const { genre, search, page } = dataQuery;

    const movies = data.filter(movie => {
      if (search) {
        const title = movie.title.toLowerCase();
        return (
          exist(movie.info.genres) &&
          movie.info.genres
            .join(', ')
            .toLowerCase()
            .split(', ')
            .includes(genre.toLowerCase()) &&
          title.includes(search.toLowerCase())
        );
      }
      return (
        exist(movie.info.genres) &&
        movie.info.genres
          .join(', ')
          .toLowerCase()
          .split(', ')
          .includes(genre.toLowerCase())
      );
    });

    const rows = movies.length;
    const results = movies.slice(0, page * PAGE_SIZE);

    resolve({ results, rows });
  });

  return queryPromise.then(result => result);
};
