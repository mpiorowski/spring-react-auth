import {ACCESS_TOKEN, API_BASE_URL} from "../config/config";

export const request = (options) => {

  const headers = new Headers({
    'Content-Type': 'application/json'
  });
  
  if (localStorage.getItem(ACCESS_TOKEN)) {
    headers.append('Authorization', 'Bearer '+localStorage.getItem(ACCESS_TOKEN));
  }

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  return fetch(options.url, options)
      .then(response =>
          response.json().then(json => {
            if (!response.ok) {
              return Promise.reject(json);
            }
            return json;
          })
      );
};

export function serviceGetUser() {
  return request({
    url: API_BASE_URL + "/user",
    method: "GET"
  })
}

export function serviceLogIn(values) {
  return request({
    url: API_BASE_URL + "/auth?username=" + values.userName + "&password=" + values.password,
    method: "GET"
  });
}