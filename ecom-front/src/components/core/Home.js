import React, { Fragment, useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts, newsletterSignup } from '../user/apiCore';
import { addItem } from './cartHelper';
import { Redirect } from 'react-router-dom';
import InstaSlider from './InstaSlider';
import validator from 'validator';

function Home() {
  const [trendProductList, setTendProductList] = useState([]);
  const [cartRef, setCartRef] = useState(false);
  const [productId, setProductId] = useState('');
  const [error, setError] = useState(false);
  const [catRef, setCatRef] = useState('');
  const [newsletterMail, setnewsletterMail] = useState('');
  const [mailSuccess, setmailSuccess] = useState('');
  const [mailFailure, setmailFailure] = useState('');

  const loadTrendProductList = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(data.error);
      } else {
        setTendProductList(data.data);
      }
    });
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

  const addToCart = (product) => {
    addItem(product, () => {
      setCartRef(true);
    });
  };

  const redirectCart = () => {
    if (cartRef) {
      return <Redirect to='/cart' />;
    }
  };

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
  };

  const handleNewsletter = () => {
    if (newsletterMail) {
      if (validator.isEmail(newsletterMail)) {
        newsletterSignup(newsletterMail).then((data) => {
          if (data.error) {
            setError(data.error);
            setmailFailure(false);
          } else {
            console.log(data.data.account);
            setmailSuccess(true);
            setmailFailure(false);
          }
        });
      } else {
        setmailFailure('Please Enter Valid Email Address');
        setmailSuccess(false);
      }
    } else {
      setmailFailure('Please Enter Email Address');
      setmailSuccess(false);
    }
  };

  useEffect(() => {
    loadTrendProductList();
  }, []);

  const headOffer = () => {
    return (
      <Fragment>
        <div
          id='themobilecase-section-1601298209401'
          className='themobilecase-section'>
          <div className='page-width'>
            <div className='custom-content'>
              <div className='custom__item one-whole align--center'>
                <div className='custom__item-inner custom__item-inner--html'>
                  <div
                    className='rte'
                    data-section-id='1601298209401'
                    data-section-type='featured-content-section'>
                    <div id='bar'>
                      <p className='js-nametag'>
                        Get 20% off with
                        <a href='pages/student-discount.html'>
                          <img
                            id='sb-logo'
                            src='assets/img/studentbeansee81.png?v=1601299662'
                            alt='offer'
                          />
                        </a>
                      </p>
                      <p className='js-nametag'>Free Worldwide Delivery</p>
                      <div></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const mainBanner = () => {
    return (
      <Fragment>
        <div
          id='themobilecase-section-1603441514306'
          className='themobilecase-section index-section--hero'>
          <div
            data-section-id='1603441514306'
            data-section-type='video-section'
            className='video-parent-section hero--1603441514306 main-banner '
            data-aos='hero__animation'
            style={{ padding: '0 20px' }}>
            <img
              src='assets/img/new/Banner.png'
              className='banner-img'
              width='100%'
              alt='banner-1'
            />
          </div>
        </div>
      </Fragment>
    );
  };

  const categoryBanners = () => {
    return (
      <Fragment>
        {redirectCatPage()}
        <div
          id='themobilecase-section-1603441816202'
          className='themobilecase-section index-section'>
          <div className='banner-page-width'>
            <div className='section-header'>
              <h2 className='section-header__title'>Shop Our Cases</h2>
            </div>
            <div className='grid grid--small-gutters banner-grid'>
              <div
                className='grid__item  skrim__item'
                data-aos='skrim__animation'
                style={{ gridArea: 'Area1' }}
                onClick={(e) => {
                  e.preventDefault();
                  setCatRef('5fcd1e161071274130a8016a');
                }}>
                <span className='skrim__link skrim__item-content'>
                  <div
                    className='skrim__overlay grid__image lazyload rounded-img'
                    data-bgset='
                      assets/img/new/mob-bna.png,
                     '
                    data-sizes='auto'
                    style={{ backgroundPosition: 'center center;' }}></div>
                  <div className='skrim__title'>
                    <div className='skrim__underline-me banner-btn'>
                      Best Selling
                    </div>
                  </div>
                </span>
              </div>
              <div
                className='grid__item   skrim__item'
                data-aos='skrim__animation'
                style={{ gridArea: 'Area2' }}
                onClick={(e) => {
                  e.preventDefault();
                  setCatRef('5fca91d752a69c31241186ce');
                }}>
                <span className='skrim__link skrim__item-content'>
                  <div
                    className='skrim__overlay grid__image lazyload rounded-img'
                    data-bgset='
                      assets/img/new/Abstract.png
                      '
                    data-sizes='auto'
                    style={{ backgroundPosition: 'center center;' }}></div>
                  <div className='skrim__title'>
                    <div className='skrim__underline-me banner-btn'>
                      Abstract
                    </div>
                  </div>
                </span>
              </div>
              <div
                className='grid__item skrim__item'
                data-aos='skrim__animation'
                style={{ gridArea: 'Area3' }}
                onClick={(e) => {
                  e.preventDefault();
                  setCatRef('5fca91d752a69c31241186ce');
                }}>
                <span className='skrim__link skrim__item-content'>
                  <div
                    className='skrim__overlay grid__image lazyload rounded-img'
                    data-bgset='
                  assets/img/new/Floral.png
                      '
                    data-sizes='auto'
                    style={{ backgroundPosition: 'center center;' }}></div>
                  <div className='skrim__title'>
                    <div className='skrim__underline-me banner-btn'>Floral</div>
                  </div>
                </span>
              </div>
              <div
                className='grid__item  skrim__item'
                data-aos='skrim__animation'
                style={{ gridArea: 'Area4' }}
                onClick={(e) => {
                  e.preventDefault();
                  setCatRef('5fca91d752a69c31241186ce');
                }}>
                <span className='skrim__link skrim__item-content'>
                  <div
                    className='skrim__overlay grid__image lazyload rounded-img'
                    data-bgset='
                  assets/img/new/Quotes.png
                      '
                    data-sizes='auto'
                    style={{ backgroundPosition: 'center center;' }}></div>
                  <div className='skrim__title'>
                    <div className='skrim__underline-me banner-btn'>Quotes</div>
                  </div>
                </span>
              </div>
              <div
                className='grid__item skrim__item'
                data-aos='skrim__animation'
                style={{ gridArea: 'Area5' }}
                onClick={(e) => {
                  e.preventDefault();
                  setCatRef('5fcd1e161071274130a8016a');
                }}>
                <span className='skrim__link skrim__item-content'>
                  <div
                    className='skrim__overlay grid__image lazyload rounded-img'
                    data-bgset='
                  assets/img/new/Marble.png
                      '
                    data-sizes='auto'
                    style={{ backgroundPosition: 'center center;' }}></div>
                  <div className='skrim__title'>
                    <div className='skrim__underline-me banner-btn'>Marble</div>
                  </div>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const bannerSlides = () => {
    return (
      <Fragment>
        <div
          id='themobilecase-section-1600851388474'
          className='themobilecase-section index-section--hero'>
          <div
            data-section-id='1600851388474'
            data-section-type='slideshow-section'
            data-align-top='true'>
            <div className='slideshow-wrapper'>
              <button
                type='button'
                className='visually-hidden slideshow__pause'
                data-id='1600851388474'
                aria-live='polite'>
                <span className='slideshow__pause-stop'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    role='presentation'
                    className='icon icon-pause'
                    viewBox='0 0 10 13'>
                    <g fill='#000' fill-rule='evenodd'>
                      <path d='M0 0h3v13H0zM7 0h3v13H7z' />
                    </g>
                  </svg>
                  <span className='icon__fallback-text'>
                    translation missing: en.sections.slideshow.pause_slideshow
                  </span>
                </span>
                <span className='slideshow__pause-play'>
                  <svg
                    aria-hidden='true'
                    focusable='false'
                    role='presentation'
                    className='icon icon-play'
                    viewBox='18.24 17.35 24.52 28.3'>
                    <path
                      fill='#323232'
                      d='M22.1 19.151v25.5l20.4-13.489-20.4-12.011z'
                    />
                  </svg>
                  <span className='icon__fallback-text'>
                    translation missing: en.sections.slideshow.play_slideshow
                  </span>
                </span>
              </button>
              <div className='sl-banner hero hero--650px hero--1600851388474 hero--mobile--auto'>
                <div
                  className='slideshow__slide slideshow__slide--1600855372653'
                  data-id='1600855372653'>
                  <div className='hero__image-wrapper'>
                    <img
                      className='hero__image hero__image--1600855372653 lazyload'
                      src='assets/img/Banner-Desktop2.jpg'
                      data-src='assets/img/Banner-Desktop2.jpg'
                    />
                  </div>
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      setCatRef('5fcd1e161071274130a8016a');
                    }}
                    className='hero__slide-link'>
                    <div className='hero__text-wrap'>
                      <div className='page-width'>
                        <div className='hero__text-content vertical-bottom horizontal-left'>
                          <h2 className='h1 hero__title'>
                            <div className='animation-cropper'>
                              <div className='animation-contents'>
                                Ultraviolet Cosmos
                              </div>
                            </div>
                          </h2>
                          <div className='hero__subtitle'>
                            <div className='animation-cropper'>
                              <div className='animation-contents'>
                                Holographic &amp; Reflective
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const instaSlides = () => {
    return (
      <Fragment>
        <div
          id='themobilecase-section-1600854407507'
          className='themobilecase-section index-section'>
          <div
            data-section-id='1600854407507'
            data-section-type='featured-content-section'
            className='text-center'>
            <div className='page-width'>
              <div className='grid'>
                <div className='grid__item'>
                  <h2>Socially Approved</h2>
                  <div className='rte'>
                    <p>
                      Tag us with{' '}
                      <span href='#' title='theMobileCase'>
                        <strong>@theMobileCase</strong>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <InstaSlider />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const subscribeLetter = () => {
    return (
      <Fragment>
        <div
          id='themobilecase-section-1600853739977'
          className='themobilecase-section'>
          <div className='newsletter-section newsletter-1600853739977'>
            <div className='page-width text-center'>
              <h2 className='h3'>GET THE INSIDE SCOOP!</h2>
              <div className='rte'>
                <p>
                  Subscribe to get special offers, free giveaways, and
                  once-in-a-lifetime deals.
                </p>
              </div>
              <span className='contact-form'>
                {mailFailure ? (
                  <div class='errors'>
                    <ul>
                      <li>{mailFailure}</li>
                    </ul>
                  </div>
                ) : null}
                {mailSuccess ? (
                  <div class='note note--success'>Thanks for subscribing</div>
                ) : null}
                <div className='input-group newsletter__input-group'>
                  <input
                    type='email'
                    placeholder='Enter your email'
                    className='input-group-field newsletter__input'
                    style={{ color: '#000' }}
                    onChange={(e) => {
                      setnewsletterMail(e.target.value);
                    }}
                  />
                  <span className='input-group-btn'>
                    <button
                      type='submit'
                      className='btn'
                      onClick={handleNewsletter}>
                      <span className='form__submit--large'>Subscribe</span>
                      <span className='form__submit--small'>
                        <svg
                          aria-hidden='true'
                          focusable='false'
                          role='presentation'
                          className='icon icon--wide icon-arrow-right'
                          viewBox='0 0 50 15'>
                          <path d='M0 9.63V5.38h35V0l15 7.5L35 15V9.63z' />
                        </svg>
                      </span>
                    </button>
                  </span>
                </div>
              </span>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const trendingProducts = () => {
    return (
      <Fragment>
        {error ? console.log(error) : null}
        {productDetailPage()}
        {redirectCart()}
        <div className='page-width page-width--flush-small'>
          <div className='grid-overflow-wrapper'>
            <div className='grid grid--uniform' data-aos='overflow__animation'>
              {trendProductList.map((product, i) => {
                return (
                  <div
                    key={i}
                    className='grid__item grid-product small--one-half medium-up--one-fifth'
                    data-aos='row-of-'>
                    <div className='grid-product__content'>
                      <span
                        onClick={() => {
                          setProductId(product._id);
                        }}
                        className='grid-product__link '>
                        <div className='grid-product__image-mask'>
                          <div
                            className='image-wrap'
                            style={{
                              height: '0',
                              paddingBottom: '133.333333333%',
                            }}>
                            <img
                              className='grid-product__image lazyloaded'
                              src={product.photo.data}
                              alt='Custom Photorealistic Butterfly iPhone Case  Impact Case Custom Phone Case - Case Warehouse'
                            />
                          </div>
                        </div>
                        <div className='grid-product__meta'>
                          <div className='grid-product__title'>
                            {product.name}
                          </div>
                          <div className='grid-product__price'>
                            <span className='visually-hidden'>
                              Regular price
                            </span>
                            <span className='grid-product__price--original'>
                              <span className='money'>£{product.price}</span>
                            </span>
                            <span className='visually-hidden'>Sale price</span>
                            <span className='sale-price'>
                              from
                              <span className='money'>£{product.price}</span>
                            </span>
                          </div>
                          <span
                            className='themobilecase-product-reviews-badge'
                            data-id='4458505109557'></span>
                        </div>
                      </span>
                      <div className='grid-product__colors'>
                        <span
                          className='color-swatch color-swatch--small'
                          style={{
                            backgroundImage:
                              'url(assets/img/impact-case_50x.png)',
                            backgroundColor: 'case',
                          }}
                          aria-label='Custom Photorealistic Butterfly iPhone Case - Impact Case'></span>
                        <span
                          className='color-swatch color-swatch--small'
                          style={{
                            backgroundImage:
                              'url(assets/img/neon-impact_50x.png)',
                            backgroundColor: 'impact',
                          }}
                          aria-label='Custom Photorealistic Butterfly iPhone Case - Neon Impact'></span>
                        <span
                          className='color-swatch color-swatch--small'
                          style={{
                            backgroundImage:
                              'url(assets/img/pink-fade-impact_50x.png)',
                            backgroundColor: 'impact',
                          }}
                          aria-label='Custom Photorealistic Butterfly iPhone Case - Pink Fade Impact'></span>
                        <span
                          className='color-swatch color-swatch--small'
                          style={{
                            backgroundImage:
                              'url(assets/img/black-impact_50x.png)',
                            backgroundColor: 'impact',
                          }}
                          aria-label='Custom Photorealistic Butterfly iPhone Case - Black Impact'></span>
                        <span
                          className='color-swatch color-swatch--small'
                          style={{
                            backgroundImage:
                              'url(assets/img/slim-case_50x.png)',
                            backgroundColor: 'case',
                          }}
                          aria-label='Custom Photorealistic Butterfly iPhone Case - Slim Case'></span>
                      </div>
                    </div>
                  </div>
                );
              })}
              {/* <div className='grid__item small--hide text-center'>
                <a href='collections/trending.html' className='btn'>
                  View all
                </a>
              </div> */}
              {/* <div className='grid__item grid__item--view-all text-center small--one-half medium-up--one-fifth medium-up--hide'>
                <a
                  href='collections/trending.html'
                  className='grid-product__see-all'>
                  View all
                  <br />
                  22 products
                </a>
              </div> */}
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  const homeFront = () => {
    return (
      <Fragment>
        {headOffer()}
        {mainBanner()}
        {categoryBanners()}
        {trendingProducts()}
        {bannerSlides()}
        {instaSlides()}
        {subscribeLetter()}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Layout childComponent={homeFront()} />
    </Fragment>
  );
}

export default Home;
