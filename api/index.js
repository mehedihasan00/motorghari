import fetch from 'isomorphic-fetch';

export function get(url) {
  var apiUrl = `${process.env.baseUrl}/${url}`;
  var data = fetch(apiUrl).then(function(response){
    return response.json()
  })
  return data;
}
export function get_root(url) {
  var apiUrl = `${process.env.rootUrl}/${url}`;
  var data = fetch(apiUrl).then(function(response){
    return response.json()
  })
  return data;
}
export function post(url, body) {
  var apiUrl = `${process.env.baseUrl}/${url}`;
  var data = fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(function(response){
    return response.json()
  })
  return data;
}
export function put(url, body) {
  var apiUrl = `${process.env.rootUrl}/${url}`;
  var data = fetch(apiUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(function(response){
    return response.json()
  })
  return data;
}
export function post_root(url, body) {
  var apiUrl = `${process.env.rootUrl}/${url}`;
  var data = fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }).then(function(response){
    return response.json()
  })
  return data;
}
