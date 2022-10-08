import {request} from "./request";

export function serviceGetUser() {
  return request({
    url: "api/auth/user",
    method: "GET"
  })
}

export function serviceLogIn(credentials) {
  return request({
    url: "api/auth/login",
    method: "POST",
    body: JSON.stringify(credentials)
  });
}