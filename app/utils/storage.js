import { CODE_FETCHING } from './constants';

export const KEY_ID_USER = 'id_user';
export const KEY_PK_USER = 'pk_user';
export const KEY_TOKEN = 'token';
export const KEY_EMAIL = 'email';
export const KEY_NAME_USER = 'name_user';
export const KEY_PHOTO_USER = 'photo_user';
export const KEY_ZONES_USER = 'zones_user';
export const ROLE = '';
export const ASSOCIATION = '1';
export const DATE_START = '2000-01-01';
export const setItem = (key, value) => {
  localStorage.setItem(key, value);
};

export const clearStorage = () => {
  localStorage.clear();
  //window.location.href = '/';
};

export const getItem = key => localStorage.getItem(key);

export const LOCAL_ID_USER = getItem(KEY_ID_USER); // ID_COMPANY_HAS_USER
export const LOCAL_PK_USER = getItem(KEY_PK_USER);
export const LOCAL_TOKEN = getItem(KEY_TOKEN);
export const LOCAL_NAME_USER = getItem(KEY_NAME_USER);
export const LOCAL_KEY_EMAIL = getItem(KEY_EMAIL);
export const LOCAL_KEY_PHOTO_USER = getItem(KEY_PHOTO_USER);
export const LOCAL_KEY_ZONES_USER = getItem(KEY_ZONES_USER);

export const LOCAL_STORAGE = {
  token: LOCAL_TOKEN,
};

export const validateSession = () => {
  if (LOCAL_TOKEN) {
    return true;
  }

  return false;
};

export const removeSession = code => {
  if (code === CODE_FETCHING.error.Unauthorized) {
    clearStorage();
  }
};
