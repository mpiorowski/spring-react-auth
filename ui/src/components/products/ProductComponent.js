import React, {Component} from 'react';
import {Form} from 'antd';
import './ProductComponent.css';
import {addProducts, deleteProducts, getAllProducts} from "../../service/ProductService";
import {productNotification} from "../../notification/ProductNotification";
import ProductForm from "./ProductForm";

let uuid = 0;
let productId;
let oldProducts = [];
let deletedProducts = [];

class ProductComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      updated: false,
    }
  }

  componentDidMount() {
    getAllProducts().then(response => {
      if (response) {
        response.forEach(product => {
          this.add(product);
          oldProducts.push(product);
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

        const newProducts = values['product']
            .filter((val) => val != null)
            .map((val, index) => {
              return {
                productId: values['keys'][index],
                productName: val[0],
                productPrice: val[1],
                productAvailable: val[2]
              };
            });

        let changes = this.getChanges(oldProducts, newProducts);
        let noChanges = true;

        if (changes !== undefined && changes.length > 0) {
          noChanges = false;
          const products = {products: changes};
          console.log(products);
          addProducts(products).then(response => {
            if (response) {
              productNotification("updated");
            }
          }).catch(err => {
            console.log(err);
            productNotification('error');
          });
        }

        if (deletedProducts.length > 0 && deletedProducts !== undefined) {
          noChanges = false;
          deleteProducts(deletedProducts).then(response => {
            if (response) {
              productNotification("deleted");
            }
          }).catch(err => {
            console.log(err);
            productNotification('error');
          });
        }

        if (noChanges) {
          productNotification("noChanges")
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

    let test = keys.filter(key => key !== k);
    console.log(test);

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
        [`product[${productId}][0]`]: product['productName'],
        [`product[${productId}][1]`]: product['productPrice'],
        [`product[${productId}][2]`]: product['productAvailable']
      });
    }
    uuid++;
  };

  render() {
    return (
        <div>
          <ProductForm
              {...this.props}
              loading={this.state.loading}
              form={this.props.form}
              add={this.add}
              remove={this.remove}
              handleSubmit={this.handleSubmit}
          />
        </div>
    )
  }
}

export const WrappedProductComponent = Form.create()(ProductComponent);