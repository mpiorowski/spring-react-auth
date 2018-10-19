import React, {Component} from 'react';
import {Button, Form, Icon, Input} from 'antd';
import {serviceLogIn} from "../service/AuthService";
import {ACCESS_TOKEN} from "../config/config";

class LoginComponent extends Component {

  handleSubmit = (values) => {
    serviceLogIn(values)
        .then(response => {
          localStorage.setItem(ACCESS_TOKEN, response.jwtToken);
          this.props.checkAuth();
        })
        .catch(error => {
          console.log(error);
        });
  };

  render() {
    return (
        <div>
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
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit(values);
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

    const userNameError = this.state.firstSubmit && getFieldError('userName');
    const passwordError = this.state.firstSubmit && getFieldError('password');

    return (
        <header className="App-header">
          <Form layout={'inline'} onSubmit={this.validateAndSubmit}>
            <FormItem
                validateStatus={userNameError ? 'error' : ''}
                help={userNameError || ''}
            >
              {getFieldDecorator(
                  'userName', {
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
        </header>
    );
  }

}

export const WrappedFormComponent = Form.create()(FormComponent);
