import TextEditor from './components/TextEditor'
import {
  BrowserRouter,
  Switch,
  Redirect,
  Route,
  BrowserRouter
} from 'react-router-dom';
import {v4 as uuid} from 'uuid';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to={`/documents/${uuid()}`}/>
        </Route>
        <Route path="/documents/:id" exact>
          <Redirect/>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
