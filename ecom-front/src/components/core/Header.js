import React, { useEffect, useState, useHistory } from 'react';
import { isAuthenticated } from '../../auth/index';
import DesktopMenu from './DesktopMenu';
import MobileMenu from './MobileMenu';
import Search from './Search';
import { Link } from 'react-router-dom';
import { itemTotal, getCart, updateItem, removeItem } from './cartHelper';

function Header() {
  // let history = useHistory();
  const [terms, setTerms] = useState(false);
  const [items, setItems] = useState([]);
  const [openCart, setopenCart] = useState(false);
  const [updateCart, setUpdateCart] = useState('');
  const [toggleMobileMenu, settoggleMobileMenu] = useState(false);

  const increament = (product_id, pCount) => {
    let newCount = pCount + 1;

    if (newCount >= 0) {
      updateItem(product_id, newCount);
      setItems(getCart());
    }
  };

  const decrement = (product_id, pCount) => {
    let newCount = pCount - 1;

    if (newCount >= 0) {
      updateItem(product_id, newCount);
      setItems(getCart());
    } else {
      updateItem(product_id, 1);
      setItems(getCart());
    }
  };

  const handleOpenCart = () => {
    if (!openCart) {
      document.documentElement.classList.add('js-drawer-open');
      document.body.classList.add('js-drawer-open');
      setopenCart(true);
    }
  };

  const handleCloseCart = () => {
    if (openCart) {
      document.documentElement.classList.remove('js-drawer-open');
      document.body.classList.remove('js-drawer-open');
      setopenCart(false);
    }
  };

  const handleMobileOpenMenu = () => {
    if (!toggleMobileMenu) {
      document.documentElement.classList.add('js-drawer-open');
      document.body.classList.add('js-drawer-open');
      settoggleMobileMenu(true);
    }
  };

  const handleCloseMobileMenu = () => {
    if (toggleMobileMenu) {
      document.documentElement.classList.remove('js-drawer-open');
      document.body.classList.remove('js-drawer-open');
      settoggleMobileMenu(false);
    }
  };

  const handleRemoveCartItem = (pId) => {
    let updatedCart = removeItem(pId);
    if (updatedCart) {
      setItems(updatedCart);
    }
  };

  useEffect(() => {
    setItems(getCart());
  }, [itemTotal()]);

  return (
    <React.Fragment>
      {/*  <!-- Header Begin --> */}
      <div id='themobilecase-section-header' className='themobilecase-section'>
        {/* <!-- Mobile Menu Begin --> */}
        <MobileMenu
          toggleMenu={toggleMobileMenu}
          closeMenu={handleCloseMobileMenu}
        />
        {/* <!-- Mobile Menu End --> */}

        {/*   <!-- Side Cart Begin --> */}
        <div
          id='CartDrawer'
          className={
            openCart
              ? 'drawer drawer--right drawer--is-open'
              : 'drawer drawer--right'
          }
          tabIndex={openCart ? '-1' : null}>
          <div className='drawer__contents'>
            <div className='drawer__fixed-header'>
              <div className='drawer__header appear-animation appear-delay-1'>
                <div className='drawer__title'>Cart</div>
                <div className='drawer__close'>
                  <button
                    type='button'
                    className='drawer__close-button js-drawer-close'
                    onClick={handleCloseCart}>
                    <svg
                      aria-hidden='true'
                      focusable='false'
                      role='presentation'
                      className='icon icon-close'
                      viewBox='0 0 64 64'>
                      <path d='M19 17.61l27.12 27.13m0-27.12L19 44.74' />
                    </svg>
                    <span className='icon__fallback-text'>Close cart</span>
                  </button>
                </div>
              </div>
            </div>
            <div id='CartContainer' className='drawer__inner'>
              <div className='drawer__scrollable'>
                {items.map((product, i) => {
                  return (
                    <div
                      key={i}
                      className='ajaxcart__product appear-animation appear-delay-3'>
                      <button
                        class='sideCart-remove'
                        onClick={() => {
                          handleRemoveCartItem(product.id);
                        }}>
                        <svg width='9' viewBox='0 0 10 10'>
                          <path
                            d='M9.677 8.118a1.102 1.102 0 11-1.559 1.56L5 6.558 1.882 9.677a1.102 1.102 0 11-1.56-1.559L3.442 5 .323 1.882A1.102 1.102 0 111.882.322L5 3.442 8.118.323a1.102 1.102 0 111.56 1.559L6.558 5l3.118 3.118z'
                            fill='#cacaca'
                            fill-rule='nonzero'></path>
                        </svg>
                      </button>
                      <div className='ajaxcart__row'>
                        <div className='grid'>
                          <div className='grid__item one-third'>
                            <span className='ajaxcart__product-image'>
                              <img
                                src={product.photo.data}
                                alt='classNameic Green Camo Solid Monogram iPhone Case'
                              />
                            </span>
                          </div>
                          <div className='grid__item two-thirds'>
                            <div className='ajaxcart__product-name--wrapper'>
                              <span className='ajaxcart__product-name'>
                                {product.name}
                              </span>
                              {/* <span className='ajaxcart__product-meta'>
                                iPhone 12 Mini / Impact Case
                              </span> */}
                            </div>
                            <div className='grid grid--full display-table'>
                              <div className='grid__item display-table-cell one-half'>
                                <label
                                  htmlFor='updates_33170093441077:aee3a0e157eb19386ac9272d9139eb4b'
                                  className='visually-hidden'>
                                  Quantity
                                </label>
                                <div className='js-qty__wrapper'>
                                  <input
                                    type='text'
                                    id='updates_33170093441077:aee3a0e157eb19386ac9272d9139eb4b'
                                    className='js-qty__num'
                                    defaultValue='1'
                                    data-id='33170093441077:aee3a0e157eb19386ac9272d9139eb4b'
                                    min='0'
                                    value={product.count}
                                    aria-label='quantity'
                                    pattern='[0-9]*'
                                    name='updates[]'
                                  />
                                  <button
                                    onClick={() => {
                                      decrement(product._id, product.count);
                                    }}
                                    type='button'
                                    className='js-qty__adjust js-qty__adjust--minus'
                                    aria-label='Reduce item quantity by one'>
                                    <svg
                                      aria-hidden='true'
                                      focusable='false'
                                      role='presentation'
                                      className='icon icon-minus'
                                      viewBox='0 0 20 20'>
                                      <path
                                        fill='#444'
                                        d='M17.543 11.029H2.1A1.032 1.032 0 0 1 1.071 10c0-.566.463-1.029 1.029-1.029h15.443c.566 0 1.029.463 1.029 1.029 0 .566-.463 1.029-1.029 1.029z'></path>
                                    </svg>
                                    <span
                                      className='icon__fallback-text'
                                      aria-hidden='true'>
                                      −
                                    </span>
                                  </button>
                                  <button
                                    type='button'
                                    onClick={() => {
                                      increament(product._id, product.count);
                                    }}
                                    className='js-qty__adjust js-qty__adjust--plus'
                                    aria-label='Increase item quantity by one'>
                                    <svg
                                      aria-hidden='true'
                                      focusable='false'
                                      role='presentation'
                                      className='icon icon-plus'
                                      viewBox='0 0 20 20'>
                                      <path
                                        fill='#444'
                                        d='M17.409 8.929h-6.695V2.258c0-.566-.506-1.029-1.071-1.029s-1.071.463-1.071 1.029v6.671H1.967C1.401 8.929.938 9.435.938 10s.463 1.071 1.029 1.071h6.605V17.7c0 .566.506 1.029 1.071 1.029s1.071-.463 1.071-1.029v-6.629h6.695c.566 0 1.029-.506 1.029-1.071s-.463-1.071-1.029-1.071z'></path>
                                    </svg>
                                    <span
                                      className='icon__fallback-text'
                                      aria-hidden='true'>
                                      +
                                    </span>
                                  </button>
                                </div>
                              </div>
                              <div className='grid__item display-table-cell one-half text-right'>
                                <span className='ajaxcart__price'>
                                  <span className='money'>
                                    $ {product.price * product.count}
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className='grid grid--full'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className='drawer__footer appear-animation appear-delay-7'>
                <div className='grid grid--full'>
                  <div className='grid__item one-half'>
                    <p className='ajaxcart__subtotal'>Subtotal</p>
                  </div>
                  <div className='grid__item one-half text-right'>
                    <p className='ajaxcart__price'>
                      <span className='money'>
                        $
                        {items
                          ? items.reduce((current, product) => {
                              return current + product.count * product.price;
                            }, 0)
                          : null}
                      </span>
                    </p>
                  </div>
                </div>
                <p className='ajaxcart__note'>Free Worldwide Shipping.</p>
                {/* <img
                  src='../assets/img/gPay.png'
                  alt='google-pay'
                  className='responsive'
                />
                <img
                  src='../assets/img/psyPal.png'
                  alt='paypal'
                  className='responsive'
                />
                <img
                  src='../assets/img/shopPay.png'
                  alt='shopPay'
                  className='responsive'
                /> */}
                {itemTotal() !== 0 ? (
                  <Link
                    to='/checkout'
                    onClick={handleCloseCart}
                    className='btn btn--full'>
                    <span style={{ color: '#f2a365' }}>Checkout</span>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        {/*  <!-- Side Cart End --> */}
        <div data-section-id='header' data-section-type='header-section'>
          <div className='header-wrapper'>
            <div className='announcement'>
              <span className='announcement__link'>
                <span
                  className='announcement__text announcement__text--open'
                  data-text='new-iphone-12-cases-are-here-free-shipping-worldwide'>
                  New iPhone 12 Cases are Here! - Free Shipping Worldwide
                </span>
              </span>
            </div>
            <header
              className='site-header'
              data-sticky='true'
              data-overlay='false'>
              <div className='page-width'>
                <div
                  className='header-layout header-layout--center'
                  data-logo-align='center'>
                  <div className='header-item header-item--mNav'>
                    <div className='site-nav large-up--hide'>
                      <button
                        type='button'
                        className='site-nav__link site-nav__link--icon js-drawer-open-nav link-hover'
                        aria-controls='NavDrawer'
                        onClick={handleMobileOpenMenu}>
                        <svg
                          aria-hidden='true'
                          focusable='false'
                          role='presentation'
                          className='icon icon-hamburger'
                          viewBox='0 0 64 64'>
                          <path
                            className='svg-stroke'
                            d='M7 15h51M7 32h43M7 49h51'
                          />
                        </svg>
                        <span className='icon__fallback-text'>
                          Site navigation
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className='header-item header-item--logo'>
                    <h1
                      className='site-header__logo'
                      itemScope
                      itemType='http://schema.org/Organization'>
                      <span className='visually-hidden'>theMobileCase</span>
                      <Link
                        to='/'
                        itemProp='url'
                        className='site-header__logo-link'>
                        <img
                          className='small--hide'
                          src='../assets/img/new/logo.png'
                          alt='Case Warehouse'
                          itemProp='logo'
                        />
                        <img
                          className='medium-up--hide'
                          src='../assets/img/new/logo.png'
                          alt='Case Warehouse'
                        />
                      </Link>
                    </h1>
                  </div>
                  <div className='header-item header-item--left header-item--navigation'>
                    <Search />
                  </div>
                  <div className='header-item header-item--icons'>
                    <div className='site-nav site-nav--icons'>
                      <div className='site-nav__icons'>
                        {!isAuthenticated() && (
                          <Link
                            className='site-nav__link site-nav__link--icon link-hover'
                            to='/signin'>
                            <svg
                              aria-hidden='true'
                              focusable='false'
                              role='presentation'
                              className='icon icon-user'
                              viewBox='0 0 64 64'>
                              <path
                                className='svg-stroke'
                                d='M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16z'
                              />
                            </svg>
                            <span className='icon__fallback-text'>Log in</span>
                          </Link>
                        )}
                        {isAuthenticated() && (
                          <Link to='/user/dashboard' style={{ color: '#fff' }}>
                            Dashboard
                          </Link>
                        )}
                        {/* <a
                          className='site-nav__link site-nav__link--icon medium-down--hide'
                          href='login.php'>
                          <svg
                            aria-hidden='true'
                            focusable='false'
                            role='presentation'
                            className='icon icon-user'
                            viewBox='0 0 64 64'>
                            <path d='M35 39.84v-2.53c3.3-1.91 6-6.66 6-11.41 0-7.63 0-13.82-9-13.82s-9 6.19-9 13.82c0 4.75 2.7 9.51 6 11.41v2.53c-10.18.85-18 6-18 12.16h42c0-6.19-7.82-11.31-18-12.16z' />
                          </svg>
                          <span className='icon__fallback-text'>Log in</span>
                        </a>
                        <a className='site-nav__link site-nav__link--icon medium-down--hide'>
                          <span
                            onClick={() => {
                              signout(() => {
                                history.push('/');
                              });
                            }}
                            className='mobile-nav__link'>
                            Signout
                          </span>
                        </a> */}
                        {/* <a
                          href='search.php'
                          className='site-nav__link site-nav__link--icon js-search-header js-no-transition large-up--hide link-hover'>
                          <svg
                            aria-hidden='true'
                            focusable='false'
                            role='presentation'
                            className='icon icon-search'
                            viewBox='0 0 64 64'>
                            <path
                              className='svg-stroke'
                              d='M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42'
                            />
                          </svg>
                          <span className='icon__fallback-text'>Search</span>
                        </a> */}
                        <span
                          className='site-nav__link site-nav__link--icon js-drawer-open-cart js-no-transition link-hover'
                          aria-controls='CartDrawer'
                          data-icon='bag'
                          onClick={handleOpenCart}>
                          <span className='cart-link'>
                            <svg
                              aria-hidden='true'
                              focusable='false'
                              role='presentation'
                              className='icon icon-bag'
                              viewBox='0 0 64 64'>
                              <g fill='none' stroke='#000' strokeWidth='2'>
                                <path
                                  className='svg-stroke'
                                  d='M25 26c0-15.79 3.57-20 8-20s8 4.21 8 20'
                                />
                                <path
                                  className='svg-stroke'
                                  d='M14.74 18h36.51l3.59 36.73h-43.7z'
                                />
                              </g>
                            </svg>
                            <span className='icon__fallback-text'>Cart</span>
                            {itemTotal() === 0 ? (
                              <span className='cart-link__bubble'></span>
                            ) : (
                              <span className='cart-link__bubble cart-link__bubble--visible'></span>
                            )}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Desktop Menu Begin */}
                <DesktopMenu />
                {/* Desktop Menu End */}
              </div>
              {/*   <!-- Search Pop Begin --> */}

              {/*   <!-- Search Pop End --> */}
            </header>
          </div>
        </div>
      </div>
      {/* <!-- Header End --> */}
    </React.Fragment>
  );
}

export default Header;
