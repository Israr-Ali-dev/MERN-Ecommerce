import { API } from '../../config';
import Axios from 'axios';

export const getProducts = (filters) => {
  let f = '';
  if (filters) {
    f = JSON.stringify(filters);
  }
  const options = {
    url: `${API}/products?sortBy=&order=1&limit=6&filters=${f}`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getCategories = (sortBy) => {
  const options = {
    url: `${API}/categories?sortBy=${sortBy}&order=desc&limit=12`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getCollections = (sortBy) => {
  const options = {
    url: `${API}/collections?sortBy=${sortBy}&order=desc&limit=12`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getModels = (sortBy) => {
  const options = {
    url: `${API}/phonemodel?sortBy=${sortBy}&order=desc&limit=12`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getSubCategories = (sortBy) => {
  const options = {
    url: `${API}/subcategory?sortBy=${sortBy}&order=desc&limit=12`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getCases = (sortBy) => {
  const options = {
    url: `${API}/cases?sortBy=${sortBy}&order=desc&limit=12`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getSearchProducts = (query) => {
  const options = {
    url: `${API}/products/search?search=${query}`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getProductById = (id) => {
  const options = {
    url: `${API}/product/${id}`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getRelatedProducts = (id) => {
  const options = {
    url: `${API}/products/related/${id}`,
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getBraintreeClientToken = (userId, token) => {
  return fetch(`${API}/braintree/getToken/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
  return fetch(`${API}/braintree/payment/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paymentData),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createOrder = (userId, token, createOrderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: createOrderData }),
  })
    .then((response) => {
      console.log();
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
  return fetch(`${API}/order/${orderId}/status/${userId}`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ status, orderId }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const orderList = (userId, token) => {
  return fetch(`${API}/order/listOrder/${userId}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const newsletterSignup = (mail) => {
  const options = {
    url: `${API}/newsletter/signup`,
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: { mail: mail },
  };

  return Axios(options)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
