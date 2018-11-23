import React, {Component} from 'react';
import {Button, Col, Row} from 'antd';
import "./UserComponent.css";
import {addUser, deleteUser, getAllUsers} from "../../service/UserService";
import {WrappedUserModalForm} from "./UserModalForm";
import {userNotification} from "../../notification/UserNotification";
import UserTable from "./UserTable";

class UserComponent extends Component {

  state = {
    tableLoading: true,
    tableData: [],
    modalVisibility: false,
  };

  componentWillMount() {
    getAllUsers().then(response => {
      if (response) {
        response.forEach(val => this.add(val));
      }
      this.setState({
        tableLoading: false,
      })
    });
  }

  add = (val) => {
    const tableData = this.state.tableData;
    tableData.push({
      key: val.id,
      username: val.username,
      email: val.email,
      role: val.role ? val.role : 'admin',
    });
    this.setState({
      tableData: tableData,
    });
  };

  submitModal = () => {
    const form = this.modalRef.props.form;
    form.validateFields((err, values) => {
      if (!err) {
        const user = {
          "user": values
        };
        addUser(user).then(response => {
          if (response) {
            form.resetFields();
            this.setState({modalVisibility: false});
            userNotification('success');
            this.add(values);
          }
        }).catch(err => {
          console.log(err);
          userNotification('wrong');
        })
      } else {
        console.log(err);
        userNotification('form');
      }
    });
  };

  handleDelete = (userId) => {
    deleteUser(userId).then(response => {
      if (response) {
        userNotification("delete");
        const tableData = [...this.state.tableData];
        this.setState({
          tableData: tableData.filter(item => item.key !== userId)
        });
      }
    })
  };

  saveRefModal = (modalRef) => {
    this.modalRef = modalRef;
  };

  openModal = () => {
    this.setState({modalVisibility: true});
  };

  closeModal = () => {
    this.setState({modalVisibility: false});
  };

  render() {

    return (
        <div>
          <Row type="flex" justify="center" align="top" style={{width: '100%'}}>
            <Col span={18}>
              <UserTable
                tableData={this.state.tableData}
                tableLoading={this.state.tableLoading}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" align="top" style={{width: '100%'}}>
            <Col span={18}>
              <Button type={"primary"} onClick={this.openModal}>Add user</Button>
              <WrappedUserModalForm
                  wrappedComponentRef={this.saveRefModal}
                  visible={this.state.modalVisibility}
                  submitModal={this.submitModal}
                  closeModal={this.closeModal}
              />
            </Col>
          </Row>
        </div>
    );
  }
}

export default UserComponent;