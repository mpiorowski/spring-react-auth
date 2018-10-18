import React, {Component} from 'react';
import './App.css';
import FormComponent from './components/FormComponent';
import {getCurrentUser} from "./service/AuthService";
import {Route, Switch, withRouter} from "react-router-dom";
import HelloComponent from "./components/HelloComponent";

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
      loading: false,
    }
  }

  componentWillMount() {
    this.handleCurrentUser();
  }

  handleCurrentUser() {
    this.setState({
      loading: true,
    });

    getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
          })
        })
        .catch(error => {
          this.setState({
            loading: false,
          });
          console.log(error);
        });
  }

  handleSubmit = () => {
    console.log('dziala');
  };

  render() {
    return (
        <div className="App">
          <header className="App-header">

            <Switch>
              <Route exact path="/"
                     render={(props) => <FormComponent handleSubmit={this.handleSubmit}/>}>
              </Route>
              <Route exact path="/hello"
                     render={(props) => <HelloComponent/>}>
              </Route>
            </Switch>


          </header>
        </div>
    );
  }
}

export default withRouter(App);
