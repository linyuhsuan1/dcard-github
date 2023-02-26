import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchInput from '../Input/SearchInput';
import SButton from '../Button/SButton';
import axios from 'axios';
const ListContainer = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
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
  const handleClick = (event) => {
    history.push(`/dcard-github/${search}`);
    event.preventDefault();
  };

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <div className='py-10  flex items-center justify-center'>
        <div className='mx-40 '>
          <div className='mb-4'>
            <SearchInput onChange={handleChange} />
            <SButton handleClick={handleClick} />
          </div>
        </div>
      </div>
      <button onClick={loginGithub}>Login github</button>
    </>
  );
};

export default ListContainer;
