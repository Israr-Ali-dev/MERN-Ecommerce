import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../auth/index';
import Layout from '../core/Layout';
import validator from 'validator';

function Signup() {
  const [values, setValues] = useState({
    name: '',
    lname: '',
    email: '',
    password: '',
    error: '',
    success: false,
  });

  const { name, email, password, error, success } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();

    signup({ name, email, password }).then((response) => {
      if (response.data) {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
      if (!response.data && response.response.data.error) {
        setValues({
          ...values,
          error: response.response.data.error,
          success: false,
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
  const showSuccess = () => {
    return (
      <div
        className='success'
        style={{
          display: success ? '' : 'none',
          color: 'green',
          fontSize: '12px',
          marginBottom: '10px',
        }}>
        Account Created Successfully!
        <Link to='/signin'>
          <span style={{ fontSize: '18px' }}>Login</span>
        </Link>
      </div>
    );
  };

  const signUpFront = () => (
    <main className='main-content' id='MainContent'>
      <div className='page-width page-content'>
        <div className='grid'>
          <div className='grid__item medium-up--one-third medium-up--push-one-third'>
            <header className='section-header'>
              <h1 className='section-header__title'>Create Account</h1>
            </header>
            {showError()}
            {showSuccess()}
            <div className='form-vertical'>
              <form id='create_customer'>
                <input type='hidden' name='form_type' value='create_customer' />
                <input type='hidden' name='utf8' value='✓' />
                <label for='FirstName'>First Name</label>
                <input
                  type='text'
                  name='customer[first_name]'
                  id='FirstName'
                  className='input-full'
                  autoCapitalize='words'
                  autoFocus
                  onChange={handleChange('name')}
                  value={name}
                />
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
                    value='Create'
                    className='btn btn--full btn--no-animate'
                    onClick={clickSubmit}
                  />
                </p>
                <p>
                  <Link to='/signin'>Already Have Account!</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );

  return (
    <Fragment>
      <Layout childComponent={signUpFront()} />
    </Fragment>
  );
}

export default Signup;
