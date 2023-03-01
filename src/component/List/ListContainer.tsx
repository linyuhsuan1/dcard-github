import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SearchInput from '../Input/SearchInput';
import SButton from '../Button/SButton';
import config from '../../constant/config';
import { apiGetAuth } from '../../api/index';
const ListContainer = () => {
  const history = useHistory();
  const [search, setSearch] = useState('');
  const query = new URLSearchParams(window.location.search);
  const token = query.get('code');
  useEffect(() => {
    if(token && localStorage.getItem('accessToken') === null){
      getAccessToken(token);
    }
    
  }, [token]);
  const getAccessToken = async (token:string) => { 
    try{
      const result = await apiGetAuth(token,config.CLIENT_ID,config.CLIENT_SECRET);
      if(result.data.access_token){
        localStorage.setItem('access_token', result.data.access_token);
      }
    }catch(error){
      console.log(error);
    }
  };
  //[點擊功能] 查詢 issues
  const handleClick = (event:React.MouseEvent<HTMLButtonElement>) => {
    history.push(`/dcard-github/${search}`);
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  // 設定github api scope
  const scopes = ['user', 'repo'];
  function loginGithub() {
    window.location.assign(
      'https://github.com/login/oauth/authorize?client_id=1af846cd38b372da682e&scope=' + scopes,
    );
  }
  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <div className="w-1/2">
          <div className="flex items-center">
            <SearchInput onChange={handleChange} />
            <SButton handleClick={handleClick} />
          </div>
        </div>
      </div>
      <button onClick={loginGithub}>Login github accesstoken</button>
    </>
  );
};

export default ListContainer;
