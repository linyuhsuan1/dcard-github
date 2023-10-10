import { useState, useEffect } from 'react';
import {apiGetAllList} from '../api/index';

export interface FetchIssueHook {
	loading: boolean;
	issueData: any[];
	hasMore: boolean;
}

export default function useFetchIssue (lastId: string|null, search: string, page: number){
  const [issueData, setIssueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (lastId) {
          console.log('has lastId');
          const response = await apiGetAllList(search,page);
          console.log(response.data.items);
          // @ts-ignore
          setIssueData((prevData) => [...prevData, ...response.data.items]);
          setLoading(false);
          if (response.data.items.length === 0) {
            setHasMore(false);
          }
        } else {
          console.log('no lastId');
          const response = await apiGetAllList(search,1);
          console.log('get response',response)
          setIssueData(response.data.items);
          setLoading(false);
        }
      } catch (error) {
        console.log('get error',error);
        setLoading(false);
      }
    };
    fetchData();
  }, [lastId, search]);

  return { loading, issueData, hasMore };
};

