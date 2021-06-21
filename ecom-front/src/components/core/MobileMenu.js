import React, { Fragment, useState, useEffect } from 'react';
import { getCategories, getSubCategories } from '../user/apiCore';
import { Link, Redirect } from 'react-router-dom';

export default function DesktopMenu(props) {
  const [catList, setCategories] = useState([]);
  const [subCatList, setSubCategories] = useState([]);
  const [error, setError] = useState(false);
  const [catRef, setCatRef] = useState('');
  const [subCatRef, setSubCatRef] = useState('');

  const loadCategoryList = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data.data);
      }
    });
  };

  const loadSubCategoryList = () => {
    getSubCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSubCategories(data.data);
      }
    });
  };

  useEffect(() => {
    loadCategoryList();
    loadSubCategoryList();
  }, []);

  const redirectCatPage = () => {
    if (catRef) {
      props.closeMenu();
      return (
        <Redirect
          to={{
            pathname: '/shop',
            state: { cQuery: catRef },
          }}
        />
      );
    }
    if (subCatRef) {
      props.closeMenu();
      return (
        <Redirect
          to={{
            pathname: '/shop',
            state: { scQuery: subCatRef },
          }}
        />
      );
    }
  };

  const showCategories = catList.map((category) => {
    return (
      <Fragment>
        {redirectCatPage()}
        {category.subcategory === true ? (
          <li
            key={category._id}
            className='mobile-nav__item appear-animation appear-delay-2'>
            <div className='mobile-nav__has-sublist'>
              <button
                type='button'
                className='mobile-nav__link--button collapsible-trigger collapsible--auto-height'
                aria-controls='Linklist-1'
                onClick={(e) => {
                  e.preventDefault();
                  setCatRef(category._id);
                }}>
                <span className='mobile-nav__faux-link'>{category.name}</span>
                <div className='mobile-nav__toggle'>
                  <span>
                    <span
                      className='collapsible-trigger__icon collapsible-trigger__icon--open'
                      role='presentation'>
                      <svg
                        aria-hidden='true'
                        focusable='false'
                        role='presentation'
                        className='icon icon--wide icon-chevron-down'
                        viewBox='0 0 28 16'>
                        <path
                          d='M1.57 1.59l12.76 12.77L27.1 1.59'
                          strokeWidth='2'
                          stroke='#000'
                          fill='none'
                          fillRule='evenodd'
                        />
                      </svg>
                    </span>
                  </span>
                </div>
              </button>
            </div>
            <div
              id='Linklist-1'
              className='mobile-nav__sublist collapsible-content collapsible-content--all'
              aria-labelledby='Label-1'>
              <div className='collapsible-content__inner'>
                <ul className='mobile-nav__sublist'>
                  {subCatList.map((subcategory) => {
                    if (category.name === subcategory.category.name) {
                      return (
                        <li key={subcategory._id} className='mobile-nav__item'>
                          <div className='mobile-nav__child-item'>
                            <span
                              onClick={(e) => {
                                e.preventDefault();
                                setSubCatRef(subcategory._id);
                              }}
                              className='mobile-nav__link'
                              id='Sublabel-collections-iphone-12-12-pro-cases1'>
                              {subcategory.name}
                            </span>
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </li>
        ) : (
          <li className='mobile-nav__item appear-animation appear-delay-3'>
            <Link
              onClick={(e) => {
                e.preventDefault();
                setCatRef(category._id);
              }}
              className='mobile-nav__link'>
              {category.name}
            </Link>
          </li>
        )}
      </Fragment>
    );
  });

  return (
    <Fragment>
      {/* Mobile Menu Begin */}
      <div
        id='NavDrawer'
        className={
          props.toggleMenu
            ? 'drawer drawer--left drawer--is-open'
            : 'drawer drawer--leftt'
        }>
        <div className='drawer__contents'>
          <div className='drawer__fixed-header'>
            <div className='drawer__header appear-animation appear-delay-1'>
              <div className='drawer__title'></div>
              <div className='drawer__close'>
                <button
                  type='button'
                  className='drawer__close-button js-drawer-close'
                  onClick={props.closeMenu}>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    role='presentation'
                    className='icon icon-close'
                    viewBox='0 0 64 64'>
                    <path d='M19 17.61l27.12 27.13m0-27.12L19 44.74' />
                  </svg>
                  <span className='icon__fallback-text'>Close menu</span>
                </button>
              </div>
            </div>
          </div>
          <div className='drawer__scrollable'>
            <ul className='mobile-nav' role='navigation' aria-label='Primary'>
              {showCategories}
              <li className='mobile-nav__item appear-animation appear-delay-8'>
                <a href='login.php' className='mobile-nav__link'>
                  Log in
                </a>
              </li>
              <li className='mobile-nav__item appear-animation appear-delay-8'>
                <span className='mobile-nav__link'>
                  {<Link to='/user/dashboard'>Dashboard</Link>}
                </span>
              </li>
              <li className='mobile-nav__spacer'></li>
            </ul>
            <ul className='mobile-nav__social'></ul>
          </div>
        </div>
      </div>
      {/* Mobile Menu End */}
    </Fragment>
  );
}
