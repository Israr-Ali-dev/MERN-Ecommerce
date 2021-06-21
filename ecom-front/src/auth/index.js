import Axios from 'axios';
import { API } from '../config';

export const signup = (user) => {
  const options = {
    url: `${API}/signup`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: user,
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const signin = (user) => {
  const options = {
    url: `${API}/signin`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: user,
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const signout = (next) => {
  //  Remove user data to local storage
  if (typeof window !== 'undefined') {
    localStorage.removeItem('jwt');
  }
  next();

  const options = {
    url: `${API}/signout`,
    method: 'GET',
  };

  Axios(options)
    .then((response) => {})
    .catch((error) => {
      console.log('error', error);
    });
};

export const isAuthenticated = () => {
  if (typeof window == 'undefined') {
    return false;
  }
  if (localStorage.getItem('jwt')) {
    return JSON.parse(localStorage.getItem('jwt'));
  } else {
    return false;
  }
};

export const updateUser = (userId, user, token) => {
  const options = {
    url: `${API}/user/update/${userId}`,
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    data: user,
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
