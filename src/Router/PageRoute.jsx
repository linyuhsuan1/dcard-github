import React from 'react';
import { BrowserRouter as  Routes, Route } from 'react-router-dom';
import ListContainer from '../component/ListContainer';
import List from '../component/List';


const PageRoute = () => {
  return (

      <Routes>
        <Route path="/" element={<ListContainer />} />
        <Route path="/list" element={<List />} />
        <Route path="*" element={<ListContainer />} />
      </Routes>

  );
}

export default PageRoute;
