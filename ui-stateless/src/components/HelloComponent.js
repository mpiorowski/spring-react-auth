import React, {Component} from 'react';

class HelloComponent extends Component {

  handleLogout = () => {
    this.props.handleLogout();
  };

  render() {
    return (
        <div>
          <h1>HELLO {this.props.userName}</h1>
          <a onClick={this.handleLogout}>wyloguj</a>
        </div>
    );
  }

}

export default HelloComponent;