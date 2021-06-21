import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated, signout, updateUser } from '../../auth/index';
import { orderList } from '../user/apiCore';
import { Link } from 'react-router-dom';

function Dashboard() {
  const history = useHistory();
  const userId = isAuthenticated() && isAuthenticated().data.user._id;
  const token = isAuthenticated() && isAuthenticated().data.token;

  const [ordersList, setOrdersList] = useState([]);
  const [error, setError] = useState('');
  const [productList, setproductList] = useState('');
  const [editUser, seteditUser] = useState(false);
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    success: false,
  });

  const { name, email, password, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const loadOrders = () => {
    orderList(userId, token).then((data) => {
      if (data.error) {
        setError(data);
      } else {
        setOrdersList(data);
      }
    });
  };

  const clickUpdateUser = (event) => {
    event.preventDefault();

    if (name || email || password) {
      updateUser(userId, { name, email, password }, token).then((response) => {
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
          setError(response.response.data.error);
          setValues({
            ...values,
            success: false,
          });
        }
      });
    } else {
      setError('Please Fill Any Field');
      setValues({
        success: false,
      });
    }
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
        User Update Successfully!
      </div>
    );
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const orderDetail = () => {
    return (
      <Fragment>
        {/* Order Detail */}
        <div
          className='obscure'
          style={productList ? { display: 'block' } : null}>
          <div
            className={
              productList ? 'popup animationOpen' : 'popup animationClose'
            }>
            <div style={{ overflowX: 'auto' }}>
              <h3 className='fl'>Products List</h3>
              <table>
                <tr>
                  <th>Sr #</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Image</th>
                  <th>Qty</th>
                </tr>
                {ordersList.map((orders) => {
                  if (orders.id === productList) {
                    return (
                      <Fragment>
                        {orders.products.map((p) => {
                          return (
                            <Fragment>
                              <tr key={p.id}>
                                <td>1</td>
                                <td>{p.name}</td>
                                <td>${p.price}</td>
                                <td>
                                  <img
                                    src='/assets/img/t.png'
                                    alt='pro'
                                    width='50'
                                  />
                                </td>
                                <td>{p.count}</td>
                              </tr>
                            </Fragment>
                          );
                        })}
                      </Fragment>
                    );
                  }
                })}
              </table>
            </div>
            <button
              className='closeOrderDetail'
              onClick={() => {
                setproductList('');
              }}>
              X
            </button>
          </div>
        </div>
      </Fragment>
    );
  };

  const profileDetail = () => {
    const {
      data: {
        user: { _id, name, email, role },
      },
    } = isAuthenticated();
    return (
      <Fragment>
        <div className='grid__item medium-up--one-quarter'>
          <h3>Account details</h3>

          <div className='profile-container'>
            <span className={editUser ? null : 'is-readonly'}>
              <div className='form-group'>
                <label>Name</label>
                <input
                  type='text'
                  className={
                    editUser ? 'form-control' : 'form-control is-disabled'
                  }
                  placeholder={name}
                  onChange={handleChange('name')}
                  disabled={editUser ? null : true}
                />
              </div>
              <div className='form-group'>
                <label>Password</label>
                <input
                  type='password'
                  className={
                    editUser ? 'form-control' : 'form-control is-disabled'
                  }
                  placeholder='Password'
                  disabled={editUser ? '' : 'disabled'}
                  onChange={handleChange('password')}
                />
              </div>
              <div className='form-group'>
                <label for='exampleInputEmail1'>Email</label>
                <input
                  type='email'
                  className='form-control is-disabled'
                  id='exampleInputEmail1'
                  placeholder={email}
                  disabled={editUser ? '' : 'disabled'}
                  onChange={handleChange('email')}
                />
              </div>
              {editUser ? (
                <button
                  type='button'
                  onClick={clickUpdateUser}
                  className='btn btn-default btn-save js-save'>
                  Save
                </button>
              ) : (
                <button
                  type='button'
                  className='btn btn-default btn-edit js-edit'
                  onClick={() => {
                    seteditUser(true);
                  }}>
                  Edit
                </button>
              )}
            </span>
          </div>
          {showError()}
          {showSuccess()}
        </div>
      </Fragment>
    );
  };

  const orderHistory = () => {
    return (
      <Fragment>
        <div className='grid__item medium-up--three-quarters'>
          <h2 className='h3'>Order History</h2>
          {ordersList ? (
            <div className='cus-scroll' style={{ overflowX: 'auto' }}>
              <table className='order-detailTable'>
                <tr>
                  <th>Order #</th>
                  <th>Product List</th>
                  <th>Total Price</th>
                  <th>Status</th>
                  <th>Order Date</th>
                  <th>Shipping Date</th>
                  <th>Shipping Method</th>
                  <th>Payment Method</th>
                </tr>
                {ordersList.map((order) => {
                  return (
                    <Fragment>
                      <tr key={order.id}>
                        <td>1</td>
                        <td>
                          <span
                            className='order-detail'
                            onClick={() => {
                              setproductList(order.id);
                            }}>
                            View
                          </span>
                        </td>
                        <td>${order.amount}</td>
                        <td>{order.status}</td>
                        <td>{order.createdAt}</td>
                        <td>{order.createdAt}</td>
                        <td>DHL</td>
                        <td>PayPal</td>
                      </tr>
                    </Fragment>
                  );
                })}
              </table>
            </div>
          ) : (
            <p>You haven't placed any orders yet.</p>
          )}
        </div>
      </Fragment>
    );
  };

  const accountDashboard = () => {
    return (
      <Fragment>
        {/* Main Content Begin */}
        <main className='main-content' id='MainContent'>
          <div className='page-width page-content customers'>
            <header className='section-header'>
              <h1 className='section-header__title'>My account</h1>
              <br />
              <span
                id='customer_logout_link'
                onClick={() => {
                  signout(() => {
                    history.push('/');
                  });
                }}>
                Log out
              </span>
            </header>

            <div className='grid'>
              {orderHistory()}
              {profileDetail()}
            </div>
          </div>
        </main>

        {/* Main Content End */}
        {orderDetail()}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Layout childComponent={accountDashboard()}></Layout>
    </Fragment>
  );
}

export default Dashboard;
