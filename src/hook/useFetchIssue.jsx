import { useState, useEffect } from 'react';
import axios from 'axios';
import{GITHUB_SEARCH_URL} from '../constant/api';

const useFetchIssue = (lastId) => {
  const [issueData, setIssueData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    console.log('qqqqq')
    setLoading(true);
    const fetchData = async () => {
      try {
        if (lastId) {
          console.log('has id')
          console.log('has lastId');
          const response = await axios.get(GITHUB_SEARCH_URL + "linyuhsuan" + '&page=' + 2);
          console.log(response.data.items);
          const filterItems = response.data.items.filter((item) => item.state !== 'closed');
          setIssueData((prevData) => [...prevData, ...filterItems]);
          setLoading(false);
          if (response.data.items.length === 0) {
            setHasMore(false);
          }
        } else {
          console.log('no lastId');
          const response = await axios.get(GITHUB_SEARCH_URL + "linyuhsuan" + '&page=' + 1);
          const filterItems = response.data.items.filter((item) => item.state !== 'closed');
          setIssueData(filterItems);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [lastId]);

  return { loading, issueData, hasMore };
};

export default useFetchIssue;
