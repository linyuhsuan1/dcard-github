import { BrowserRouter as Router, Route } from 'react-router-dom';
import ListContainer from './component/ListContainer';
import ListDetail from './component/ListDetail';
function App() {
  return (
    <div>
      <Router>
        <Route exact path="/dcard-github" component={ListContainer} />
        <Route path="/dcard-github/list" component={ListDetail} />
      </Router>
    </div>
  );
}

export default App;
