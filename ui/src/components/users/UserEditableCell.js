import React, {Component} from 'react';
import {Form, Input, InputNumber, Radio} from 'antd';
import {EditableContext} from "./UserTable";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;

class UserEditableCell extends Component {

  getInput = () => {
    if (this.props.type === 'number') {
      return <InputNumber/>;
    }
    return <Input/>;
  };


  render() {

    const {
      editing,
      dataIndex,
      title,
      record,
      ...restProps
    } = this.props;

    return (
        <EditableContext.Consumer>
          {(form) => {
            const {getFieldDecorator} = form;
            return (
                <td {...restProps}>
                  {editing ? (
                      <FormItem style={{margin: 0}}>
                        {dataIndex === 'userRole' ? (
                            getFieldDecorator(dataIndex, {
                              rules: [{
                                required: true,
                                message: `Please Input ${title}!`,
                              }],
                              initialValue: record[dataIndex],
                            })(
                                <RadioGroup>
                                  <Radio value="admin">Admin</Radio>
                                  <Radio value="user">User</Radio>
                                </RadioGroup>
                            )
                        ) : (
                            getFieldDecorator(dataIndex, {
                              rules: [{
                                required: true,
                                message: `Please Input ${title}!`,
                              }],
                              initialValue: record[dataIndex],
                            })(this.getInput())
                        )}

                      </FormItem>
                  ) : restProps.children}
                </td>
            );
          }}
        </EditableContext.Consumer>
    );
  }
}

export default UserEditableCell;