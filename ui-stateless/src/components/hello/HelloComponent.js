import React, {Component} from 'react';
import {AuthContext} from "../../App";

class HelloComponent extends Component {

  handleLogout = () => {
    this.props.handleLogout();
  };

  render() {
    return (
        <div>
          <h1>Hello {this.props.userName}</h1>
          <AuthContext.Consumer>
            {auth => <div>authContext : {auth}</div>}
          </AuthContext.Consumer>
        </div>
    );
  }

}

export default HelloComponent;