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
          const filterItems = response.data.items.filter((item: { state: string; }) => item.state !== 'closed');
          // @ts-ignore
          setIssueData((prevData) => [...prevData, ...filterItems]);
          setLoading(false);
          if (response.data.items.length === 0) {
            setHasMore(false);
          }
        } else {
          console.log('no lastId');
          console.log('get first',search)
          const response = await apiGetAllList(search,1);
          const filterItems = response.data.items.filter((item: { state: string; }) => item.state !== 'closed');
          setIssueData(filterItems);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, [lastId, search]);

  return { loading, issueData, hasMore };
};

