import React, {Component} from 'react';
import './App.css';
import LoginComponent from './components/login/LoginComponent';
import {serviceGetUser} from "./service/AuthService";
import {Switch, Redirect, Route, withRouter} from "react-router-dom";
import HelloComponent from "./components/hello/HelloComponent";
import {ACCESS_TOKEN} from "./config/config";
import {Icon, Layout, Spin} from "antd";
import {authNotification} from "./notification/AuthNotification";
import AppHeader from "./AppHeader";
import {WrappedProductComponent} from "./components/products/ProductComponent";
import UserComponent from "./components/users/UserComponent";

const {Content} = Layout;

export const AuthContext = React.createContext('tak');

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      currentUser: null,
      jwtToken: null,
      isAuth: false,
      test: 'test'
    };

  }

  componentWillMount() {
    this.checkAuth();
  }

  checkAuth = () => {
    this.setState({
      loading: true,
    });
    serviceGetUser()
        .then(response => {
          if (response.name) {
            this.setState({
              currentUser: response.name,
              isAuth: true,
              loading: false
            });
            if (this.props.location.pathname === '/login') {
              this.props.history.push('/hello');
            }
          }
        })
        .catch(error => {
          if (this.props.location.pathname !== '/login' && this.props.location.pathname !== '/') {
            authNotification('unauthorized');
          }
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
        <div className={'app-content'}>
          <Route {...rest} render={(props) => (
              this.state.isAuth === true
                  ? <Component {...rest} {...props}/>
                  : <Redirect to={{
                    pathname: '/login',
                    state: {from: props.location}
                  }}/>
          )}/>
        </div>
    );

    const antIcon = <Icon type="loading-3-quarters" style={{fontSize: 30}} spin/>;

    if (this.state.loading) {
      return (
          <div className="app-main">
            <header>
              <Spin indicator={antIcon} style={{display: 'block', textAlign: 'center', marginTop: 30}}/>
            </header>
          </div>
      )
    }
    return (
        <div>
          <Layout>
            <AppHeader handleLogout={this.handleLogout} isAuth={this.state.isAuth}
                       active={this.props.location.pathname}/>
            <Content>
              <Switch>
                <Route exact path="/login"
                       render={(props) => <LoginComponent
                           {...props}
                           checkAuth={this.checkAuth}
                       />}/>

                <PrivateRoute path='/hello'
                              component={HelloComponent}
                              user={this.state.currentUser}/>

                <PrivateRoute path='/products'
                              component={WrappedProductComponent}
                              user={this.state.currentUser}
                />

                <PrivateRoute path='/users'
                              component={UserComponent}
                              user={this.state.currentUser}
                />

                <Route path='*' render={(props) => <Redirect to={'/login'}/>}/>
              </Switch>
            </Content>
          </Layout>
        </div>
    );
  }
}

export default withRouter(App);
