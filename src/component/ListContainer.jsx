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
  const [loading, setLoading] = useState(false);
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
          setLoading(true);
          setPage(page + 1);
        }
      });
      if (node1) observer.current.observe(node1);
    },
    [hasMore, loading]
  );

  return (
    <>
      <div className='py-10'>
        <div className='mx-40 '>
          <div className='mb-4 flex items-center justify-center'>
            <SearchInput onChange={handleChange} />
            <SButton handleClick={handleClick} />
          </div>
          <div className='flex justify-center align-middle'>
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
          {
            loading? 
            <div className='flex justify-center'>
                <svg  className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
             :null
          }
        </div>
      </div>
      <button onClick={loginGithub}>Login github</button>
    </>
  );
};

export default ListContainer;
