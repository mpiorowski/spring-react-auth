import {API_BASE_URL} from "../config/config";
import {request} from "./AuthService";

export const getAllUsers = () => {
  return request({
    url: API_BASE_URL + "/allusers",
    method: "GET"
  })
};

export const addUsers = (users) => {
  console.log(JSON.stringify(users));
  return request({
    url: API_BASE_URL + "/addusers",
    method: "POST",
    body: JSON.stringify(users)
  })
};