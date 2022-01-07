export const BASE_URL = 'http://localhost';

export const RESTART_ON_REMOUNT = '@@saga-injector/restart-on-remount';
export const DAEMON = '@@saga-injector/daemon';
export const ONCE_TILL_UNMOUNT = '@@saga-injector/once-till-unmount';

export const TYPE_FETCHING = {
  post: 'POST',
  get: 'GET',
  put: 'PUT',
  delete: 'DELETE',
};

export const CODE_FETCHING = {
  success: {
    ok: 200,
    created: 201,
    accepted: 202,
  },
  error: {
    unknownUrl: 404,
    denieded: 429,
    Unauthorized: 401,
  },
};

export const PAGE_SIZE = 16;
