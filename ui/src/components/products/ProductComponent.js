import React, {Component} from 'react';
import {Form, Input, Icon, Button, Row, Col, Switch, InputNumber, Spin} from 'antd';
import './ProductComponent.css';
import {addProducts, deleteProducts, getAllProducts} from "../../service/ProductService";
import {productNotification} from "../../notification/ProductNotification";

const FormItem = Form.Item;
let uuid = 0;
let productId;
let oldProducts = [];
let deletedProducts = [];

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
          oldProducts.push(product);
          console.log(product);
        });
        this.setState({
          loading: false,
        })
      }
    })
  }

  getChanges = (oldArray, newArray) => {
    let changes, i, item, j, len;
    if (JSON.stringify(oldArray) === JSON.stringify(newArray)) {
      return false;
    }
    changes = [];
    for (i = j = 0, len = newArray.length; j < len; i = ++j) {
      item = newArray[i];
      if (JSON.stringify(item) !== JSON.stringify(oldArray[i])) {
        changes.push(item);
      }
    }
    return changes;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {

        // const products = {
        //   products: values['product']
        //       .filter((val) => val != null)
        //       .map((val, index) => {
        //         let product =  {productId: values['keys'][index] ,productName: val[0], productPrice: val[1], productAvailable: val[2]};
        //         newArray.push(product);
        //         return product;
        //       })
        // };

        console.log(values);

        const newProducts = values['product']
              .filter((val) => val != null)
              .map((val, index) => {
                return {productId: values['keys'][index] ,productName: val[0], productPrice: val[1], productAvailable: val[2]};
              });

        let changes = this.getChanges(oldProducts, newProducts);
        console.log(changes);

        if (changes !== undefined && changes.length > 0 ) {
          const products = {products: changes};
          console.log(products);
          addProducts(products).then(response => {
            if (response) {
              productNotification('updated');
            }
          }).catch(err => {
            console.log(err);
            productNotification('error');
          });
        }

        if (deletedProducts.length > 0 && deletedProducts !== undefined) {
          deleteProducts(deletedProducts).then(response => {
            if (response) {
              productNotification('deleted');
            }
          }).catch(err => {
            console.log(err);
            productNotification('error');
          });
        }

      } else {
        console.log(err);
        productNotification('warning');
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
    deletedProducts.push(k);

    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  add = (product) => {

    const {form} = this.props;
    const keys = form.getFieldValue('keys');

    product !== null ? productId = product['productId'] : productId++;

    const nextKeys = keys.concat(productId);

    form.setFieldsValue({
      keys: nextKeys,
    });
    if (product !== null) {
      form.setFieldsValue({
        [`product[${uuid}][0]`]: product['productName'],
        [`product[${uuid}][1]`]: product['productPrice'],
        [`product[${uuid}][2]`]: product['productAvailable']
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
                  {getFieldDecorator(`product[${index}][0]`, {
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
                  {getFieldDecorator(`product[${index}][1]`, {
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
                          precision={2}
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
                    {getFieldDecorator(`product[${index}][2]`, {valuePropName: 'checked', initialValue: true})(
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
                <Button type="dashed" onClick={() => this.add(null)} className={"add-btn"}>
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