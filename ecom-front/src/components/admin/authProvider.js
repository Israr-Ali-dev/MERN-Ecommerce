// import { signin, isAuthenticated } from '../../auth/index';

export default {
  // called when the user attempts to log in
  login: ({ username, password }) => {
    //localStorage.setItem('username', username);
    let email = username;
    const request = new Request('http://localhost:8000/api/signin', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    });
    return fetch(request)
      .then((response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((auth) => {
        localStorage.setItem('username', JSON.stringify(auth));
      })
      .catch(() => {
        throw new Error('Network error');
      });
    // accept all username/password combinations
    //return Promise.resolve();
  },
  // called when the user clicks on the logout button
  logout: () => {
    localStorage.removeItem('username');
    return Promise.resolve();
  },
  // called when the API returns an error
  checkError: ({ status }) => {
    if (status === 401 || status === 403) {
      localStorage.removeItem('username');
      return Promise.reject();
    }
    return Promise.resolve();
  },
  // called when the user navigates to a new location, to check for authentication
  checkAuth: () => {
    return localStorage.getItem('username')
      ? Promise.resolve()
      : Promise.reject();
  },
  // called when the user navigates to a new location, to check for permissions / roles
  getPermissions: () => Promise.resolve(),
};
