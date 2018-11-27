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

  getFormItem = (dataIndex, form, record) => {
    const {getFieldDecorator} = form;
    switch (dataIndex) {
      case "userName":
        return (
            <FormItem style={{margin: 0}}>
              {getFieldDecorator('userName', {
                validateTrigger: ['onChange', 'onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  max: 60,
                  pattern: /^\S+$/,
                  message: "Please input user's name. Max 60 characters. No spaces.",
                }],
                initialValue: record[dataIndex],
              })(
                  <Input placeholder="user name (max: 60)"/>
              )}
            </FormItem>
        );
      case "userEmail":
        return (
            <FormItem style={{margin: 0}} required={false}>
              {getFieldDecorator('userEmail', {
                validateTrigger: ['onBlur'],
                rules: [{
                  required: true,
                  whitespace: true,
                  max: 60,
                  pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Please input user's email. Max 60 characters. Email format.",
                }],
                initialValue: record[dataIndex],
              })(
                  <Input placeholder="user password (max: 60)"/>
              )}
            </FormItem>
        );
      case "userRole":
        return (
            <FormItem style={{margin: 0}} required={false}>
              {getFieldDecorator('userRole', {
                initialValue: record[dataIndex],
              })(
                  <RadioGroup>
                    <Radio value="admin">Admin</Radio>
                    <Radio value="user">User</Radio>
                  </RadioGroup>
              )}
            </FormItem>
        );
    }
  };


  render() {

    const {
      editing,
      dataIndex,
      record,
      ...restProps
    } = this.props;

    return (
        <EditableContext.Consumer>
          {(form) => {
            return (
                <td {...restProps}>
                  {editing ? (
                      <div>
                        {this.getFormItem(dataIndex, form, record)}
                      </div>
                  ) : restProps.children}
                </td>
            );
          }}
        </EditableContext.Consumer>
    );
  }
}
//
// <FormItem style={{margin: 0}}>
//   {dataIndex === 'userRole' ? (
//       getFieldDecorator(dataIndex, {
//         rules: [{
//           required: true,
//           message: `Please Input ${title}!`,
//         }],
//         initialValue: record[dataIndex],
//       })(
//           <RadioGroup>
//             <Radio value="admin">Admin</Radio>
//             <Radio value="user">User</Radio>
//           </RadioGroup>
//       )
//   ) : (
//       getFieldDecorator(dataIndex, {
//         rules: [{
//           required: true,
//           message: `Please Input ${title}!`,
//         }],
//         initialValue: record[dataIndex],
//       })(this.getInput())
//   )}
//
// </FormItem>

export default UserEditableCell;

