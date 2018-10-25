import {API_BASE_URL} from "../config/config";
import {request} from "./request";

export function serviceGetUser() {
  return request({
    url: API_BASE_URL + "/user/auth",
    method: "GET"
  })
}

export function serviceLogIn(values) {
  return request({
    url: API_BASE_URL + "/auth?username=" + values.userName + "&password=" + values.password,
    method: "GET"
  });
}