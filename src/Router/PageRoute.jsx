import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ListContainer from '../component/List/ListContainer';
// import ListDetail from '../component/List/ListDetail';

const PageRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route  path='/dcard-github' component={ListContainer} />
        {/* <Route exact path='/dcard-github/list' component={ListDetail} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default PageRoute;
