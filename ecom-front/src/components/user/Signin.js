import Axios from 'axios';
import React, { Fragment, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { signin, isAuthenticated } from '../../auth/index';
import Layout from '../core/Layout';

function Signin() {
  const [values, setValues] = useState({
    email: 'israr@gmail.com',
    password: '123456',
    error: '',
    loading: false,
    redirectReferrer: false,
  });

  const { email, password, error, loading, redirectReferrer } = values;
  const { data } = isAuthenticated();

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    signin({ email, password }).then((response) => {
      if (response.data) {
        //  Save user data to local storage
        if (typeof window !== 'undefined') {
          localStorage.setItem('jwt', JSON.stringify(response));
        }
        setValues({
          ...values,
          loading: true,
          redirectReferrer: true,
        });
      }
      if (!response.data && response.response.data.error) {
        setValues({
          ...values,
          error: response.response.data.error,
          loading: false,
        });
      }
    });
  };

  const showError = () => {
    return (
      <div
        className='error'
        style={{
          display: error ? '' : 'none',
          color: 'red',
          fontSize: '12px',
          marginBottom: '10px',
        }}>
        {error}
      </div>
    );
  };

  const showLoading = () => {
    return (
      <div
        className='loading'
        style={{
          display: loading ? '' : 'none',
          color: 'green',
          fontSize: '12px',
          marginBottom: '10px',
        }}>
        Loading...
      </div>
    );
  };

  const redirectUser = () => {
    if (redirectReferrer) {
      if (data.user && data.user.role === 1) {
        return <Redirect to='/admin/dashboard' />;
      } else {
        return <Redirect to='/user/dashboard' />;
      }
    }
  };

  const signInFront = () => {
    return (
      <main className='main-content' id='MainContent'>
        <div className='page-width page-content'>
          <div className='grid'>
            <div className='grid__item medium-up--one-third medium-up--push-one-third'>
              <header className='section-header'>
                <h1 className='section-header__title'>Login</h1>
              </header>
              {showError()}
              {showLoading()}
              {redirectUser()}
              <div className='form-vertical'>
                <span path='' id='create_customer'>
                  <label for='Email'>Email</label>
                  <input
                    type='email'
                    name='customer[email]'
                    id='Email'
                    className='input-full'
                    autoCorrect='off'
                    autoCapitalize='off'
                    onChange={handleChange('email')}
                    value={email}
                  />
                  <label for='CreatePassword'>Password</label>
                  <input
                    type='password'
                    name='customer[password]'
                    id='CreatePassword'
                    className='input-full'
                    onChange={handleChange('password')}
                    value={password}
                  />
                  <p>
                    <input
                      type='submit'
                      value='Login'
                      className='btn btn--full btn--no-animate'
                      onClick={clickSubmit}
                    />
                  </p>
                  <p>
                    <Link to='/signup' id='customer_register_link'>
                      Create account
                    </Link>
                  </p>
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  };

  return (
    <Fragment>
      <Layout childComponent={signInFront()}></Layout>
    </Fragment>
  );
}

export default Signin;
