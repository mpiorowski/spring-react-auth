import React, {Component} from 'react';
import {Form, Icon, Input, Button} from 'antd';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class FormComponentClass extends Component {

  constructor(props) {
    super(props);

    this.state = {
      firstSubmit: false,
    }

    // this.setSubmit = this.setSubmit.bind(this);
  }

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Recevied values of form: ', values);
      } else {
        console.log(err);
        this.setState({
          firstSubmit: true,
        })
      }
    })
  };

  render() {

    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;

    // const userNameError = isFieldTouched('userName') && getFieldError('userName');
    // const passwordError = isFieldTouched('password') && getFieldError('password');

    const userNameError = this.state.firstSubmit && getFieldError('userName');
    const passwordError = this.state.firstSubmit && getFieldError('password');

    console.log(getFieldError('password'));
    console.log(getFieldError('userName'));

    return (
        <Form layout={'inline'} onSubmit={this.handleSubmit}>
          <FormItem
              validateStatus={userNameError ? 'error' : ''}
              help={userNameError || ''}
          >
            {
              getFieldDecorator(
                  'userName', {
                    rules: [{required: true, message: 'Please input your username!'}],
                  }
              )(
                  <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25'}}/>} placeholder={"Username"}
                  />
              )
            }
          </FormItem>
          <FormItem
              validateStatus={passwordError ? "error" : ""}
              help={passwordError || ''}
          >
            {
              getFieldDecorator(
                  'password', {
                    rules: [{required: true, message: 'Please input your Password!'}],
                  }
              )(
                  <Input prefix={<Icon type={'lock'} style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder={'Password'}
                  />
              )

            }
          </FormItem>
          <FormItem>
            <Button
                type={'primary'}
                htmlType={'submit'}
                // disabled={hasErrors(getFieldsError())}
            >
              Log in
            </Button>
          </FormItem>
        </Form>
    );
  }

}

const FormComponent = Form.create()(FormComponentClass);

export default FormComponent;