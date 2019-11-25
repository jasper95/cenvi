import { toggleSingleUploading } from 'shared/redux/app/reducer';
import axios from './axios';
import store from '../redux/store';

export default async function uploadService(file, params = {}, url = '/file/upload/simple') {
  const formData = new FormData();
  Object.entries(params)
    .forEach(([key, val]) => formData.append(key, val));

  store.dispatch(toggleSingleUploading());
  formData.append('file', file);

  return axios({
    data: formData,
    url,
    method: 'POST',
  }).finally(() => {
    store.dispatch(toggleSingleUploading());
  });
}
