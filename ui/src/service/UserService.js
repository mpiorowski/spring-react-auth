import {request} from "./request";

export const getAllUsers = () => {
  return request({
    url: "api/user/all",
    method: "GET"
  })
};

export const addUser = (user) => {
  return request({
    url: "api/user/add",
    method: "POST",
    body: JSON.stringify(user)
  })
};

export const deleteUser = (userId) => {
  return request({
    url: "api/user/delete",
    method: "DELETE",
    body: JSON.stringify(userId)
  })
};

export const updateUser = (user) => {
  console.log(user);
  return request({
    url: "api/user/update",
    method: "PUT",
    body: JSON.stringify(user)
  })
};