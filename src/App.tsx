import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom'
import { createStore } from 'redux'
import rootReducer from './reducers'
import './App.css'
import Home from './Home'
import Apps from './Apps'
import Docs from './Docs'
import Login from './Login'
import { Provider } from 'react-redux';

export const createReduxStore = () => createStore(rootReducer)

class App extends React.Component {
  render() {
    return (
      <Provider store={createReduxStore()}>
        <Router>
          <div>
            <h1>React Auth Test</h1>
            <nav>
              <ul>
                <li><NavLink to="/" exact={true}>Home</NavLink></li>
                <li><NavLink to="/apps">Apps</NavLink></li>
                <li><NavLink to="/docs">Docs</NavLink></li>
              </ul>
            </nav>
            <div>
              <Route path="/" exact={true} component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/apps" component={Apps} />
              <Route path="/docs" component={Docs} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
