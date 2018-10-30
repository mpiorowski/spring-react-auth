import React, {Component} from 'react';
import {Col, Row, Table} from 'antd';
import "./UserComponent.css";
import {getAllUsers} from "../../service/UserService";

let uuid = 0;
let keys = [];

class UserComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tableLoading: true,
      tableData: [],
    }
  }

  componentWillMount() {
    getAllUsers().then(response => {
      if (response) {
        this.add(response);
      }
    });
  }

  add = (val) => {
    const tableData = val.map(val => {
      return {username: val.username, password: val.password};
    });
    this.setState({
      tableData: tableData,
      tableLoading: false,
    })

  };


  render() {

    const dataSource = [{
      key: '1',
      name: 'Mike',
      password: 32,
    }];

    console.log(dataSource);

    const columns = [{
      title: 'Username',
      dataIndex: 'username',
    }, {
      title: 'Password',
      dataIndex: 'password',
    }];

    function onChange() {
      console.log('dziala');
      // console.log('params', pagination, filters, sorter);
    }

    return (
        <Row type="flex" justify="center" align="top" style={{width: '100%'}}>
          <Col span={18}>
            <Table
                columns={columns}
                dataSource={this.state.tableData}
                onChange={onChange}
                loading={this.state.tableLoading}
                className={"userTable"}
                size="middle"
                pagination={{ pageSize: 2 }}
            />
          </Col>
        </Row>
    );
  }
}

export default UserComponent;