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
