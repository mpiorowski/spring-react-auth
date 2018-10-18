import {ACCESS_TOKEN, API_BASE_URL} from "../config/config";

const request = (options) => {

  const headers = new Headers({
    'Content-Type': 'application/json',
  });

  headers.append('Authorization', 'Bearer ' + ACCESS_TOKEN);

  const defaults = {headers: headers};
  options = Object.assign({}, defaults, options);

  // console.log(options);

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

export function getCurrentUser() {

  return request({
    url: API_BASE_URL + "/user",
    method: "GET"
  })
}