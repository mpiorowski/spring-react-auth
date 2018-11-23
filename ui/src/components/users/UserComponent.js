import React, {Component} from 'react';
import {Button, Col, Popconfirm, Row, Table} from 'antd';
import "./UserComponent.css";
import {addUser, deleteUser, getAllUsers} from "../../service/UserService";
import {WrappedUserModalForm} from "./UserModalForm";
import {userNotification} from "../../notification/UserNotification";
import {EditableContext} from "./UserEditableCell";

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


  openModal = () => {
    this.setState({modalVisibility: true});
  };

  closeModal = () => {
    this.setState({modalVisibility: false});
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

  saveRefModal = (modalRef) => {
    this.modalRef = modalRef;
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

  edit = (key) => {
    this.setState({
      editingKey: key,
    })
  };

  cancel = (key) => {
    this.setState({
      editingKey: null,
    })
  };

  render() {

    const columns = [{
      title: 'Username',
      dataIndex: 'username',
      editable: true,
      width: '20%',
    }, {
      title: 'Email',
      dataIndex: 'email',
      editable: true,
      width: '20%',
    }, {
      title: 'Role',
      dataIndex: 'role',
      editable: true,
      width: '20%',
    }, {
      title: 'Action',
      dataIndex: 'action',
      width: '20%',
      render: (text, record) => {
        return (
            <div>
              {
                this.state.tableData.length >= 1 ? (
                    <div> {
                      record.key === this.state.editingKey ? (
                          <span>
                        <EditableContext.Consumer>
                          {form => (
                              <a href={"javascript:;"}
                                 style={{marginRight: 8}}>
                                Save
                              </a>
                          )}
                        </EditableContext.Consumer>
                        <Popconfirm
                            title="Sure to cancel?"
                            onConfirm={() => this.cancel(record.key)}
                        >
                        <a>Cancel</a>
                        </Popconfirm>
                      </span>
                      ) : (
                          <span>
                        <a onClick={() => this.edit(record.key)}>Edit</a>
                      </span>
                      )}
                      <span style={{marginLeft:8, marginRight:8}}>|</span>
                      <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <button className={"link"}>Delete</button>
                      </Popconfirm>
                    </div>
                ) : null}
            </div>
        );
      },
    }];

    function onChange() {
      console.log('dziala');
    }

    return (
        <div>
          <Row type="flex" justify="center" align="top" style={{width: '100%'}}>
            <Col span={18}>
              <Table
                  columns={columns}
                  dataSource={this.state.tableData}
                  onChange={onChange}
                  loading={this.state.tableLoading}
                  className={"userTable"}
                  size="middle"
                  // pagination={{pageSize: 2}}
                  bordered={true}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" align="top" style={{width: '100%'}}>
            <Col span={18}>
              <Button type={"primary"} onClick={this.openModal}>Add user</Button>
              <WrappedUserModalForm
                  wrappedComponentRef={this.saveRefModal}
                  visible={this.state.modalVisibility}
                  onCancel={this.closeModal}
                  onCreate={this.submitModal}
              />
            </Col>
          </Row>
        </div>
    );
  }
}

export default UserComponent;