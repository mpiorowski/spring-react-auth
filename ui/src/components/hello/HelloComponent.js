import React, {Component} from 'react';
import {AuthContext} from "../../App";
import {Col, Row} from "antd";
import './HelloComponent.css';

class HelloComponent extends Component {

  handleLogout = () => {
    this.props.handleLogout();
  };

  render() {
    return (
        <div>
          <Row type="flex" justify="center" align="top">
            <Col span={24} style={{textAlign:'center'}}>
              <h2>Hello {this.props.user}</h2>
              <AuthContext.Consumer>
                {auth => <div>authContext : {auth}</div>}
              </AuthContext.Consumer>
            </Col>
          </Row>

        </div>
    );
  }

}

export default HelloComponent;