import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SearchInput from "../Input/SearchInput";
import SButton from "../Button/SButton";
import config from "../../constant/config";
// import { apiGetAuth } from "../../api/index";
import axios, { AxiosResponse } from "axios";
const ListContainer = () => {
  const history = useHistory();
  const [search, setSearch] = useState("");
  const [accessToken] = useState(localStorage.getItem("access_token"));
  const query = new URLSearchParams(window.location.search);
  const token = query.get("code");
  useEffect(() => {
    if (token && !accessToken) {
      getAccessToken(token);
    }
  }, [token, accessToken]);
  // 取得access token
  const getAccessToken = async (token: string) => {
    try {
      const result = await getUsers(
        token,
        config.CLIENT_ID,
        config.CLIENT_SECRET
      );
      console.log("aaaa", result);
      // if (result.data.access_token) {
      //   localStorage.setItem("access_token", result.data.access_token);
      //   setAccessToken(result.data.access_token);
      // }
    } catch (error) {
      console.log(error);
      throw new Error("Data not loaded!");
    }
  };
  type User = {
    access_token: string;
    scope: boolean;
    token_type: string;
  };

  async function getUsers(
    code: string,
    client_id: string,
    client_secret: string
  ): Promise<User[] | undefined> {
    try {
      const response: AxiosResponse<User[]> = await axios.get(
        "https://github.com/login/oauth/access_token",
        {
          params: {
            code: code,
            client_id: client_id,
            client_secret: client_secret,
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Data not loaded!");
    }
  }

  // 設定github api scope
  const scopes = ["user", "repo"];
  function loginGithub() {
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=1af846cd38b372da682e&scope=" +
        scopes
    );
  }

  //[點擊功能] 查詢 issues
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    history.push(`/dcard-github/${search}`);
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };
  return (
    <>
      <div className="flex justify-center items-center mt-10">
        https://github.com/jsx-eslint/eslint-plugin-react/tree/master/docs/rules/jsx-curly-spacing.md
        {localStorage.getItem("access_token") ? (
          <div className="w-1/2">
            <div className="flex items-center">
              <SearchInput onChange={handleChange} />
              <SButton handleClick={handleClick} />
            </div>
          </div>
        ) : (
          <button
            className="ml-2 rounded-lg bg-blue-dcard p-2 text-white hover:bg-blue-dcardBtn"
            onClick={loginGithub}
          >
            Login Github
          </button>
        )}
      </div>
    </>
  );
};

export default ListContainer;
