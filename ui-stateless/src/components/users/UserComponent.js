import React, {Component} from 'react';
import {Col, Row, Table} from 'antd';
import "./UserComponent.css";

class UserComponent extends Component {


  componentWillMount() {

  }


  render() {

    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'age',
      dataIndex: 'age',
    }];

    const data = [{
      key: '1',
      name: 'mat',
      age: '22'
    }];

    function onChange() {
      console.log('dziala');
      // console.log('params', pagination, filters, sorter);
    }

    return (
        <Row type="flex" justify="center" align="top" style={{width: '100%'}}>
          <Col span={18}>
            <Table columns={columns} dataSource={data} onChange={onChange} className={"userTable"} size="middle"/>
          </Col>
        </Row>
    );
  }
}

export default UserComponent;