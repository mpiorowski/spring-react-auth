import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Form, Input, Icon, Button, Col, Row} from 'antd';
import './UserComponent.css';
import {addUsers, getAllUsers} from "../../service/UserService";

class UserComponent extends Component {

  handleSubmit = (values) => {
    const users = [];
    values['user'].map((val) =>{
      users.push({username: val[0], password: val[1]})
    });
    addUsers(users);
  };

  render() {
    return (
        <div>
          <UserFormWrapped handleSubmit={this.handleSubmit}/>
        </div>
    );
  }
}

export default UserComponent;

const FormItem = Form.Item;
let uuid = 0;

class UserFormComponent extends Component {

  componentDidMount() {
    getAllUsers().then(response => {
      if (response) {
        response.map((val) => {
          this.add(val);
        });
      }
    });
  }

  validateAndSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
      } else {
        console.log(err);
      }
    })
  };

  remove = (k) => {
    const {form} = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      return;
    }

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = ( value = null ) => {
    const {form} = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);

    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
    if (value !== null) {
      form.setFieldsValue({
        [`user[${uuid}][0]`]: value['username'],
        [`user[${uuid}][1]`]: value['password'],
      });
    }
    uuid++;
  };

  render() {

    const {getFieldDecorator, getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
      }
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 20, offset: 4},
      },
    };
    const formItemLayoutAdd = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 14, offset: 5},
      },
    };

    getFieldDecorator('keys', {initialValue: []});
    getFieldDecorator('values', {initialValue: []});
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
          <Row type="flex" justify="center" align="top" key={k}>
            <Col span={8}>
              <FormItem
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Login' : ''}
                  required={false}
                  key={k}
                  style={{color: "white"}}
              >
                {
                  getFieldDecorator(`user[${k}][0]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      message: "Please input user login.",
                    }]
                  })(
                      <Input placeholder="Login" style={{width: '80%', marginRight: 8}} />
                  )
                }
              </FormItem>
            </Col>
            <Col span={8}>
              <FormItem
                  {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                  label={index === 0 ? 'Password' : ''}
                  required={false}
                  key={k + 1}
                  style={{color: "white"}}
              >
                {getFieldDecorator(`user[${k}][1]`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  validateStatus: 'success',
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: "Please input user password.",
                  }]
                })(
                    <Input placeholder="Login" style={{width: '80%', marginRight: 8}}/>
                )}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        disabled={keys.length === 1}
                        onClick={() => this.remove(k)}
                    />
                ) : null}
              </FormItem>
            </Col>
          </Row>
      );
    });
    return (
        <Form onSubmit={this.validateAndSubmit}>
          {formItems}
          <FormItem {...formItemLayoutAdd} style={{}}>
            <Button type="dashed" onClick={this.add} style={{width: '100%'}}>
              <Icon type="plus"/> Add field
            </Button>
          </FormItem>
          <FormItem {...formItemLayoutAdd}>
            <Button type="primary" htmlType="submit" >Submit</Button>
          </FormItem>
        </Form>
    );
  }
}

UserFormComponent.propTypes = {
  nameT: PropTypes.string
};

const UserFormWrapped = Form.create()(UserFormComponent);
