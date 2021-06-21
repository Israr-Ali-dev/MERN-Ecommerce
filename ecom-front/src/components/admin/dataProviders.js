import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';
// import { isAuthenticated } from '../../auth/index';

const apiUrl = 'http://localhost:8000/api';
// const httpClient = fetchUtils.fetchJson;

// Geting Login User Id for authentication.
const userId = () => {
  if (localStorage.getItem('username')) {
    const {
      user: { _id },
    } = JSON.parse(localStorage.getItem('username')); //   isAuthenticated();
    return _id;
  } else {
    return false;
  }
};

// Geting Login User Id for authentication.
const userToken = () => {
  if (localStorage.getItem('username')) {
    const { token } = JSON.parse(localStorage.getItem('username')); //isAuthenticated();
    return token;
  } else {
    return false;
  }
};

// Adding Custom Header
const httpClient = (url, options = {}) => {
  if (!options.headers) {
    options.headers = new Headers({ Accept: 'application/json' });
  }
  //const token = localStorage.getItem('token');
  options.headers.set('Authorization', `Bearer ${userToken()}`);
  return fetchUtils.fetchJson(url, options);
};

export const customProvider = {
  getList: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify(params.filter),
    };
    let url = '';
    if (resource === 'order') {
      url = `${apiUrl}/${resource}/list/${userId()}`;
    } else {
      url = `${apiUrl}/${resource}?${stringify(query)}`;
    }

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  getOne: (resource, params) => {
    if (resource === 'products') {
      return httpClient(`${apiUrl}/product/${params.id}`).then(({ json }) => ({
        data: json,
      }));
    }
    if (resource === 'categories') {
      return httpClient(`${apiUrl}/category/${params.id}`).then(({ json }) => ({
        data: json,
      }));
    }
    if (resource === 'order') {
      return httpClient(`${apiUrl}/order/${userId()}/${params.id}`).then(
        ({ json }) => ({
          data: json,
        })
      );
    } else {
      return httpClient(`${apiUrl}/${resource}/${params.id}`).then(
        ({ json }) => ({
          data: json,
        })
      );
    }
  },
  getMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url).then(({ json }) => ({ data: json }));
  },

  getManyReference: (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;
    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;

    return httpClient(url).then(({ headers, json }) => ({
      data: json,
      total: parseInt(headers.get('content-range').split('/').pop(), 10),
    }));
  },

  update: (resource, params) => {
    if (resource === 'products') {
      return httpClient(`${apiUrl}/product/${params.id}/${userId()}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    }
    if (resource === 'categories') {
      return httpClient(`${apiUrl}/category/${params.id}/${userId()}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    }
    if (resource === 'order') {
      return httpClient(`${apiUrl}/order/${params.id}/status/${userId()}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    } else {
      return httpClient(`${apiUrl}/${resource}/${params.id}/${userId()}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({ data: json }));
    }
  },
  updateMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },

  create: (resource, params, options = {}) => {
    if (resource === 'products') {
      return httpClient(`${apiUrl}/product/create/${userId()}`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }));
    }
    if (resource === 'categories') {
      return httpClient(`${apiUrl}/category/create/${userId()}`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }));
    } else {
      return httpClient(`${apiUrl}/${resource}/create/${userId()}`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      }).then(({ json }) => ({
        data: { ...params.data, id: json.id },
      }));
    }
  },

  delete: (resource, params) => {
    if (resource === 'products') {
      return httpClient(`${apiUrl}/product/${params.id}/${userId()}`, {
        method: 'DELETE',
      }).then(({ json }) => ({ data: json }));
    }
    if (resource === 'categories') {
      return httpClient(`${apiUrl}/category/${params.id}/${userId()}`, {
        method: 'DELETE',
      }).then(({ json }) => ({ data: json }));
    } else {
      return httpClient(`${apiUrl}/${resource}/${params.id}/${userId()}`, {
        method: 'DELETE',
      }).then(({ json }) => ({ data: json }));
    }
  },
  deleteMany: (resource, params) => {
    const query = {
      filter: JSON.stringify({ id: params.ids }),
    };
    return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
      method: 'DELETE',
      body: JSON.stringify(params.data),
    }).then(({ json }) => ({ data: json }));
  },
};
