export const BASE_URL = 'https://auth.nomoreparties.co';

const handleResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(`Ошибка в ${res.status}`);
};

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })
  .then((res) => {
    return handleResponse(res)
  })
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((res) => {
    return handleResponse(res)
  })
  .then((data) => {
    if (data.token){
      localStorage.setItem('jwt', data.jwt);
      return data;
    }
  })
  .catch((err) => console.log(err));
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      },
  })
  .then((res) => {
    return handleResponse(res)
  })
  .then(data => data)
  .catch((err) => console.log(err));
}