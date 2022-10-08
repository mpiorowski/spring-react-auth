import {request} from "./request";

export const getAllProducts = () => {
  return request({
    url: "api/product/all",
    method: "GET"
  })
};

export const addProducts = (products) => {
  console.log(JSON.stringify(products));
  return request({
    url: "api/product/add",
    method: "POST",
    body: JSON.stringify(products)
  })
};


export const deleteProducts = (products) => {
  console.log(JSON.stringify(products));
  return request({
    url: "api/product/delete",
    method: "DELETE",
    body: JSON.stringify(products)
  })
};