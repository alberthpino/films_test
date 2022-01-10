import moment from 'moment';
export const exist = value => {
  if (
    value !== undefined &&
    value !== null &&
    value !== 'undefined' &&
    value !== 'null'
  ) {
    return true;
  }
  return false;
};

export const evalFavorite = (movie, favorite) => {
  return favorite.filter(record => record.title == movie.title).length > 0;
};

export const getVideoDuration = seconds => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const seconds_ = Math.floor(seconds % 60);

  return `${hours > 0 ? hours + 'h ' : ''}${minutes > 0 ? minutes + 'm ' : ''}`;
};

export const formatDate = date => {
  return moment(date).format('DD/MM/YYYY');
};
