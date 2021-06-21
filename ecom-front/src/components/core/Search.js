import React, { Fragment, useState, useEffect } from 'react';
import { getSearchProducts } from '../user/apiCore';
import { Redirect } from 'react-router-dom';

function Search(props) {
  const [searchFilter, setSearchFilter] = useState({
    searchResuslts: [],
    searched: false,
    query: '',
    redirecReferrer: false,
  });

  const [error, setError] = '';

  const { searchResults, searched, query, redirecReferrer } = searchFilter;

  const setSearch = (event) => {
    setSearchFilter({
      query: event.target.value,
      searched: true,
    });
  };

  useEffect(() => {
    if (searched) {
      loadProductList();
    }
  }, [searchFilter]);

  const loadProductList = () => {
    getSearchProducts(query).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setSearchFilter({
          ...searchFilter,
          searchResults: data.data,
          searched: false,
        });
      }
    });
  };

  const ajaxSearch = () => {
    return (
      <Fragment>
        {/*   <!-- Ajax Search Begin --> */}
        <div
          id='search-pop'
          className='ajax-search-pop usf-popup usf-zone usf-is usf-is--left'>
          <div className='usf-is__content'>
            <div className='usf-is__matches'>
              <div className='usf-title'>Product matches</div>
              <div className='usf-is__products'>
                {searchResults
                  ? searchResults.map((searchp, i) => {
                      return (
                        <Fragment>
                          <span key={i} className='usf-is__product usf-clear'>
                            <div className='usf-img-wrapper usf-pull-left'>
                              <img
                                src={searchp.photo.data}
                                className='usf-img'
                              />
                            </div>
                            <div className='usf-pull-left'>
                              <div className='usf-title'>{searchp.name}</div>
                              <div className='usf-price-wrapper'>
                                <span className='usf-price usf-has-discount'>
                                  <span className='money'>£19.95</span>
                                </span>
                                <span className='usf-discount product-price__price product-price__sale'>
                                  <span className='money'>{searchp.price}</span>
                                </span>
                              </div>
                            </div>
                          </span>
                        </Fragment>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className='usf-is__suggestions'>
              <div className='usf-title'>Search suggestions</div>
              {searchResults
                ? searchResults.map((searchp, i) => {
                    return (
                      <Fragment>
                        <span key={i} className='usf-is__suggestion'>
                          <span className='usf-highlight'>
                            {query ? query : ''}
                          </span>{' '}
                          {searchp.name}csd
                        </span>
                      </Fragment>
                    );
                  })
                : null}
            </div>
          </div>
          <div className='usf-is__viewall'>
            <span>
              view all results for{' '}
              <span className='usf-highlight'>{query ? query : ''}</span>
            </span>
          </div>
          {/*     <!----> */}
        </div>
        {/*   <!-- Ajax Search End   --> */}
      </Fragment>
    );
  };

  const redirectSearchPage = () => {
    if (redirecReferrer) {
      return (
        <Redirect
          to={{
            pathname: '/shop',
            state: { sQuery: query },
          }}
        />
      );
    }
  };

  const searchPop = () => {
    return (
      <Fragment>
        {/*   <!-- Search Pop Begin --> */}
        <div className='wrap'>
          {redirectSearchPage()}
          <div className='search'>
            <input
              id='search-ajax'
              type='search'
              name='search'
              placeholder='Search our store'
              className='searchTerm'
              aria-label='Search our store'
              onChange={setSearch}
            />
            <button
              type='submit'
              className='searchButton site-nav__link site-nav__link--icon color'
              onClick={(e) => {
                e.preventDefault();
                setSearchFilter({
                  ...searchFilter,
                  redirecReferrer: true,
                });
                return <Redirect to='/admin/dashboard' />;
              }}>
              <svg
                aria-hidden='true'
                focusable='false'
                role='presentation'
                className='icon icon-search search-icon'
                viewBox='0 0 64 64'>
                <path
                  className='svg-stroke'
                  d='M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42'></path>
              </svg>
              <span className='icon__fallback-text'>Search</span>
            </button>
          </div>
        </div>
        {/* <div className='site-header__search-container'>
          <div className='site-header__search'>
            <div className='page-width'>
              {redirectSearchPage()}
              <form
                id='HeaderSearchForm'
                className='site-header__search-form'
                role='search'>
                <input type='hidden' name='type' defaultValue='product' />
                <button
                  type='submit'
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchFilter({
                      ...searchFilter,
                      redirecReferrer: true,
                    });
                    return <Redirect to='/admin/dashboard' />;
                  }}
                  className='text-link site-header__search-btn'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    role='presentation'
                    className='icon icon-search'
                    viewBox='0 0 64 64'>
                    <path d='M47.16 28.58A18.58 18.58 0 1 1 28.58 10a18.58 18.58 0 0 1 18.58 18.58zM54 54L41.94 42' />
                  </svg>
                  <span className='icon__fallback-text'>Search</span>
                </button>
                <input
                  id='search-ajax'
                  type='search'
                  name='search'
                  defaultValue=''
                  placeholder='Search our store'
                  className='site-header__search-input'
                  aria-label='Search our store'
                  onChange={setSearch}
                />
              </form>
              <button
                type='button'
                className='js-search-header-close text-link site-header__search-btn'>
                <svg
                  aria-hidden='true'
                  focusable='false'
                  role='presentation'
                  className='icon icon-close'
                  viewBox='0 0 64 64'>
                  <path d='M19 17.61l27.12 27.13m0-27.12L19 44.74' />
                </svg>
                <span className='icon__fallback-text'>"Close (esc)"</span>
              </button>
            </div>
          </div>
        </div> */}
        {/*   <!-- Search Pop End --> */}
      </Fragment>
    );
  };
  return (
    <Fragment>
      {searchPop()}
      {ajaxSearch()}
    </Fragment>
  );
}

export default Search;
