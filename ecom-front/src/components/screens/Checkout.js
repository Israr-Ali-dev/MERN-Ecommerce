import React, { Fragment, useState, useEffect } from 'react';
import {
  getBraintreeClientToken,
  processPayment,
  createOrder,
} from '../user/apiCore';
import { emptyCart, getCart, itemTotal } from '../core/cartHelper';
import { isAuthenticated } from '../../auth/index';
import { Link, Redirect } from 'react-router-dom';

import DropIn from 'braintree-web-drop-in-react';

function Checkout() {
  const [items, setItems] = useState([]);

  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });

  const { success, error } = data;

  const userId = isAuthenticated() && isAuthenticated().data.user._id;
  const token = isAuthenticated() && isAuthenticated().data.token;

  const getToken = (userId, token) => {
    getBraintreeClientToken(userId, token).then((data) => {
      if (data.error) {
        console.log(data.error);
        setData({ ...data, error: data.error });
      } else {
        console.log(data);
        setData({ clientToken: data.clientToken });
      }
    });
  };

  useEffect(() => {
    //An array of assets
    let links = [
      {
        href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css',
      },
    ];
    //Append the script element on each iteration
    links.map((item) => {
      const link = document.createElement('link');
      link.href = item.href;
      link.rel = 'stylesheet';
      document.head.append(link);
    });
  }, []);

  useEffect(() => {
    setItems(getCart());
    getToken(userId, token);
  }, []);

  const handleAddress = (event) => {
    setData({ ...data, address: event.target.value });
  };

  const getTotal = () => {
    return items.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };

  const showCheckout = () => {
    return isAuthenticated() ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to='/signin'>
        <button className='btn btn-primary'>Sign in to checkout</button>
      </Link>
    );
  };

  let deliveryAddress = data.address;

  const buy = () => {
    setData({ loading: true });
    // send the nonce to your server
    // nonce = data.instance.requestPaymentMethod()
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        // console.log(data);
        nonce = data.nonce;
        // once you have nonce (card type, card number) send nonce as 'paymentMethodNonce'
        // and also total to be charged
        // console.log(
        //     "send nonce and total to process: ",
        //     nonce,
        //     getTotal(products)
        // );
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(items),
        };

        processPayment(userId, token, paymentData)
          .then((response) => {
            console.log(response);
            // empty cart
            // create order

            const createOrderData = {
              products: items,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
              address: deliveryAddress,
            };

            createOrder(userId, token, createOrderData)
              .then((response) => {
                emptyCart(() => {
                  // setRun(!run); // run useEffect in parent Cart
                  console.log('payment success and empty cart');
                  setData({
                    loading: false,
                    success: true,
                  });
                });
              })
              .catch((error) => {
                console.log(error);
                setData({ loading: false });
              });
          })
          .catch((error) => {
            console.log(error);
            setData({ loading: false });
          });
      })
      .catch((error) => {
        // console.log("dropin error: ", error);
        setData({ ...data, error: error.message });
      });
  };

  const showDropIn = () => (
    <div onBlur={() => setData({ ...data, error: '' })}>
      {data.clientToken !== null && items.length > 0 ? (
        <div>
          <div className='gorm-group mb-3'>
            <label className='text-muted'>Delivery address:</label>
            <textarea
              onChange={handleAddress}
              className='form-control'
              value={data.address}
              placeholder='Type your delivery address here...'
            />
          </div>

          <DropIn
            options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault',
              },
            }}
            onInstance={(instance) => (data.instance = instance)}
          />
          <button onClick={buy} className='btn btn-success btn-block'>
            Pay
          </button>
        </div>
      ) : null}
    </div>
  );

  const showError = () => (
    <div
      className='alert alert-danger'
      style={{ display: error ? 'block' : 'none' }}>
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className='alert alert-info'
      style={{ display: success ? 'block' : 'none' }}>
      Thanks! Your payment was successful!
      {setTimeout(() => {
        return <Redirect to='/' />;
      }, 1000)}
    </div>
  );

  const showLoading = (loading) =>
    loading && <h2 className='text-danger'>Loading...</h2>;

  const cartList = () => {
    return (
      <Fragment>
        <div className='col-md-5 col-lg-4 order-md-last'>
          <h6 className='d-flex justify-content-between align-items-center mb-3'>
            <span className='text-muted'>Your cart</span>
            <span className='badge bg-secondary rounded-pill'>3</span>
          </h6>
          <ul className='list-group mb-3'>
            {items.map((product, i) => {
              return (
                <Fragment>
                  <li
                    key={i}
                    className='list-group-item d-flex justify-content-between lh-sm'>
                    <div>
                      <span className='my-0 p-title'>Product name</span>
                      <small className='text-muted'>{product.name}</small>
                    </div>
                    <span className='text-muted'>${product.price}</span>
                  </li>
                </Fragment>
              );
            })}
            <li className='list-group-item d-flex justify-content-between'>
              <span>Total (USD)</span>
              <strong>$ {itemTotal() ? itemTotal() : 0}</strong>
            </li>
          </ul>
        </div>
      </Fragment>
    );
  };

  const billingAddress = () => {
    return (
      <Fragment>
        <h6 className='mb-3'>Billing address</h6>
        <div className='row g-3'>
          <div className='col-sm-6'>
            <label for='firstName' className='form-label'>
              First name
            </label>
            <input
              type='text'
              className='form-control'
              id='firstName'
              placeholder=''
              value=''
              required=''
            />
            <div className='invalid-feedback'>
              Valid first name is required.
            </div>
          </div>

          <div className='col-sm-6'>
            <label for='lastName' className='form-label'>
              Last name
            </label>
            <input
              type='text'
              className='form-control'
              id='lastName'
              placeholder=''
              value=''
              required=''
            />
            <div className='invalid-feedback'>Valid last name is required.</div>
          </div>

          <div className='col-12'>
            <label for='username' className='form-label'>
              Username
            </label>
            <div className='input-group'>
              <span className='input-group-text'>@</span>
              <input
                type='text'
                className='form-control'
                id='username'
                placeholder='Username'
                required=''
              />
              <div className='invalid-feedback'>Your username is required.</div>
            </div>
          </div>

          <div className='col-12'>
            <label for='email' className='form-label'>
              Email <span className='text-muted'>(Optional)</span>
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='you@example.com'
            />
            <div className='invalid-feedback'>
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className='col-12'>
            <label for='address' className='form-label'>
              Address
            </label>
            <input
              type='text'
              className='form-control'
              id='address'
              placeholder='1234 Main St'
              required=''
            />
            <div className='invalid-feedback'>
              Please enter your shipping address.
            </div>
          </div>

          <div className='col-12'>
            <label for='address2' className='form-label'>
              Address 2 <span className='text-muted'>(Optional)</span>
            </label>
            <input
              type='text'
              className='form-control'
              id='address2'
              placeholder='Apartment or suite'
            />
          </div>

          <div className='col-md-5'>
            <label for='country' className='form-label'>
              Country
            </label>
            <select className='form-select' id='country' required=''>
              <option value=''>Choose...</option>
              <option>United States</option>
            </select>
            <div className='invalid-feedback'>
              Please select a valid country.
            </div>
          </div>

          <div className='col-md-4'>
            <label for='state' className='form-label'>
              State
            </label>
            <select className='form-select' id='state' required=''>
              <option value=''>Choose...</option>
              <option>California</option>
            </select>
            <div className='invalid-feedback'>
              Please provide a valid state.
            </div>
          </div>

          <div className='col-md-3'>
            <label for='zip' className='form-label'>
              Zip
            </label>
            <input
              type='text'
              className='form-control'
              id='zip'
              placeholder=''
              required=''
            />
            <div className='invalid-feedback'>Zip code required.</div>
          </div>
        </div>

        <hr className='my-4' />

        <div className='form-check'>
          <input
            type='checkbox'
            className='form-check-input'
            id='same-address'
          />
          <label className='form-check-label' for='same-address'>
            Shipping address is the same as my billing address
          </label>
        </div>

        <div className='form-check'>
          <input type='checkbox' className='form-check-input' id='save-info' />
          <label className='form-check-label' for='save-info'>
            Save this information for next time
          </label>
        </div>
      </Fragment>
    );
  };

  const shippingAddress = () => {
    return (
      <Fragment>
        <h6 className='mb-3'>Shipping address</h6>
        <div className='row g-3'>
          <div className='col-sm-6'>
            <label for='firstName' className='form-label'>
              First name
            </label>
            <input
              type='text'
              className='form-control'
              id='firstName'
              placeholder=''
              value=''
              required=''
            />
            <div className='invalid-feedback'>
              Valid first name is required.
            </div>
          </div>

          <div className='col-sm-6'>
            <label for='lastName' className='form-label'>
              Last name
            </label>
            <input
              type='text'
              className='form-control'
              id='lastName'
              placeholder=''
              value=''
              required=''
            />
            <div className='invalid-feedback'>Valid last name is required.</div>
          </div>

          <div className='col-12'>
            <label for='username' className='form-label'>
              Username
            </label>
            <div className='input-group'>
              <span className='input-group-text'>@</span>
              <input
                type='text'
                className='form-control'
                id='username'
                placeholder='Username'
                required=''
              />
              <div className='invalid-feedback'>Your username is required.</div>
            </div>
          </div>

          <div className='col-12'>
            <label for='email' className='form-label'>
              Email <span className='text-muted'>(Optional)</span>
            </label>
            <input
              type='email'
              className='form-control'
              id='email'
              placeholder='you@example.com'
            />
            <div className='invalid-feedback'>
              Please enter a valid email address for shipping updates.
            </div>
          </div>

          <div className='col-12'>
            <label for='address' className='form-label'>
              Address
            </label>
            <input
              type='text'
              className='form-control'
              id='address'
              placeholder='1234 Main St'
              required=''
            />
            <div className='invalid-feedback'>
              Please enter your shipping address.
            </div>
          </div>

          <div className='col-12'>
            <label for='address2' className='form-label'>
              Address 2 <span className='text-muted'>(Optional)</span>
            </label>
            <input
              type='text'
              className='form-control'
              id='address2'
              placeholder='Apartment or suite'
            />
          </div>

          <div className='col-md-5'>
            <label for='country' className='form-label'>
              Country
            </label>
            <select className='form-select' id='country' required=''>
              <option value=''>Choose...</option>
              <option>United States</option>
            </select>
            <div className='invalid-feedback'>
              Please select a valid country.
            </div>
          </div>

          <div className='col-md-4'>
            <label for='state' className='form-label'>
              State
            </label>
            <select className='form-select' id='state' required=''>
              <option value=''>Choose...</option>
              <option>California</option>
            </select>
            <div className='invalid-feedback'>
              Please provide a valid state.
            </div>
          </div>

          <div className='col-md-3'>
            <label for='zip' className='form-label'>
              Zip
            </label>
            <input
              type='text'
              className='form-control'
              id='zip'
              placeholder=''
              required=''
            />
            <div className='invalid-feedback'>Zip code required.</div>
          </div>
        </div>
      </Fragment>
    );
  };

  const shippingMethod = () => {
    return (
      <Fragment>
        <h6 className='mb-3'>Shipping Method</h6>
        <div className='shipping-method'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='flexRadioDefault'
              id='flexRadioDefault1'
            />
            <label className='form-check-label' for='flexRadioDefault1'>
              DHL
            </label>
            <label
              className='form-check-label float-end'
              for='flexRadioDefault1'>
              <b>$ 10.00</b>
            </label>
          </div>
        </div>
        <div className='shipping-method'>
          <div className='form-check'>
            <input
              className='form-check-input'
              type='radio'
              name='flexRadioDefault'
              id='flexRadioDefault2'
              checked=''
            />
            <label className='form-check-label' for='flexRadioDefault2'>
              TCS
            </label>
            <label
              className='form-check-label float-end'
              for='flexRadioDefault1'>
              <b>$ 20.00</b>
            </label>
          </div>
        </div>
      </Fragment>
    );
  };

  const payemntMethod = () => {
    return (
      <Fragment>
        <h6 className='mb-3'>Payment</h6>

        <div className='my-3'>
          <div className='form-check'>
            <input
              id='credit'
              name='paymentMethod'
              type='radio'
              className='form-check-input'
              checked=''
              required=''
            />
            <label className='form-check-label' for='credit'>
              Credit card
            </label>
          </div>
          <div className='form-check'>
            <input
              id='debit'
              name='paymentMethod'
              type='radio'
              className='form-check-input'
              required=''
            />
            <label className='form-check-label' for='debit'>
              Debit card
            </label>
          </div>
          <div className='form-check'>
            <input
              id='paypal'
              name='paymentMethod'
              type='radio'
              className='form-check-input'
              required=''
            />
            <label className='form-check-label' for='paypal'>
              PayPal
            </label>
          </div>
        </div>

        <div className='row gy-3'>
          <div className='col-md-6'>
            <label for='cc-name' className='form-label'>
              Name on card
            </label>
            <input
              type='text'
              className='form-control'
              id='cc-name'
              placeholder=''
              required=''
            />
            <small className='text-muted'>Full name as displayed on card</small>
            <div className='invalid-feedback'>Name on card is required</div>
          </div>

          <div className='col-md-6'>
            <label for='cc-number' className='form-label'>
              Credit card number
            </label>
            <input
              type='text'
              className='form-control'
              id='cc-number'
              placeholder=''
              required=''
            />
            <div className='invalid-feedback'>
              Credit card number is required
            </div>
          </div>

          <div className='col-md-3'>
            <label for='cc-expiration' className='form-label'>
              Expiration
            </label>
            <input
              type='text'
              className='form-control'
              id='cc-expiration'
              placeholder=''
              required=''
            />
            <div className='invalid-feedback'>Expiration date required</div>
          </div>

          <div className='col-md-3'>
            <label for='cc-cvv' className='form-label'>
              CVV
            </label>
            <input
              type='text'
              className='form-control'
              id='cc-cvv'
              placeholder=''
              required=''
            />
            <div className='invalid-feedback'>Security code required</div>
          </div>
        </div>
      </Fragment>
    );
  };

  return (
    <Fragment>
      <div className='container checkout-container'>
        <main>
          <div className='py-5 text-center'>
            <Link to='/'>
              <img
                className='d-block mx-auto mb-4'
                src='../assets/img/TMC/logo.png'
                alt=''
              />
            </Link>
            <h2>Checkout</h2>
          </div>

          <div className='row g-3'>
            {cartList()}
            <div className='col-md-7 col-lg-8'>
              {/* {billingAddress()} */}
              <hr className='my-4' />
              {/* {shippingAddress()} */}
              <hr className='my-4' />
              {shippingMethod()}
              <hr className='my-4' />
              {/* {payemntMethod()} */}
              {getTotal()}
              {showCheckout()}
              <hr className='my-4' />
              {showSuccess()}
              {showError()}
              {/*
              <button className='w-100 btn btn-primary btn-lg' type='submit'>
                Continue to checkout
              </button> */}
            </div>
          </div>
        </main>

        <footer className='my-5 pt-5 text-muted text-center text-small'>
          <p className='mb-1'>© 2021 theMobileCover</p>
          <ul className='list-inline'>
            <li className='list-inline-item'>
              <a href='privacy.html'>Privacy Policy</a>
            </li>
            <li className='list-inline-item'>
              <a href='term-condition.html'>Terms &amp; Conditions</a>
            </li>
            <li className='list-inline-item'>
              <a href='refund-policy.html'>Refund Policy</a>
            </li>
          </ul>
        </footer>
      </div>
    </Fragment>
  );
}
export default Checkout;
