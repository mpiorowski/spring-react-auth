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
  }

  setColumns = () => {
    return [{
      title: 'Username',
      dataIndex: 'userName',
      editable: true,
      width: '20%',
    }, {
      title: 'Email',
      dataIndex: 'userEmail',
      editable: true,
      width: '20%',
    }, {
      title: 'Role',
      dataIndex: 'userRole',
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
                      record.key === this.props.editingKey ? (
                          <span>
                            <EditableContext.Consumer>
                              {form => (
                                  <button className={"link"} style={{marginRight: 8}} onClick={() => this.props.submitEdit(form, record.key)} >Save</button>
                              )}
                            </EditableContext.Consumer>
                            <Popconfirm
                                title="Sure to cancel?"
                                onConfirm={() => this.props.cancelEdit()}
                            >
                            <button className={"link"}>Cancel</button>
                            </Popconfirm>
                          </span>
                      ) : (
                          <span>
                            <button className={"link"} onClick={() => this.props.edit(record.key)}>Edit</button>
                          </span>
                      )}
                      <span style={{marginLeft: 8, marginRight: 8}}>|</span>
                      <Popconfirm title="Sure to delete?" onConfirm={() => this.props.handleDelete(record.key)}>
                        <button className={"link"}>Delete</button>
                      </Popconfirm>
                    </div>
                ) : null}
            </div>
        );
      },
    }];
  };

  onChange = () => {
    console.log('change');
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
          type: 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: record.key === this.props.editingKey,
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
