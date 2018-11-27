import {API_BASE_URL} from "../config/config";
import {request} from "./request";

export const getAllUsers = () => {
  return request({
    url: API_BASE_URL + "/user/all",
    method: "GET"
  })
};

export const addUser = (user) => {
  console.log(user);
  return request({
    url: API_BASE_URL + "/user/add",
    method: "POST",
    body: JSON.stringify(user)
  })
};

export const deleteUser = (userId) => {
  return request({
    url: API_BASE_URL + "/user/delete",
    method: "DELETE",
    body: JSON.stringify(userId)
  })
};

export const updateUser = (user) => {
  return request({
    url: API_BASE_URL + "/user/update",
    method: "PUT",
    body: JSON.stringify(user)
  })
};