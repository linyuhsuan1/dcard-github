import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchInput from '../Input/SearchInput';
import SButton from '../Button/SButton';
import config from '../../constant/config';
import { apiGetAuth } from '../../api/index';
const ListContainer = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const [accessToken, setAccessToken] = useState(localStorage.getItem('access_token'));
  const query = new URLSearchParams(window.location.search);
  const token = query.get('code');
  useEffect(() => {
    if (token && !accessToken) {
      getAccessToken(token);
    }
  }, [token, accessToken]);
  // 取得access token
  const getAccessToken = async (token:string) => { 
    try{
      const result = await apiGetAuth(token,config.CLIENT_ID,config.CLIENT_SECRET);
      if(result.data.access_token){
        localStorage.setItem('access_token', result.data.access_token);
        setAccessToken(result.data.access_token);
      }
    }catch(error){
      console.log(error);
    }
  };

  // 設定github api scope
  const scopes = ['user', 'repo'];
  function loginGithub() {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=1af846cd38b372da682e&scope=' + scopes,
    );
  }

  //[點擊功能] 查詢 issues
  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    history.push(`/dcard-github/${search}`);
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
   
      <div className="flex justify-center items-center mt-10">
      {
      localStorage.getItem('access_token') ? 
        <div className="w-1/2">
          <div className="flex items-center">
            <SearchInput onChange={handleChange} />
            <SButton handleClick={handleClick} />
          </div>
        </div>
        :<button className='ml-2 rounded-lg bg-blue-dcard p-2 text-white hover:bg-blue-dcardBtn' onClick={loginGithub}>Login Github</button>
      }
      </div>
    </>
  );
};

export default ListContainer;
