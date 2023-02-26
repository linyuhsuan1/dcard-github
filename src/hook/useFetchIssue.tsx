import { useState, useEffect } from 'react';
import { GITHUB_SEARCH_URL } from '../constant/api';
import axios from 'axios';

export interface FetchIssueHook {
	loading: boolean;
	issueData: any[];
	hasMore: boolean;
}

export default function useFetchIssue (lastId, search, page){
  const [issueData, setIssueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        if (lastId) {
          console.log('has lastId');
          const response = await axios.get(GITHUB_SEARCH_URL + search + '&page=' + page);
          console.log(response.data.items);
          const filterItems = response.data.items.filter((item) => item.state !== 'closed');
          // @ts-ignore
          setIssueData((prevData) => [...prevData, ...filterItems]);
          setLoading(false);
          if (response.data.items.length === 0) {
            setHasMore(false);
          }
        } else {
          console.log('no lastId');
          const response = await axios.get(GITHUB_SEARCH_URL + search + '&page=' + 1);
          const filterItems = response.data.items.filter((item) => item.state !== 'closed');
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

