import React, {Component} from 'react';
import {Form, Popconfirm, Table} from "antd";
import UserEditableCell from "./UserEditableCell";
import "./UserComponent.css";
import "./UserTable.css";

export const EditableContext = React.createContext();

const EditableRow = ({form, index, ...props}) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class UserTable extends Component {

  constructor(props) {
    super(props);
    this.columns = this.setColumns();
    this.state = {
      editingKey: null
    }
  }

  setColumns = () => {
    return [{
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
      editable: false,
      render: (text, record) => {
        return (
            <div>
              {
                this.props.tableData.length >= 1 ? (
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
                                onConfirm={() => this.cancel()}
                            >
                            <a>Cancel</a>
                            </Popconfirm>
                          </span>
                      ) : (
                          <span>
                            <a onClick={() => this.edit(record.key)}>Edit</a>
                          </span>
                      )}
                      <span style={{marginLeft: 8, marginRight: 8}}>|</span>
                      <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.key)}>
                        <button className={"link"}>Delete</button>
                      </Popconfirm>
                    </div>
                ) : null}
            </div>
        );
      },
    }];
  };


  edit = (key) => {
    this.setState({
      editingKey: key,
    })
  };

  cancel = () => {
    this.setState({
      editingKey: null,
    })
  };

  onChange = () => {
    console.log('dziala');
  };

  render() {

    const components = {
      body: {
        row: EditableFormRow,
        cell: UserEditableCell
      }
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: record.key === this.state.editingKey,
        }),
      };
    });

    return (
        <div>
          <Table
              components={components}
              columns={columns}
              dataSource={this.props.tableData}
              onChange={this.onChange}
              loading={this.props.tableLoading}
              className={"userTable"}
              size="middle"
              // pagination={{pageSize: 2}}
              bordered={true}
              rowClassName="editable-row"
          />
        </div>
    );
  }
}

export default UserTable;
