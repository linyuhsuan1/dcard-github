import { Route, Switch } from 'react-router-dom';
import ListContainer from '../component/List/ListContainer';
import ListDetail from '../component/List/ListDetail';
import ListWrapper from '../component/List/ListWrapper';

const PageRoute = () => {
  return (
    <Switch>
      <Route exact path='/dcard-github/' component={ListContainer} />
      <Route exact path='/dcard-github/:search' component={ListWrapper} />
      <Route path='/dcard-github/:search/:repo/:number' component={ListDetail} />
    </Switch>
  );
};

export default PageRoute;
