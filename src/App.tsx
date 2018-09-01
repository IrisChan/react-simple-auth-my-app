import * as React from 'react'
import { returntypeof } from 'react-redux-typescript'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
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
import Profile from './Profile'
// import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'
import { State } from './types'
import './App.css'

export const createReduxStore = () => createStore(rootReducer)

const userIsAuthenticated = connectedRouterRedirect<any, State>({
  redirectPath: '/login',
  authenticatedSelector: state => state.user.isLoggedIn,
  wrapperDisplayName: 'userIsAuthenticated'
})

// const locationHelper = locationHelperBuilder({})
// const userIsNotAuthenticated = connectedRouterRedirect<{}, State>({
//   // redirectPath: (state, ownProps) => locationHelper.getRedirectQueryParam(ownProps) || '/apps',
//   redirectPath: '/apps',
//   allowRedirectBack: false,
//   authenticatedSelector: state => state.user.isLoggedIn,
//   wrapperDisplayName: 'userIsNotAuthenticated'
// })

const ProtectedHome = userIsAuthenticated(Home)
// const ProtectedLogin = userIsNotAuthenticated(Login)
const ProtectedApps = userIsAuthenticated(Apps)
const ProtectedDocs = userIsAuthenticated(Docs)
const ProtectedProfile = userIsAuthenticated(Profile)

class Component extends React.Component<Props, {}> {
  render() {
    return (
        <Router>
          <div>
            <h1>React Auth Test</h1>
            <nav>
              <ul>
                <li><NavLink to="/" exact={true}>Home</NavLink></li>
                <li><NavLink to="/apps">Apps</NavLink></li>
                <li><NavLink to="/docs">Docs</NavLink></li>
                {this.props.user.isLoggedIn && <li><NavLink to="/profile">Profile</NavLink></li>}
              </ul>
            </nav>
            <div>
              <Route path="/" exact={true} component={ProtectedHome} />
              <Route path="/login" component={Login} />
              <Route path="/apps" component={ProtectedApps} />
              <Route path="/docs" component={ProtectedDocs} />
              <Route path="/profile" component={ProtectedProfile} />
            </div>
          </div>
        </Router>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({
  }, dispatch)
}

const mapStateToProps = (state: State) => {
  return {
    user: state.user
  }
}

const stateProps = returntypeof(mapStateToProps);
const dispatchProps = returntypeof(mapDispatchToProps);
type Props = typeof stateProps & typeof dispatchProps;

export default connect<typeof stateProps, typeof dispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Component);