import axios from 'axios';
import { GITHUB_SEARCH_URL } from '../constant/api';

const listReqest = axios.create({
  baseURL: GITHUB_SEARCH_URL,
});

// 攔截 API request 的請求
listReqest.interceptors.request.use(
  (request) => {
    request.headers['Authorization'] = localStorage.getItem('access_token');
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 攔截 API response 的回傳
listReqest.interceptors.response.use(
  (response) => {
    if(response.data.hasOwnProperty('status')){
      if(response.data.status !=='200'){
        return Promise.reject(response.data);
      }
    }
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error.response.data);
  },
);

export const getAllList = (search: string, page: number) => listReqest.get('', { params: { user: search, page } });
