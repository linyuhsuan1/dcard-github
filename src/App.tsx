import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './component/NavBar/NavBar';
import ListContainer from './component/List/ListContainer';
import ListDetail from './component/List/ListDetail';
import ListWrapper from './component/List/ListWrapper';
function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <Route exact path='/dcard-github/' component={ListContainer} />
        <Route exact path='/dcard-github/:search' component={ListWrapper} />
        <Route path='/dcard-github/:search/:repo/:number' component={ListDetail} />
      </Router>
    </div>
  );
}

export default App;
