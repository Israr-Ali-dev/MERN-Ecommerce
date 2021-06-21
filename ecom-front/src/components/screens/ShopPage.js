import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { Redirect } from 'react-router-dom';
import {
  getProducts,
  getCategories,
  getSubCategories,
  getCases,
  getCollections,
  getModels,
  getSearchProducts,
} from '../user/apiCore';

function ShopPage(props) {
  const [filters, setFilters, getFilters] = useState({
    collections: { id: '', name: '' },
    models: { id: '', name: '' },
    cases: { id: '', name: '' },
    customizes: { id: '', name: '' },
    showFilter: false,
    skip: 0,
    limit: 6,
    category: props.location.state.cQuery ? props.location.state.cQuery : '',
    subcategory: props.location.state.scQuery
      ? props.location.state.scQuery
      : '',
  });
  const [productId, setProductId] = useState('');
  const [queryUpdate, setQueryUpdate] = useState('');

  if (props) {
    console.log(props.location.state.cQuery);
    console.log(filters.category);
    console.log(filters);
  }

  const [catList, setCategories] = useState([]);
  const [subCatList, setSubCategories] = useState([]);
  const [caseList, setCaseList] = useState([]);
  const [collectionList, setCollectionList] = useState([]);
  const [modelList, setModelList] = useState([]);
  const [productList, setProductList] = useState([]);
  const [toggleMobileSideFilter, settoggleMobileSideFilter] = useState(false);
  const [error, setError] = useState(false);

  const loadCategoryList = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data.data);
      }
    });
  };

  const loadCollections = () => {
    getCollections().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCollectionList(data.data);
      }
    });
  };

  const loadModels = () => {
    getModels().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setModelList(data.data);
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

  const loadCasesList = () => {
    getCases().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCaseList(data.data);
      }
    });
  };

  const loadProductList = () => {
    if (props.location.state && showFilter === false) {
      if (props.location.state.scQuery) {
        let q = filters.category;
        console.log(q);
        getSearchProducts(q).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setProductList(data.data);
          }
        });
      } else {
        let q = filters.category;
        getProducts(filters).then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setProductList(data.data);
          }
        });
      }
    } else {
      console.log('All');
      getProducts().then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setProductList(data.data);
        }
      });
    }
  };

  const productDetailPage = () => {
    if (productId) {
      return (
        <Redirect
          to={{
            pathname: '/single',
            state: { pId: productId },
          }}
        />
      );
    }
  };

  const toggleSideFilter = () => {
    settoggleMobileSideFilter(!toggleMobileSideFilter);
  };

  useEffect(() => {
    loadSubCategoryList();
    loadCategoryList();
    loadCasesList();
    loadProductList();
    loadCollections();
    loadModels();
  }, []);

  useEffect(() => {
    setFilters({
      ...filters,
      category: props.location.state.cQuery,
      subcategory: props.location.state.scQuery,
      showFilter: true,
    });
  }, [props.location.state.cQuery]);

  useEffect(() => {
    console.log('showFilter ' + showFilter);
    console.log('toggleMobileSideFilter ' + toggleMobileSideFilter);
    if (showFilter === true || toggleMobileSideFilter === true) {
      getProducts(filters).then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          if (skip !== 0) {
            console.log(data.data);
            setProductList(productList.concat(data.data));
          } else {
            console.log(data.data);
            setProductList(data.data);
          }
        }
      });
    }
  }, [filters]);

  const { collections, models, cases, customizes, showFilter, skip, limit } =
    filters;

  const loadMoreProducts = () => {
    setFilters({
      ...filters,
      skip: productList.length,
      limit: limit + productList.length,
    });
  };

  const closeFilters = () => {
    setFilters({
      ...filters,
      skip: 0,
      collections: { id: '', name: '' },
      models: { id: '', name: '' },
      cases: { id: '', name: '' },
      customizes: { id: '', name: '' },
    });
  };

  const handleFilters = (names, id, catName) => (event) => {
    setFilters({
      ...filters,
      [names]: { id: id, name: catName },
      showFilter: true,
      skip: 0,
    });
  };

  // const handleFilters = (name, id) => (event) => {
  //   setFilters({
  //     ...filters,
  //     [name]: [...filters[name], id],
  //     showFilter: true,
  //     skip: 0,
  //   });
  // };

  const filterDiv = () => {
    return (
      <Fragment>
        {(showFilter && collections.id !== '') ||
        (showFilter && models.id !== '') ||
        (showFilter && cases.id !== '') ? (
          <div className='usf-refineby'>
            <div className='usf-title usf-clear'>
              <span className='usf-pull-left usf-icon usf-icon-equalizer'></span>
              <span className='usf-label'>Filters</span>
              <span
                className='usf-clear-all d-fliter-clear--all'
                onClick={closeFilters}>
                Clear all
              </span>
            </div>
            <div className='usf-refineby__body'>
              {collections.id ? (
                <div className='usf-refineby__item usf-pointer usf-clear'>
                  <span>Collection:</span>
                  <b>{collections.name}</b>
                  <span
                    className='usf-remove'
                    onClick={() => {
                      setFilters({
                        ...filters,
                        collections: { id: '', name: '' },
                      });
                    }}></span>
                </div>
              ) : null}
              {models.id ? (
                <div className='usf-refineby__item usf-pointer usf-clear'>
                  <span>Model:</span>
                  <b>{models.name}</b>
                  <span
                    className='usf-remove'
                    onClick={() => {
                      setFilters({
                        ...filters,
                        models: { id: '', name: '' },
                      });
                    }}></span>
                </div>
              ) : null}
              {cases.id ? (
                <div className='usf-refineby__item usf-pointer usf-clear'>
                  <span>Case:</span>
                  <b>{cases.name}</b>
                  <span
                    className='usf-remove'
                    onClick={() => {
                      setFilters({
                        ...filters,
                        cases: { id: '', name: '' },
                      });
                    }}></span>
                </div>
              ) : null}
              {customizes.id ? (
                <div className='usf-refineby__item usf-pointer usf-clear'>
                  <span>Customizable? :</span>
                  <b>{customizes.name}</b>
                  <span
                    className='usf-remove'
                    onClick={() => {
                      setFilters({
                        ...filters,
                        customizes: { id: '', name: '' },
                      });
                    }}></span>
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </Fragment>
    );
  };

  const mobileSideFilter = () => {
    return (
      <Fragment>
        {/* Mobile Side Filter Begin  */}
        <div
          className={
            toggleMobileSideFilter
              ? 'mobile-filters usf-facets usf-no-select usf-zone m-show-mfilters'
              : 'mobile-filters usf-facets usf-no-select usf-zone'
          }>
          <div
            className='m-close'
            id='close-m-filter'
            onClick={toggleSideFilter}></div>
          <div className='facets-wrapper'>
            <div className='main-list'>
              <div className='m-header'>
                <div className='m-title'>Filters</div>
              </div>
              <div className='m-body'>
                <div className='m-facet-value' id='m-collection'>
                  <span className='m-title'>Collection</span>
                </div>
                <div className='m-facet-value' id='m-models'>
                  <span className='m-title'>Phone Model</span>
                </div>
                <div className='m-facet-value' id='m-cases'>
                  <span className='m-title'>Case Type</span>
                </div>
                <div className='m-facet-value' id='m-personlised'>
                  <span className='m-title'>Personalised?</span>
                </div>
              </div>
            </div>

            {/* Mobile Collection List Begin  */}
            <div className='m-collection-list'>
              <div className='m-header'>
                <div className='m-title m-back'>Collection</div>
                <div className='m-all'>All</div>
              </div>
              <div className='m-body'>
                {collectionList.map((collection) => {
                  return (
                    <div
                      key={collection.id}
                      className='m-facet-value m-final-select'
                      onClick={handleFilters(
                        'collections',
                        collection.id,
                        collection.name
                      )}>
                      <span className='m-title'>{collection.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Mobile Collection List End  */}

            {/* Mobile Models List Begin */}
            <div className='m-models-list'>
              <div className='m-header'>
                <div className='m-title m-back'>Models</div>
                <div className='m-all'>All</div>
              </div>
              <div className='m-body'>
                {modelList.map((model) => {
                  return (
                    <div
                      key={model.id}
                      className='m-facet-value m-final-select'
                      onClick={handleFilters('models', model.id, model.name)}>
                      <span className='m-title'>{model.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Mobile Models List End  */}

            {/* Mobile Cases List Begin */}
            <div className='m-cases-list'>
              <div className='m-header'>
                <div className='m-title m-back'>Cases</div>
                <div className='m-all'>All</div>
              </div>
              <div className='m-body'>
                {caseList.map((cases) => {
                  return (
                    <div
                      key={cases.id}
                      className='m-facet-value m-final-select'
                      onClick={handleFilters('cases', cases.id, cases.name)}>
                      <span className='m-title'>{cases.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Mobile Cases List End */}

            {/* Mobile Personlised List Begin */}
            <div className='m-personlised-list'>
              <div className='m-header'>
                <div className='m-title m-back'>Personlised</div>
                <div className='m-all'>All</div>
              </div>
              <div className='m-body'>
                <div
                  className='m-facet-value m-final-select'
                  onClick={handleFilters('customizes')}>
                  <span className='m-title'>Custom Phone Cases</span>
                </div>
                <div
                  className='m-facet-value m-final-select'
                  onClick={handleFilters('customizes')}>
                  <span className='m-title'>Phone Cases</span>
                </div>
              </div>
            </div>
            {/* Mobile Personlised List End  */}

            <div style={{ padding: '20px 30px' }}>
              <div>{filterDiv()}</div>
            </div>
          </div>
        </div>
        {/* Mobile Side Filter End */}
      </Fragment>
    );
  };

  const deskTopSideFilter = () => {
    return (
      <Fragment>
        {/* Desktop Side Filter Begin */}
        <div className='side-filetrs usf-facets usf-no-select usf-zone'>
          {/* Filter div Bengin */}
          {filterDiv()}
          {/* Filter div End */}
          <div className='usf-facets__body'>
            <div className='usf-facet'>
              <div className='usf-clear'>
                <div className='usf-title usf-no-select'>
                  <span className='usf-label'>Collection</span>
                  <div className='usf-c-tooltip'>
                    <div className='usf-c-tooltip__popup'>
                      Choose the Collection / Design Type
                    </div>
                  </div>
                </div>
              </div>
              <div className='usf-container collection-container'>
                <div
                  className='usf-facet-values usf-facet-values--List'
                  style={{ maxHeight: '300px' }}>
                  {collectionList.map((collection) => {
                    // if (subcat.category.name === 'Shop By Collection') {
                    return (
                      <div
                        key={collection.id}
                        className=' usf-relative usf-facet-value usf-facet-value-single'>
                        <span
                          className='usf-label'
                          onClick={handleFilters(
                            'collections',
                            collection.id,
                            collection.name
                          )}>
                          {collection.name}
                        </span>
                      </div>
                    );
                    //}
                  })}
                </div>
              </div>
            </div>
            <div className='usf-facet'>
              <div className='usf-clear'>
                <div className='usf-title usf-no-select'>
                  <span className='usf-label'>Phone Model</span>
                  <div className='usf-c-tooltip'>
                    <div className='usf-c-tooltip__popup'>
                      Choose your phone model
                    </div>
                  </div>
                </div>
              </div>
              <div className='usf-container model-container'>
                <div
                  className='usf-facet-values usf-facet-values--List'
                  style={{ maxHeight: '300px' }}>
                  {modelList.map((model) => {
                    // if (subcat.category.name === 'Shop By Phone') {
                    return (
                      <div
                        key={model.id}
                        className=' usf-relative usf-facet-value usf-facet-value-single'>
                        <span
                          className='usf-label'
                          onClick={handleFilters(
                            'models',
                            model.id,
                            model.name
                          )}>
                          {model.name}
                        </span>
                      </div>
                    );
                    //}
                  })}
                </div>
              </div>
            </div>
            <div className='usf-facet'>
              <div className='usf-clear'>
                <div className='usf-title usf-no-select'>
                  <span className='usf-label'>Case Type</span>
                  <div className='usf-c-tooltip'>
                    <div className='usf-c-tooltip__popup'>
                      Choose your Case Type
                    </div>
                  </div>
                </div>
              </div>
              <div className='usf-container case-container'>
                <div
                  className='usf-facet-values usf-facet-values--Swatch usf-facet-values--circle'
                  style={{ maxHeight: '300px' }}>
                  {caseList.map((cases) => {
                    return (
                      <div
                        key={cases.id}
                        title={cases.name}
                        onClick={handleFilters('cases', cases.id, cases.name)}
                        className=' usf-facet-value--with-background usf-relative usf-facet-value usf-facet-value-single'
                        style={{
                          backgroundImage: `url(${cases.photo.data})`,
                        }}>
                        <span className='usf-label'>{cases.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className='usf-facet'>
              <div className='usf-clear'>
                <div className='usf-title usf-no-select'>
                  <span className='usf-label'>Customizable?</span>
                  <div className='usf-c-tooltip'>
                    <div className='usf-c-tooltip__popup'>
                      Choose from Custom or Non Custom Cases
                    </div>
                  </div>
                </div>
              </div>
              <div className='usf-container customize-container'>
                <div
                  className='usf-facet-values usf-facet-values--List'
                  style={{ maxHeight: '300px' }}>
                  <div className=' usf-relative usf-facet-value usf-facet-value-single'>
                    <span
                      className='usf-label'
                      onClick={handleFilters('customizes')}>
                      Custom Phone Case
                    </span>
                  </div>
                  <div className=' usf-relative usf-facet-value usf-facet-value-single'>
                    <span
                      className='usf-label'
                      onClick={handleFilters('customizes')}>
                      Phone Case
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Desktop Side Filter End */}
      </Fragment>
    );
  };

  const mobileTopFilter = () => {
    return (
      <Fragment>
        {/* Mobile Top Filter Begin  */}
        <div
          className='usf-sr-config usf-mobile mobTop-filter'
          style={{ top: '59px' }}>
          <div className='usf-sr-config__mobile-filters-wrapper'>
            <select className='usf-dropdown'>
              <option value='bestselling'>Bestselling</option>
              <option value='-date'>Date: New to Old</option>
              <option value='date'>Date: Old to New</option>
              <option value=''>Relevance</option>
            </select>
            <div
              className='usf-filters usf-has-filters'
              onClick={toggleSideFilter}
              id='m-show-filter'>
              <span className='usf-icon'>
                <svg
                  width='17'
                  height='16'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 17 16'>
                  <g fill='currentColor' fillRule='evenodd'>
                    <rect x='2' width='1' height='5' rx='.5'></rect>
                    <rect x='8' width='1' height='9' rx='.5'></rect>
                    <rect x='14' width='1' height='3' rx='.5'></rect>
                    <rect x='2' y='8' width='1' height='8' rx='.5'></rect>
                    <rect x='8' y='12' width='1' height='4' rx='.5'></rect>
                    <rect x='14' y='6' width='1' height='10' rx='.5'></rect>
                    <path
                      d='M2.5 8.5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6 5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm6-5a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0-1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
                      fillRule='nonzero'></path>
                  </g>
                </svg>
              </span>
              <span>Filters</span>
            </div>
          </div>
        </div>
        {/* Mobile Top Filter End */}
      </Fragment>
    );
  };

  const desktopTopFilter = () => {
    return (
      <Fragment>
        {/* Desktop Top Filter Begin  */}
        <div className='usf-sr-config deskTop-filter'>
          <span className='usf-sr-summary'>
            <b>77</b> products
          </span>
          <select className='usf-dropdown'>
            <option value='bestselling'>Bestselling</option>
            <option value='-date'>Date: New to Old</option>
            <option value='date'>Date: Old to New</option>
            <option value=''>Relevance</option>
          </select>
          <div className='usf-views'>
            <div className='usf-view usf-grid usf-active' id='viewgrid'>
              <svg role='presentation' viewBox='0 0 36 36'>
                <path
                  fill='currentColor'
                  d='M8 0L0 0L0 8L8 8L8 0ZM14 0L22 0L22 8L14 8L14 0ZM36 0L28 0L28 8L36 8L36 0ZM0 14L8 14L8 22L0 22L0 14ZM22 14L14 14L14 22L22 22L22 14ZM28 14L36 14L36 22L28 22L28 14ZM8 28L0 28L0 36L8 36L8 28ZM14 28L22 28L22 36L14 36L14 28ZM28 36L28 28L36 28L36 36L28 36Z'></path>
              </svg>
            </div>
            <div className='usf-view usf-list' id='viewlist'>
              <svg role='presentation' viewBox='0 0 18 18'>
                <path
                  d='M8 1.030067h9c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1H8c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 7h9c.5522847 0 1 .44771525 1 1s-.4477153 1-1 1H8c-.55228475 0-1-.44771525-1-1s.44771525-1 1-1zm0 7h9c.5522847 0 1 .4477153 1 1s-.4477153 1-1 1H8c-.55228475 0-1-.4477153-1-1s.44771525-1 1-1zm-7-15h2c.55228475 0 1 .44771525 1 1v2c0 .55228475-.44771525 1-1 1H1c-.55228475 0-1-.44771525-1-1v-2c0-.55228475.44771525-1 1-1zm0 7h2c.55228475 0 1 .44771525 1 1v2c0 .5522847-.44771525 1-1 1H1c-.55228475 0-1-.4477153-1-1v-2c0-.55228475.44771525-1 1-1zm0 7h2c.55228475 0 1 .4477153 1 1v2c0 .5522847-.44771525 1-1 1H1c-.55228475 0-1-.4477153-1-1v-2c0-.5522847.44771525-1 1-1z'
                  fill='currentColor'></path>
              </svg>
            </div>
          </div>
        </div>
        {/* Desktop Top Filter End */}
      </Fragment>
    );
  };

  const mobileSideDetail = () => {
    return (
      <Fragment>
        {/* Mobile Side Detail Begin */}
        <div className='mobile-side-detail usf-facets usf-no-select usf-zone'>
          <div className='m-close' id='close-m-detail'></div>
          <div className='facets-wrapper'>
            <div className='main-list'>
              <div className='m-header'>
                <div className='m-title'>Description</div>
                {/* <div className="m-all">All</div> --> */}
              </div>
              <div className='m-body detail-side'>
                <ul>
                  <li className='align-center'>
                    <img src='assets/img/c1.png' alt='img' />
                  </li>
                  <li>
                    Price:
                    <br /> <span>$23.95</span>
                  </li>
                  <li className='detail-text'>
                    Detail:
                    <br />{' '}
                    <span>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Totam omnis debitis non blanditiis, dolorum porro sint
                      molestiae possimus magni magnam quibusdam eaque. Pariatur
                      adipisci quo expedita atque incidunt quod aperiam!
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className='m-footer'>
              <div>
                <a href='#'>View Detail Page</a>
              </div>
            </div>
          </div>
        </div>
        {/* Product Side Detail End */}
      </Fragment>
    );
  };

  const listViewItems = () => {
    return (
      <Fragment>
        {productDetailPage()}
        {/* List View Items Begin */}
        <div className='list-view-items usf-results usf-list'>
          {productList.map((product) => {
            return (
              <span
                key={product.id}
                className='usf-sr-product list-view-item'
                onClick={() => {
                  setProductId(product._id);
                }}>
                <div className='list-view-item__image-column'>
                  <div className='list-view-item__image-wrapper'>
                    <img
                      src={product.photo.data}
                      className='list-view-item__image'
                      alt='img'
                    />
                  </div>
                </div>
                <div className='list-view-item__title-column'>
                  <div className='list-view-item__title'>{product.name}</div>
                  <div className='list-view-item__vendor medium-up--hide'>
                    theMobileCover
                  </div>
                </div>
                <div className='list-view-item__vendor-column small--hide'></div>
                <div className='list-view-item__price-column'>
                  <div className='usf-price product-price__price usf-has-discount'>
                    <span className='money'>£{product.price}</span>
                  </div>
                  <div className='usf-discount product-price__price product-price__sale'>
                    <span className='money'>£{product.price}</span>
                  </div>
                </div>
              </span>
            );
          })}
        </div>
      </Fragment>
    );
  };

  const gridViewItems = () => {
    return (
      <Fragment>
        {productDetailPage()}
        {/* Grid View Items Begin */}
        <div className='grid-view-items'>
          {productList.map((product) => {
            return (
              <div
                key={product.id}
                product-selector='4862122393653'
                className='usf-sr-product grid__item grid-product small--one-half medium-up--one-quarter aos-init aos-animate'>
                <div className='grid-view-item grid-product__content'>
                  <div className='grid-product__tag grid-product__tag--sale'>
                    Custom
                  </div>
                  <span className='usf-out-of-stock'></span>
                  <span
                    onClick={() => {
                      setProductId(product._id);
                    }}
                    className='grid-view-item__link grid-product__link'>
                    <div className='usf-img-wrapper grid-view-item__image-wrapper'>
                      <img
                        src={product.photo.data}
                        className='usf-img grid-view-item__image'
                        alt='p-img'
                      />
                    </div>

                    <div className='grid-product__meta'>
                      <div className='grid-product__title'>{product.name}</div>

                      <div className='grid-product__price'>
                        <span className='visually-hidden'>Regular price</span>
                        <span className='grid-product__price--original'>
                          <span className='money'>£{product.price}</span>
                        </span>
                        <span className='visually-hidden'>Sale price</span>
                        <span className='sale-price'>
                          <span className='money'>£{product.price}</span>
                        </span>
                      </div>
                      <span
                        className='spr-badge'
                        id='spr_badge_4862122393653'
                        data-rating='5.0'>
                        <span className='spr-starrating spr-badge-starrating'>
                          <i
                            className='spr-icon spr-icon-star'
                            style={{ color: '#fff200' }}></i>
                          <i
                            className='spr-icon spr-icon-star'
                            style={{ color: '#fff200' }}></i>
                          <i
                            className='spr-icon spr-icon-star'
                            style={{ color: '#fff200' }}></i>
                          <i
                            className='spr-icon spr-icon-star'
                            style={{ color: '#fff200' }}></i>
                          <i
                            className='spr-icon spr-icon-star'
                            style={{ color: '#fff200' }}></i>
                        </span>
                        <span className='spr-badge-caption'>2 reviews</span>
                      </span>
                      <div className='usf-alert-zone'></div>
                    </div>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        {/*  Grid View Items End */}
      </Fragment>
    );
  };

  const parallaxBanner = () => {
    return (
      <Fragment>
        <div className='collection-hero loaded'>
          <div className='parallax-container'>
            <div
              className='parallax-image collection-hero__image lazyloaded'
              data-bgset='
                 ../assets/img/product-banner.jpg'
              style={{
                backgroundImage: 'url(../assets/img/product-banner.jpg)',
              }}>
              <picture style={{ display: 'none' }}>
                <source
                  sizes='269px'
                  srcSet='../assets/img/product-banner.jpg'
                />
                <img
                  alt=''
                  className='lazyautosizes lazyloaded'
                  data-sizes='auto'
                  data-parent-fit='cover'
                  sizes='269px'
                />
              </picture>
            </div>
          </div>
          <div className='collection-hero__content'>
            <div className='page-width'>
              <header className='section-header section-header--hero'>
                <h1 className='section-header__title section-header__title--medium'>
                  <div className='animation-cropper'>
                    <div className='animation-contents'>Abstract</div>
                  </div>
                </h1>
              </header>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const breadCrumb = () => {
    return (
      <Fragment>
        <nav
          className='breadcrumb breadcrumb-tiktok'
          role='navigation'
          aria-label='breadcrumbs'>
          <a
            href='iindex.php'
            title='Back to the frontpage'
            style={{ color: '#333333' }}>
            Home
          </a>
          <span className='divider' aria-hidden='true'>
            /
          </span>
          <span>Abstract</span>
          <div className='mobile-view'>
            <div className='mgrid-view'>
              <img src='../assets/img/TMC/grid-view.png' width='20' alt='img' />
            </div>
            <div className='mtiktok-view'>
              <img
                src='../assets/img/TMC/tiktok-view.png'
                width='20'
                alt='img'
              />
            </div>
          </div>
        </nav>
      </Fragment>
    );
  };

  const shopPage = () => {
    return (
      <Fragment>
        {/* Content Begin */}
        <main className='main-content product-tPage' id='MainContent'>
          <div
            id='shopify-section-collection-template'
            className='shopify-section'>
            {/* BEGIN USF  */}
            <div
              id='CollectionSection'
              data-section-id='collection-template'
              data-section-type='collection-template'
              data-parallax='true'>
              {parallaxBanner()}
              <div className='page-width page-content tiktok-content'>
                {breadCrumb()}
                <div className='rte'>
                  You know you love these iPhone cases, but you can’t quite put
                  your finger on why. Find out if there is something you like
                  from our abstract iPhone cases collection.
                </div>
                <hr className='hr--clear hr--small' />
                {/* USF  */}
                <div id='usf_container' className='usf-zone usf-clear'>
                  {deskTopSideFilter()}
                  <div className='usf-sr-container usf-nosearch'>
                    {mobileTopFilter()}
                    {desktopTopFilter()}
                    <div className='grid grid--uniform grid--view-items usf-results usf-grid'>
                      {gridViewItems()}
                      {listViewItems()}

                      <div className='grid__item small--hide text-center'>
                        <span className='btn' onClick={loadMoreProducts}>
                          View More
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* END USF  */}
              </div>
            </div>
          </div>
        </main>
        {/*  Mobile Side Filter Begin  */}
        {mobileSideFilter()}
        {/* Mobile Side Filter End */}
        {/* Mobile Side Detail Begin  */}
        {mobileSideDetail()}
        {/* Mobile Side Detail End */}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Layout childComponent={shopPage()} />
    </Fragment>
  );
}

export default ShopPage;
