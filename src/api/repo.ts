import axios from 'axios';
import { GITHUB_REPO_ISSUE_URL } from '../constant/api';

const repoReqest = axios.create({
  baseURL: GITHUB_REPO_ISSUE_URL,
});

// 攔截 API request 的請求
repoReqest.interceptors.request.use(
  (request) => {
    request.headers['Authorization'] = localStorage.getItem('access_token');
    return request;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// 攔截 API response 的回傳
repoReqest.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    return Promise.reject(error.response.data);
  },
);

export const getRepoDetail = (search:string, repo:string, number:string) =>
  repoReqest.get('', { params: { owner: search, repo, number } });
export const updateRepoDetail = (search:string, repo:string, number:string, closeData:string) =>
  repoReqest.patch('', {
    query: {
      owner: search,
      repo,
      number,
    },
    data: closeData,
  });
