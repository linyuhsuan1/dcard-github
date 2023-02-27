import { GITHUB_AUTH_URL } from './../constant/api';
import axios from 'axios';

const authReqest = axios.create({
  baseURL: GITHUB_AUTH_URL,
});


export const getAuth = (token:string,client_id:string,client_secret:string) => authReqest.get('', { params: { token: token, client_id:client_id,client_secret:client_secret } });
