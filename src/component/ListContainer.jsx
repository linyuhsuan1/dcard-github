import React, { useEffect, useState, useCallback, useRef } from 'react';
import SearchInput from './SearchInput';
import SButton from './SButton';
import List from './List';
import axios from 'axios';
import { FixedSizeList } from 'react-window';
import { GITHUB_SEARCH_URL } from '../constant/api';
const ListContainer = () => {
  const [issueData, setIssueData] = useState([]);
  const [search, setSearch] = useState('');
  const [lastId, setLastId] = useState(null);
  const observer = useRef(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('useEffect');
    const query = new URLSearchParams(window.location.search);
    const token = query.get('code');
    if (token && localStorage.getItem('accessToken') === null) {
      axios.get('http://localhost:3001/getAccessToken?code=' + token).then((result) => {
        if (result.data.access_token) {
          localStorage.setItem('access_token', result.data.access_token);
        }
      });
    }
  }, []);
  // 設定github api scope
  const scopes = ['user', 'repo'];
  function loginGithub() {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=1af846cd38b372da682e&scope=' + scopes,
    );
  }
  //[點擊功能] 查詢 issues
  const handleClick = useCallback(() => {
    event.preventDefault();
    setPage(1);
    setLastId(null);
    setIssueData([]);
    getIssueData(1);
  }, [search, issueData, lastId, page]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  useEffect(() => {
    if (lastId && page) {
      console.log('useEffect lastId');
      getIssueData(page);
    }
  }, [lastId, page]);

  const getIssueData = useCallback(
    async (page) => {
      console.log('issue page', page);
      console.log('has lastID before api', lastId);
      setLoading(true);
      try {
        if (lastId) {
          console.log('has lastId');
          const response = await axios.get(GITHUB_SEARCH_URL + search + '&page=' + page);
          console.log(response.data.items);
          const filterItems = response.data.items.filter((item) => item.state !== 'closed');
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
      }
    },
    [lastId, search, loading],
  );
  const lastIssueRef = useCallback(
    (node1) => {
      if (loading) {
        return;
      }
      console.log('get node', node1);
      if (observer.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver(([entries]) => {
        if (entries.isIntersecting && hasMore && !loading) {
          console.log('isIntersecting true');
          setLastId(node1.dataset.id);
          setPage(page + 1);
        }
      });
      if (node1) observer.current.observe(node1);
    },
    [hasMore, loading],
  );

  return (
    <>
      <div className='py-10'>
        <div className='mx-40 '>
          <div className='mb-4 flex items-center justify-center'>
            <SearchInput onChange={handleChange} />
            <SButton handleClick={handleClick} />
          </div>
          <div className='relative left-[21%]'>
            <FixedSizeList
              height={window.innerHeight}
              width={650}
              itemCount={issueData.length}
              itemSize={120}
              itemData={issueData}
            >
              {({ index, style }) => {
                if (issueData.length === index + 1) {
                  return (
                    <div style={style} ref={lastIssueRef} data-id={issueData[index].id}>
                      <List
                        key={index}
                        issueTitle={issueData[index].title}
                        issueUrl={issueData[index].repository_url}
                        issueNumber={issueData[index].number}
                        issueBody={issueData[index].body}
                        issueLabel={issueData[index].labels}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div style={style}>
                      <List
                        key={index}
                        issueTitle={issueData[index].title}
                        issueBody={issueData[index].body}
                        issueNumber={issueData[index].number}
                        issueUrl={issueData[index].repository_url}
                        issueLabel={issueData[index].labels}
                      />
                    </div>
                  );
                }
              }}
            </FixedSizeList>
          </div>
        </div>
      </div>
      <button onClick={loginGithub}>Login github</button>
    </>
  );
};

export default ListContainer;
