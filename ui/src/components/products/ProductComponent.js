import React, {Component} from 'react';
import {Form, Input, Icon, Button, Row, Col, Switch, InputNumber, Spin} from 'antd';
import './ProductComponent.css';
import {addProducts, getAllProducts} from "../../service/ProductService";
import {productNotification} from "../../notification/ProductNotification";

const FormItem = Form.Item;
let uuid = 0;

class ProductComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    getAllProducts().then(response => {
      if (response) {
        response.forEach(product => {
          this.add(product);
        });
        this.setState({
          loading: false,
        })
      }
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const products = {
          products: values['product'].filter((val) => val != null)
              .map((val) => {
                return {productName: val[0], price: val[1], available: val[2]};
              })
        };
        console.log(products);
        addProducts(products).then(response => {
          if (response) {
            productNotification('success');
          }
        }).catch(err => {
          console.log(err);
          productNotification();
        });
      } else {
        console.log(err);
        productNotification('error');
      }
    });
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

  add = (product = null) => {
    const {form} = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
    if (product !== null) {
      form.setFieldsValue({
        [`product[${uuid}][0]`]: product['productName'],
        [`product[${uuid}][1]`]: product['price'],
        [`product[${uuid}][2]`]: product['available'],
      });
    }
    uuid++;
  };

  render() {
    const {getFieldDecorator, getFieldValue} = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
      },
      wrapperCol: {
        xs: {span: 24},
      },
    };
    const formItemLayoutWithOutLabel = {
      wrapperCol: {
        xs: {span: 24},
      },
    };
    getFieldDecorator('keys', {initialValue: []});
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
          <div key={k}>
            {index === 0 ? '' : <hr style={{marginBottom: '30px'}}/>}
            <Row type="flex" align="top" key={k}>
              <Col span={10} offset={4}>
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Product name' : ''}
                    required={false}
                    key={k}
                >
                  {getFieldDecorator(`product[${k}][0]`, {
                    validateTrigger: ['onChange', 'onBlur'],
                    rules: [{
                      required: true,
                      whitespace: true,
                      max: 200,
                      message: "Please input product's name. Max 200 characters.",
                    }],
                  })(
                      <Input placeholder="product name (max: 200)" style={{width: '90%', marginRight: 8}}/>
                  )}
                </FormItem>
              </Col>
              <Col span={4}>
                <FormItem
                    {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                    label={index === 0 ? 'Product price' : ''}
                    required={false}
                    key={k}
                >
                  {getFieldDecorator(`product[${k}][1]`, {
                    validateTrigger: ['onChange'],
                    rules: [{
                      required: true,
                      type: 'number',
                      max: 999,
                      message: "Input correct number, max 999.",
                    }],

                  })(
                      <InputNumber
                          min={1}
                          max={999}
                          placeholder="price (max: 999)"
                          style={{width: '80%', marginRight: 8}}
                      />
                  )}
                </FormItem>
              </Col>
              <Col span={3}>
                <FormItem
                    {...formItemLayout}
                    label={index === 0 ? 'Available' : ''}
                >
                  <div className={"deleteDiv"}>
                    {getFieldDecorator(`product[${k}][2]`, {valuePropName: 'checked', initialValue: true})(
                        <Switch className={"switch-btn"}/>
                    )}
                    {keys.length > 1 ? (
                        <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                            style={{marginLeft: '40px'}}
                        />
                    ) : null}
                  </div>
                </FormItem>
              </Col>
            </Row>
          </div>

      );
    });

    const antIcon = <Icon type="loading-3-quarters" style={{fontSize: 30}} spin/>;
    if (this.state.loading) {
      return (
          <div className="loading">
            <header>
              <Spin indicator={antIcon} style={{display: 'block', textAlign: 'center', marginTop: 30}}/>
            </header>
          </div>
      )
    }
    return (
        <Form onSubmit={this.handleSubmit} layout={"vertical"}>
          {formItems}
          <Row type="flex" align="top" key={-1}>
            <Col span={8} offset={4}>
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="dashed" onClick={this.add} className={"add-btn"}>
                  <Icon type="plus"/> Add new product
                </Button>
              </FormItem>
              <FormItem {...formItemLayoutWithOutLabel}>
                <Button type="primary" htmlType="submit">Submit</Button>
              </FormItem>
            </Col>
          </Row>
        </Form>
    );
  }
}

export const WrappedProductComponent = Form.create()(ProductComponent);