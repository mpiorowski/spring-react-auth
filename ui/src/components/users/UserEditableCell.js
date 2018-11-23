import React, {Component} from 'react';
import {Form, Input, InputNumber} from 'antd';
import {EditableContext} from "./UserTable";

const FormItem = Form.Item;

class UserEditableCell extends Component {

  getInput = () => {
    if (this.props.inputType === 'number') {
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
            const { getFieldDecorator } = form;
            return (
                <td {...restProps}>
                  {editing ? (
                      <FormItem style={{ margin: 0 }}>
                        {getFieldDecorator(dataIndex, {
                          rules: [{
                            required: true,
                            message: `Please Input ${title}!`,
                          }],
                          initialValue: record[dataIndex],
                        })(this.getInput())}
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