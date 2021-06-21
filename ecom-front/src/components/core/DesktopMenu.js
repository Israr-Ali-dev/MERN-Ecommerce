import React, { Fragment, useState, useEffect } from 'react';
import { getCategories, getSubCategories } from '../user/apiCore';
import { Redirect } from 'react-router-dom';

export default function DesktopMenu() {
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
            className='site-nav__item site-nav__expanded-item site-nav--has-dropdown'
            key={category._id}>
            <span
              onClick={(e) => {
                e.preventDefault();
                setCatRef(category._id);
              }}
              className='site-nav__link site-nav__link--has-dropdown'>
              {category.name}
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
            <ul className='site-nav__dropdown text-left'>
              {subCatList.map((subcategory) => {
                if (category.name === subcategory.category.name) {
                  return (
                    <li key={subcategory._id} className=''>
                      <span
                        className='site-nav__dropdown-link site-nav__dropdown-link--second-level'
                        onClick={(e) => {
                          e.preventDefault();
                          setSubCatRef(subcategory._id);
                        }}>
                        {subcategory.name}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>
          </li>
        ) : (
          <li
            key={category._id}
            className='site-nav__item site-nav__expanded-item'>
            <span
              className='site-nav__link'
              onClick={(e) => {
                e.preventDefault();
                setCatRef(category._id);
              }}>
              {category.name}
            </span>
          </li>
        )}
      </Fragment>
    );
  });

  return (
    <Fragment>
      {/* Desktop Menu Begin */}
      <div className='text-center'>
        <ul
          className='site-nav site-navigation medium-down--hide'
          role='navigation'
          aria-label='Primary'>
          {showCategories}
        </ul>
      </div>
      {/* Desktop Menu End */}
    </Fragment>
  );
}
