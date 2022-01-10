import { api } from './api';
import { TYPE_FETCHING } from './constants';

export const apiSendMessage = data =>
  api('drones/sendmail', TYPE_FETCHING.post, data);
