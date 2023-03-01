import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './layout/NavBar/NavBar';
import PageRoute from './Router/PageRoute';
function App() {
  return (
    <div>
      <Router>
        <NavBar />
        <PageRoute/>
      </Router>
    </div>
  );
}

export default App;
