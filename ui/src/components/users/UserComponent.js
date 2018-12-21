import React, {Component} from 'react';
import {Button, Col, Row} from 'antd';
import "./UserComponent.css";
import {addUser, deleteUser, getAllUsers, updateUser} from "../../service/UserService";
import {WrappedUserModalForm} from "./UserModalForm";
import {userNotification} from "../../notification/UserNotification";
import UserTable from "./UserTable";

class UserComponent extends Component {

  state = {
    tableLoading: true,
    tableData: [],
    modalVisibility: false,
    editingKey: null,
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

  add = (val, key = null) => {
    const tableData = this.state.tableData;
    tableData.push({
      key: key === null ? val.userId : key,
      userName: val.userName,
      userEmail: val.userEmail,
      userRole: val.userRole ? val.userRole : 'admin',
    });
    this.setState({
      tableData: tableData,
    });
  };

  submitModal = () => {
    const form = this.modalRef.props.form;
    form.validateFields((error, values) => {
      if (!error) {
        addUser(values).then(response => {
          if (response) {
            form.resetFields();
            this.setState({modalVisibility: false});
            userNotification('success');
            this.add(values, response);
          }
        }).catch(error => {
          console.log(error);
          if (error.status === 400) {
            for (let val of error.errors) {
              if (val.code === "UniqueUsername") {
                userNotification('user');
                return;
              }
            }
            userNotification('form');
          } else {
            userNotification("connect");
          }

        })
      } else {
        console.log(error);
        userNotification('form');
      }
    });
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


  submitEdit = (form, key) => {
    form.validateFields((error, row) => {
      if (error) {
        userNotification("form");
        return;
      }
      const newData = [...this.state.tableData];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({tableData: newData});
      } else {
        newData.push(row);
        this.setState({tableData: newData});
      }

      const user = {userId: key, ...row};

      updateUser(user).then(response => {
        if (response) {
          userNotification("updated");
          this.cancelEdit();
        }
      }).catch(err => {
        console.log(err);
        userNotification("connect");
      });

    });
  };

  cancelEdit = () => {
    this.setState({
      editingKey: null,
    })
  };

  edit = (key) => {
    this.setState({
      editingKey: key,
    })
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

  render() {

    return (
        <div>
          <Row type="flex" justify="center" align="top" style={{width: '100%'}}>
            <Col span={18}>
              <UserTable
                  tableData={this.state.tableData}
                  tableLoading={this.state.tableLoading}
                  editingKey={this.state.editingKey}
                  submitEdit={this.submitEdit}
                  cancelEdit={this.cancelEdit}
                  edit={this.edit}
                  handleDelete={this.handleDelete}
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