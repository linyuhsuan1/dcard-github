import { getAllList } from './list';
import { getRepoDetail,updateRepoDetail } from './repo';
import { getAuth } from './auth';

export const apiGetAuth = getAuth;
export const apiGetAllList = getAllList;
export const apiGetRepoDetail = getRepoDetail;
export const apiUpdateRepoDetail = updateRepoDetail;

