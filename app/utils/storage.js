import data from './data/moviedata.json';
import { PAGE_SIZE } from './constants';

export const getMoviesStore = dataQuery => {
  if (dataQuery.search) {
    let results = data.filter(movie => {
      const title = movie.title.toLowerCase();
      const valueSearch = dataQuery.search.toLowerCase();
      return title.includes(valueSearch);
    });

    const rows = results.length;

    results = results.slice(0, dataQuery.page * PAGE_SIZE);

    return { results, rows };
  }
  const results = data.slice(0, dataQuery.page * PAGE_SIZE);
  const rows = data.length;
  return { results, rows };
};
