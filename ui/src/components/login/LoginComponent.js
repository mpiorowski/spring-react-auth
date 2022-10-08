import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';
import {serviceLogIn} from "../../service/AuthService";
import {ACCESS_TOKEN} from "../../config/config";
import {authNotification} from "../../notification/AuthNotification";

class LoginComponent extends Component {

  constructor(props) {
    super(props);
    const { from } = this.props.location.state || {from: {pathname: '/hello'}};
    this.state = {
      from : from,
    }
  }

  handleSubmit = (credentials) => {
    serviceLogIn(credentials)
        .then(response => {
          if (response.jwtToken) {
            localStorage.setItem(ACCESS_TOKEN, response.jwtToken);
            this.props.checkAuth();
            this.props.history.push(this.state.from);
          }
        })
        .catch(error => {
          console.log(error);
          if (error.status === 401) {
            authNotification('credential');
          } else {
            authNotification('connect');
          }
        });
  };

  render() {
    return (
        <div className={'app-main'}>
          <WrappedFormComponent handleSubmit={this.handleSubmit}/>
        </div>
    );
  }
}

export default LoginComponent;

const FormItem = Form.Item;

class FormComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      firstSubmit: false,
    }
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  validateAndSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, credentials) => {
      if (!err) {
        this.props.handleSubmit(credentials);
      } else {
        console.log(err);
        this.setState({
          firstSubmit: true,
        })
      }
    })
  };

  // antd project
  // hasErrors(fieldsError) {
  //   return Object.keys(fieldsError).some(field => fieldsError[field]);
  // }

  render() {

    // form antd project
    // const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    // const userNameError = isFieldTouched('userName') && getFieldError('userName');
    // const passwordError = isFieldTouched('password') && getFieldError('password');

    const {getFieldDecorator, getFieldError} = this.props.form;

    const userNameError = this.state.firstSubmit && getFieldError('username');
    const passwordError = this.state.firstSubmit && getFieldError('password');

    return (
        <div>
          <Form layout={'inline'} onSubmit={this.validateAndSubmit}>
            <FormItem
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}
            >
              {getFieldDecorator(
                  'username', {
                    rules: [{required: true, message: 'Please input your username!'}],
                  }
              )(
                  <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25'}}/>} placeholder={"Username"}/>
              )}
            </FormItem>
            <FormItem
                validateStatus={passwordError ? "error" : ""}
                help={passwordError || ''}
            >
              {getFieldDecorator(
                  'password', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                  }
              )(
                  <Input prefix={<Icon type={'lock'} style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder={'Password'}/>
              )}
            </FormItem>
            <FormItem>
              <Button
                  type={'primary'}
                  htmlType={'submit'}
                  // form antd project
                  // disabled={this.hasErrors(getFieldsError())}
              >
                Log in
              </Button>
            </FormItem>
          </Form>
        </div>
    );
  }

}

export const WrappedFormComponent = Form.create()(FormComponent);
