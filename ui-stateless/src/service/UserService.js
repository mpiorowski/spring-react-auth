import {API_BASE_URL} from "../config/config";
import {request} from "./request";

export const getAllUsers = () => {
  return request({
    url: API_BASE_URL + "/user/all",
    method: "GET"
  })
};

export const addUsers = (users) => {
  return request({
    url: API_BASE_URL + "/user/add",
    method: "POST",
    body: JSON.stringify(users)
  })
};