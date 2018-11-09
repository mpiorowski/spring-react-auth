import {API_BASE_URL} from "../config/config";
import {request} from "./request";

export const getAllProducts = () => {
  return request({
    url: API_BASE_URL + "/product/all",
    method: "GET"
  })
};

export const addProducts = (products) => {
  console.log(JSON.stringify(products));
  return request({
    url: API_BASE_URL + "/product/add",
    method: "POST",
    body: JSON.stringify(products)
  })
};