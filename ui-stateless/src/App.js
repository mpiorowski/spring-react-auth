import React, {Component} from 'react';
import './App.css';
import LoginComponent from './components/LoginComponent';
import {serviceGetUser} from "./service/AuthService";
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import HelloComponent from "./components/HelloComponent";
import {ACCESS_TOKEN} from "./config/config";
import {Icon, Spin} from "antd";
import Test from "./components/Test";

export const AuthContext = React.createContext('tak');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      loading: true,
      jwtToken: null,
      isAuth: false,
      test: 'test'
    };

  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    serviceGetUser()
        .then(response => {
          if (response.name) {
            this.setState({
              currentUser: response.name,
              loading: false,
              isAuth: true,
            });

            this.props.history.push("/hello");
          }
        })
        .catch(error => {
          this.setState({
            loading: false,
          });
          console.log(error);
        });
  };

  handleLogout = () => {
    this.setState({
      currentUser: null,
      isAuth: false,
    });
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.history.push("/");
  };


  render() {

    const PrivateRoute = ({component: Component, ...rest}) => (
        <Route {...rest} render={(props) => (
            this.state.isAuth === true
                ? <Component {...rest} {...props}/>
                : <Redirect to={{
                  pathname: '/login',
                  state: {from: props.location}
                }}/>
        )}/>
    );

    const antIcon = <Icon type="loading-3-quarters" style={{fontSize: 30}} spin/>;

    if (this.state.loading) {
      return (
          <div className="App">
            <header className="App-header">
              <Spin indicator={antIcon} style={{display: 'block', textAlign: 'center', marginTop: 30}}/>
            </header>
          </div>
      )
    } else {
      return (
          <div className="App">
            <AuthContext.Provider value={this.state.test}>
              <Switch>
                <Route exact path="/login"
                       render={(props) => <LoginComponent
                           handleSubmit={this.handleSubmit}
                           checkAuth={this.checkAuth}
                       />}/>

                <PrivateRoute path='/hello'
                              component={HelloComponent}
                              handleLogout={this.handleLogout}
                              userName={this.state.currentUser}/>

                <PrivateRoute path='/test'
                              component={Test}
                              handleLogout={this.handleLogout}
                              userName={this.state.currentUser}/>

                <Route path='*' render={(props) => <Redirect to={'/login'}/>}/>
              </Switch>
            </AuthContext.Provider>
          </div>
      );
    }
  }
}

export default withRouter(App);