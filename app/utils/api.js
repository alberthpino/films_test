import axios from 'axios';
import { TYPE_FETCHING, CODE_FETCHING, BASE_URL } from './constants';

async function returnFuntionAsync(callback = null) {
  if (callback !== null) {
    try {
      return returnFunction(await callback());
    } catch (error) {
      return error;
    }
  }
  return null;
}

function returnFunction(callback, all = false) {
  if (all) {
    return callback
      .then(response => {
        if (response.status === CODE_FETCHING.error.Unauthorized) {
          return false;
        }
        return response;
      })
      .catch(error => {
        throw error;
      });
  }

  return callback
    .then(response => {
      if (response.status === CODE_FETCHING.error.Unauthorized) {
        return false;
      }
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

export const api = (
  url = '',
  method = TYPE_FETCHING.get,
  params = {},
  asyncr = false,
) => {
  const options = {
    method,
    url: `${BASE_URL}/${url}`,
    headers: {
      Accept: 'application/json',
    },
  };

  switch (method) {
    case TYPE_FETCHING.post:
      options.data = params;
      break;
    default:
      options.params = params;
  }

  if (asyncr) {
    return returnFuntionAsync(axios.request(options));
  }

  return returnFunction(axios.request(options));
};
