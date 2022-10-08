import React, {Component} from 'react';
import {Layout, Menu} from "antd";
import {Link} from "react-router-dom";
import {PROFILE} from "./config/config";

const {Header} = Layout;

class AppHeader extends Component {

  render() {
    if (this.props.isAuth) {
      return (
          <div>
            <Header className={'Header'} style={{height: '10%', lineHeight: '5vh'}}>
              <Menu
                  theme="dark"
                  mode="horizontal"
                  selectedKeys={[this.props.active.substr(1)]}
                  style={{lineHeight: '5vh'}}
              >
                <Menu.Item key="hello" className={'menu'}><Link to="/hello">hello</Link></Menu.Item>
                <Menu.Item key="products" className={'menu'}><Link to="/products">products</Link></Menu.Item>
                <Menu.Item key="users" className={'menu'}><Link to="/users">users</Link></Menu.Item>
                <Menu.Item style={{float: 'right'}} key="logout" onClick={this.props.handleLogout}
                           className={'menu'}>LOGOUT</Menu.Item>
                {PROFILE === 'dev' ?
                    <Menu.Item style={{float: 'right'}} key="swagger" className={'menu'}><a
                        href="http://localhost:9000/swagger-ui.html" target={"_blank"}>swagger</a></Menu.Item>
                    : ''
                }

              </Menu>
              <Menu
                  theme="dark"
                  mode="horizontal"
                  selectedKeys={[this.props.active.substr(1)]}
                  style={{lineHeight: '5vh'}}
              >
              </Menu>
            </Header>
          </div>
      );
    } else {
      return '';
    }
  }
}

AppHeader.propTypes = {};

export default AppHeader;
