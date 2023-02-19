import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchIssue = (search, page) => {
  const [issueData, setIssueData] = useState([]);

  useEffect(() => {
    const getIssueData = async () => {
      console.log('issue page', page);
      try {
        const response = await axios.get(
          `http://localhost:3001/search?user=${search}&page=${page}`
        );
        console.log(response.data.items);
        setIssueData(response.data.items);
      } catch (error) {
        console.log(error);
      }
    };
    getIssueData();
  }, [search, page]);

  return issueData;
};

export default useFetchIssue;
