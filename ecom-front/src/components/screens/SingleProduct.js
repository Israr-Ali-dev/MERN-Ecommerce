import React, { Fragment, useEffect, useState } from 'react';
import Layout from '../core/Layout';
import { getProductById, getRelatedProducts } from '../user/apiCore';
import { addItem } from '../core/cartHelper';
import { Redirect } from 'react-router-dom';
import ProductSlider from './ProductSlider';

function SingleProduct(props) {
  const [productId, setProductId] = useState(
    props.location.state.pId ? props.location.state.pId : ''
  );
  const [cartRef, setCartRef] = useState(false);
  const [product, setProduct] = useState([]);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [slides, setSlides] = useState();
  const [error, setError] = useState(false);

  const loadProductById = () => {
    getProductById(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data.data);
        setSlides([
          data.data.photo.data,
          data.data.photo.data,
          data.data.photo.data,
          data.data.photo.data,
        ]);
      }
    });
  };

  const loadRelatedProducts = () => {
    getRelatedProducts(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setRelatedProduct(data.data);
      }
    });
  };

  const addToCart = () => {
    addItem(product, () => {
      setCartRef(!cartRef);
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

  useEffect(() => {
    loadProductById();
    loadRelatedProducts();
  }, [productId]);

  const breadCrumb = () => {
    return (
      <Fragment>
        <nav className='breadcrumb' role='navigation' aria-label='breadcrumbs'>
          <a href='/' title='Back to the frontpage'>
            Home
          </a>

          <span className='divider' aria-hidden='true'>
            /
          </span>
          <span className='breadcrumb--truncate'>
            Create Your Own Boarding Pass Ticket iPhone Case
          </span>
        </nav>
      </Fragment>
    );
  };

  const productSlider = () => {
    return (
      <Fragment>
        <div className='grid__item medium-up--one-half'>
          <div data-product-images data-zoom='false' data-has-slideshow='true'>
            {slides ? <ProductSlider slides={slides} /> : null}
          </div>
        </div>
      </Fragment>
    );
  };

  const productReview = () => {
    return (
      <Fragment>
        <button
          type='button'
          className='label collapsible-trigger collapsible-trigger-btn collapsible-trigger-btn--borders collapsible--auto-height is-open'
          aria-controls='Product-content-5-4873190277173-4873190277173'
          aria-expanded='true'
          id='collape-trigger'>
          <span
            className='spr-badge'
            id='spr_badge_4873190277173'
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
          <span
            className='collapsible-trigger__icon collapsible-trigger__icon--open up-down-arrow-move'
            role='presentation'
            id='collape-trigger-arrow'>
            <svg
              aria-hidden='true'
              focusable='false'
              role='presentation'
              className='icon icon--wide icon-chevron-down'
              viewBox='0 0 28 16'>
              <path
                d='M1.57 1.59l12.76 12.77L27.1 1.59'
                stroke-width='2'
                stroke='#000'
                fill='none'
                fill-rule='evenodd'></path>
            </svg>
          </span>
        </button>
        <div id='collape-trigger-data' className='is-open'>
          <div className='collapsible-content__inner product-reviews product-reviews--tab'>
            <div id='themobilecase-product-reviews' data-id='4873190277173'>
              <div className='spr-container'>
                <div className='spr-header' id='write-review'>
                  <h2 className='spr-header-title'>Customer Reviews</h2>
                  <div className='spr-summary'>
                    <span className='spr-starrating spr-summary-starrating'>
                      <i className='spr-icon spr-icon-star'></i>
                      <i className='spr-icon spr-icon-star'></i>
                      <i className='spr-icon spr-icon-star'></i>
                      <i className='spr-icon spr-icon-star'></i>
                      <i className='spr-icon spr-icon-star'></i>
                    </span>
                    <span className='spr-summary-caption'>
                      <span className='spr-summary-actions-togglereviews'>
                        Based on 2 reviews
                      </span>
                    </span>
                    <span className='spr-summary-actions'>
                      <a className='spr-summary-actions-newreview'>
                        Write a review
                      </a>
                    </span>
                  </div>
                </div>

                <div className='spr-content'>
                  <div
                    className='spr-form'
                    id='write-review-data'
                    style={{ display: 'none' }}>
                    <form
                      method='post'
                      action='//productreviews.themobilecasecdn.com/api/reviews/create'
                      id='new-review-form_4873190277173'
                      className='new-review-form'>
                      <input type='hidden' name='review[rating]' />
                      <input
                        type='hidden'
                        name='product_id'
                        value='4873190277173'
                      />
                      <h3 className='spr-form-title'>Write a review</h3>
                      <fieldset className='spr-form-contact'>
                        <div className='spr-form-contact-name'>
                          <label
                            className='spr-form-label'
                            for='review_author_4873190277173'>
                            Name
                          </label>
                          <input
                            className='spr-form-input spr-form-input-text '
                            id='review_author_4873190277173'
                            type='text'
                            name='review[author]'
                            placeholder='Enter your name'
                          />
                        </div>
                        <div className='spr-form-contact-email'>
                          <label
                            className='spr-form-label'
                            for='review_email_4873190277173'>
                            Email
                          </label>
                          <input
                            className='spr-form-input spr-form-input-email '
                            id='review_email_4873190277173'
                            type='email'
                            name='review[email]'
                            placeholder='john.smith@example.com'
                          />
                        </div>
                      </fieldset>

                      <fieldset className='spr-form-review'>
                        <div className='spr-form-review-rating'>
                          <label
                            className='spr-form-label'
                            for='review[rating]'>
                            Rating
                          </label>
                          <div className='main'>
                            <div className='star-border'>
                              <div className='star'></div>
                            </div>
                            <div className='star-border'>
                              <div className='star'></div>
                            </div>
                            <div className='star-border'>
                              <div className='star'></div>
                            </div>
                            <div className='star-border'>
                              <div className='star'></div>
                            </div>
                            <div className='star-border'>
                              <div className='star'></div>
                            </div>
                            <div className='ratingNum'></div>
                          </div>
                        </div>

                        <div className='spr-form-review-title'>
                          <label
                            className='spr-form-label'
                            for='review_title_4873190277173'>
                            Review Title
                          </label>
                          <input
                            className='spr-form-input spr-form-input-text '
                            id='review_title_4873190277173'
                            type='text'
                            name='review[title]'
                            placeholder='Give your review a title'
                          />
                        </div>

                        <div className='spr-form-review-body'>
                          <label
                            className='spr-form-label'
                            for='review_body_4873190277173'>
                            Body of Review
                            <span
                              role='status'
                              aria-live='polite'
                              aria-atomic='true'>
                              <span className='spr-form-review-body-charactersremaining'>
                                (1500)
                              </span>
                              <span className='visuallyhidden'>
                                characters remaining
                              </span>
                            </span>
                          </label>
                          <div className='spr-form-input'>
                            <textarea
                              className='spr-form-input spr-form-input-textarea '
                              id='review_body_4873190277173'
                              data-product-id='4873190277173'
                              name='review[body]'
                              rows='10'
                              placeholder='Write your comments here'></textarea>
                          </div>
                        </div>
                      </fieldset>

                      <fieldset className='spr-form-actions'>
                        <input
                          type='submit'
                          className='spr-button spr-button-primary button button-primary btn btn-primary'
                          value='Submit Review'
                        />
                      </fieldset>
                    </form>
                  </div>
                  <div className='spr-reviews'>
                    <div className='spr-review'>
                      <div className='spr-review-header'>
                        <div className='main-show'>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                        </div>
                        <h3 className='spr-review-header-title'> Beautiful</h3>
                        <span className='spr-review-header-byline'>
                          <strong> J. Porcelli</strong> on{' '}
                          <strong>Oct 14, 2020</strong>
                        </span>
                      </div>

                      <div className='spr-review-content'>
                        <p className='spr-review-content-body'>
                          it has the exact picture i selected, it’s a gift for
                          my girlfriend and i know she’ll love it. i can’t wait
                          to see her face! i couldn’t stop smiling when it
                          arrived today.
                        </p>
                      </div>
                      <div className='spr-review-footer'>
                        <a
                          href='#'
                          className='spr-review-reportreview'
                          id='report_98705933'
                          data-msg='This review has been reported'>
                          Report as Inappropriate
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className='spr-reviews'>
                    <div className='spr-review'>
                      <div className='spr-review-header'>
                        <div className='main-show'>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                          <div className='star-border-show'>
                            <div className='star-show'></div>
                          </div>
                        </div>
                        <h3 className='spr-review-header-title'> Beautiful</h3>
                        <span className='spr-review-header-byline'>
                          <strong> J. Porcelli</strong> on{' '}
                          <strong>Oct 14, 2020</strong>
                        </span>
                      </div>

                      <div className='spr-review-content'>
                        <p className='spr-review-content-body'>
                          it has the exact picture i selected, it’s a gift for
                          my girlfriend and i know she’ll love it. i can’t wait
                          to see her face! i couldn’t stop smiling when it
                          arrived today.
                        </p>
                      </div>
                      <div className='spr-review-footer'>
                        <a
                          href='#'
                          className='spr-review-reportreview'
                          id='report_98705933'
                          data-msg='This review has been reported'>
                          Report as Inappropriate
                        </a>
                      </div>
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

  const productInstaReview = () => {
    return (
      <Fragment>
        <button
          type='button'
          className='label collapsible-trigger ig-style collapsible-trigger-btn collapsible-trigger-btn--borders is-open'
          aria-expanded='true'
          aria-controls='Product-content-1-4873190277173-4873190277173'
          id='ig-collape-trigger'>
          Spotted on IG @theMobileCas
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
                stroke-width='2'
                stroke='#000'
                fill='none'
                fill-rule='evenodd'></path>
            </svg>
          </span>
        </button>
        <div className='-fx-image-gal' id='ig-gallery-data'>
          <div className='-fx-gal-item'>
            <div className='-fx-gal-image-thumb' tabindex='1'>
              <a href='https://codepen.io/aledebarba' target='_blank'>
                <img src='https://picsum.photos/id/237/300/300' />
              </a>
            </div>
          </div>

          <div className='-fx-gal-item'>
            <div className='-fx-gal-image-thumb' tabindex='1'>
              <a href='https://codepen.io/aledebarba' target='_blank'>
                <img src='https://picsum.photos/id/238/300/300' />
              </a>
            </div>
          </div>

          <div className='-fx-gal-item'>
            <div className='-fx-gal-image-thumb' tabindex='1'>
              <a href='https://codepen.io/aledebarba' target='_blank'>
                <img src='https://picsum.photos/id/39/300/300' />
              </a>
            </div>
          </div>

          <div className='-fx-gal-item'>
            <div className='-fx-gal-image-thumb' tabindex='1'>
              <a href='https://codepen.io/aledebarba' target='_blank'>
                <img src='https://picsum.photos/id/240/300/300' />
              </a>
            </div>
          </div>

          <div className='-fx-gal-item'>
            <div className='-fx-gal-image-thumb' tabindex='1'>
              <a href='https://codepen.io/aledebarba' target='_blank'>
                <img src='https://picsum.photos/id/341/300/300' />
              </a>
            </div>
          </div>

          <div className='-fx-gal-item'>
            <div className='-fx-gal-image-thumb' tabindex='1'>
              <a href='https://codepen.io/aledebarba' target='_blank'>
                <img src='https://picsum.photos/id/142/300/300' />
              </a>
            </div>
          </div>
        </div>
      </Fragment>
    );
  };

  const productTags = () => {
    return (
      <Fragment>
        <ul className='product-tags'>
          <li>
            <a href='/collections/all/boarding-pass'>BOARDING PASS</a>
          </li>

          <li>
            <a href='/collections/all/c-travel-themobilecase-a'>
              C-TRAVEL-themobilecase-A
            </a>
          </li>

          <li>
            <a href='/collections/all/flight'>FLIGHT</a>
          </li>

          <li>
            <a href='/collections/all/personalised'>PERSONALISED</a>
          </li>

          <li>
            <a href='/collections/all/ticket'>TICKET</a>
          </li>

          <li>
            <a href='/collections/all/travel'>TRAVEL</a>
          </li>

          <li>
            <a href='/collections/all/wanderlust'>WANDERLUST</a>
          </li>
        </ul>
      </Fragment>
    );
  };

  const productSocialShare = () => {
    return (
      <Fragment>
        <div className='social-sharing'>
          <a
            target='_blank'
            rel='noopener'
            href='//www.facebook.com/sharer.php?u=https://www.casewarehouse.com/products/customised-boarding-pass-ticket'
            className='social-sharing__link'
            title='Share on Facebook'>
            <svg
              aria-hidden='true'
              focusable='false'
              role='presentation'
              className='icon icon-facebook'
              viewBox='0 0 32 32'>
              <path
                fill='#444'
                d='M18.56 31.36V17.28h4.48l.64-5.12h-5.12v-3.2c0-1.28.64-2.56 2.56-2.56h2.56V1.28H19.2c-3.84 0-7.04 2.56-7.04 7.04v3.84H7.68v5.12h4.48v14.08h6.4z'
              />
            </svg>
            <span className='social-sharing__title' aria-hidden='true'>
              Share
            </span>
            <span className='visually-hidden'>Share on Facebook</span>
          </a>
          <a
            target='_blank'
            rel='noopener'
            href='//twitter.com/share?text=Create%20Your%20Own%20Boarding%20Pass%20Ticket%20iPhone%20Case&amp;url=https://www.casewarehouse.com/products/customised-boarding-pass-ticket'
            className='social-sharing__link'
            title='Tweet on Twitter'>
            <svg
              aria-hidden='true'
              focusable='false'
              role='presentation'
              className='icon icon-twitter'
              viewBox='0 0 32 32'>
              <path
                fill='#444'
                d='M31.281 6.733q-1.304 1.924-3.13 3.26 0 .13.033.408t.033.408q0 2.543-.75 5.086t-2.282 4.858-3.635 4.108-5.053 2.869-6.341 1.076q-5.282 0-9.65-2.836.913.065 1.5.065 4.401 0 7.857-2.673-2.054-.033-3.668-1.255t-2.266-3.146q.554.13 1.206.13.88 0 1.663-.261-2.184-.456-3.619-2.184t-1.435-3.977v-.065q1.239.652 2.836.717-1.271-.848-2.021-2.233t-.75-2.983q0-1.63.815-3.195 2.38 2.967 5.754 4.678t7.319 1.907q-.228-.815-.228-1.434 0-2.608 1.858-4.45t4.532-1.842q1.304 0 2.51.522t2.054 1.467q2.152-.424 4.01-1.532-.685 2.217-2.771 3.488 1.989-.261 3.619-.978z'
              />
            </svg>
            <span className='social-sharing__title' aria-hidden='true'>
              Tweet
            </span>
            <span className='visually-hidden'>Tweet on Twitter</span>
          </a>
          <a
            target='_blank'
            rel='noopener'
            href='//pinterest.com/pin/create/button/?url=https://www.casewarehouse.com/products/customised-boarding-pass-ticket&amp;media=//cdn.shopify.com/s/files/1/2485/7096/products/i11p-i-c-travel-themobilecase-a-1_1024x1024.jpg?v=1598275870&amp;description=Create%20Your%20Own%20Boarding%20Pass%20Ticket%20iPhone%20Case'
            className='social-sharing__link'
            title='Pin on Pinterest'>
            <svg
              aria-hidden='true'
              focusable='false'
              role='presentation'
              className='icon icon-pinterest'
              viewBox='0 0 32 32'>
              <path
                fill='#444'
                d='M27.52 9.6c-.64-5.76-6.4-8.32-12.8-7.68-4.48.64-9.6 4.48-9.6 10.24 0 3.2.64 5.76 3.84 6.4 1.28-2.56-.64-3.2-.64-4.48-1.28-7.04 8.32-12.16 13.44-7.04 3.2 3.84 1.28 14.08-4.48 13.44-5.12-1.28 2.56-9.6-1.92-11.52-3.2-1.28-5.12 4.48-3.84 7.04-1.28 4.48-3.2 8.96-1.92 15.36 2.56-1.92 3.84-5.76 4.48-9.6 1.28.64 1.92 1.92 3.84 1.92 6.4-.64 10.24-7.68 9.6-14.08z'
              />
            </svg>
            <span className='social-sharing__title' aria-hidden='true'>
              Pin it
            </span>
            <span className='visually-hidden'>Pin on Pinterest</span>
          </a>
        </div>
      </Fragment>
    );
  };

  const productSideDetail = () => {
    return (
      <Fragment>
        {/* {redirectCart()} */}
        <div className='grid__item medium-up--one-half'>
          <div className='product-single__meta'>
            <Fragment>
              <h1 className='h2 product-single__title'>{product.name}</h1>
              <span
                id='PriceA11y-4356270587957'
                className='visually-hidden'
                aria-hidden='false'>
                Regular price
              </span>
              <span className='product__price-wrap-4356270587957'>
                <span
                  id='ComparePrice-4356270587957'
                  className='product__price product__price--compare'>
                  $39.95
                </span>
              </span>
              <span
                id='ComparePriceA11y-4356270587957'
                className='visually-hidden'>
                Sale price
              </span>

              <span
                id='ProductPrice-4356270587957'
                className='product__price sale-price single-sale-price'>
                ${product.price}
              </span>

              <div className='product__unit-price product__unit-price-wrapper--4356270587957 hide'>
                <span className='product__unit-price--4356270587957'></span>/
                <span className='product__unit-base--4356270587957'></span>
              </div>
              <hr className='hr--medium' />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                accept-charset='UTF-8'
                className='product-single__form'
                enctype='multipart/form-data'>
                <input type='hidden' name='form_type' value='product' />
                <input type='hidden' name='utf8' value='✓' />
                <div className='variant-wrapper variant-wrapper--dropdown js'>
                  <label
                    className='variant__label'
                    for='SingleOptionSelector-4356270587957-option-0'>
                    Phone
                  </label>
                  <div className='variant-input-wrap' data-index='option1'>
                    <select
                      className='variant__input-4356270587957 select-style'
                      id='SingleOptionSelector-4356270587957-option-0'
                      data-index='option1'>
                      <option
                        value='iPhone 12 Mini'
                        selected='selected'
                        name='Phone'
                        className='variant-input'
                        data-index='option1'>
                        iPhone 12 Mini
                      </option>
                    </select>
                    <svg
                      className='swatch-drop-down-svg'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 129 129'
                      xlink='http://www.w3.org/1999/xlink'
                      enable-background='new 0 0 129 129'>
                      <g>
                        <path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z'></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <div className='variant-wrapper variant-wrapper--dropdown js'>
                  <label
                    className='variant__label '
                    for='SingleOptionSelector-4356270587957-option-1'>
                    Case Type
                  </label>
                  <div className='variant-input-wrap' data-index='option2'>
                    <select
                      className='casespicker '
                      id='SingleOptionSelector-4356270587957-option-1'
                      data-index='option2'>
                      <option
                        value='co'
                        className='test'
                        data-thumbnail='../assets/img/cases/cosmos.png'>
                        Cosmos
                      </option>
                      <option
                        value='bi'
                        data-thumbnail='../assets/img/cases/black-impact.png'>
                        Black Impact
                      </option>
                      <option
                        value='ick'
                        data-thumbnail='../assets/img/cases/impact-case.png'>
                        Impact Case
                      </option>
                      <option
                        value='ni'
                        data-thumbnail='../assets/img/cases/neon-impact.png'>
                        Neon Impact
                      </option>
                      <option
                        value='pfi'
                        data-thumbnail='../assets/img/cases/pink-fade-impact.png'>
                        Pink Fade Impact
                      </option>
                      <option
                        value='sc'
                        data-thumbnail='../assets/img/cases/slim-case.png'>
                        Slim Case
                      </option>
                    </select>

                    <div className='lang-select '>
                      <button
                        className='btn-select variant__input-4356270587957
                select-style'
                        value=''></button>
                      <div className='b'>
                        <ul id='a'></ul>
                      </div>
                    </div>

                    <svg
                      className='swatch-drop-down-svg-case'
                      version='1.1'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 129 129'
                      xlink='http://www.w3.org/1999/xlink'
                      enable-background='new 0 0 129 129'>
                      <g>
                        <path d='m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z'></path>
                      </g>
                    </svg>
                  </div>
                </div>

                <select
                  name='id'
                  id='ProductSelect-4356270587957'
                  className='product-single__variants no-js'>
                  <option selected='selected' value='33170092032053'>
                    iPhone 12 Mini / Impact Case - $23.95 USD
                  </option>

                  <option value='33170092064821'>
                    iPhone 12 Mini / Neon Impact - $23.95 USD
                  </option>

                  <option value='32032378650677'>
                    iPhone 7 Plus / 8 Plus / Slim Case - $23.95 USD
                  </option>

                  <option value='32032378683445'>
                    iPhone SE / Slim Case - $23.95 USD
                  </option>

                  <option value='32032378716213'>
                    iPhone 7/8 / Slim Case - $23.95 USD
                  </option>

                  <option value='32032378748981'>
                    iPhone 6 / 6s / Slim Case - $23.95 USD
                  </option>
                </select>

                <button
                  type='submit'
                  name='add'
                  id='AddToCart-4356270587957'
                  className='btn btn--full btn--no-animate add-to-cart'
                  onClick={addToCart}>
                  <span
                    id='AddToCartText-4356270587957'
                    data-default-text='Add to cart'>
                    Add to cart
                  </span>
                </button>

                <textarea
                  id='VariantsJson-4356270587957'
                  className='hide'
                  aria-hidden='true'>
                  {' '}
                </textarea>

                <textarea
                  id='CurrentVariantJson-4356270587957'
                  className='hide'
                  aria-hidden='true'></textarea>
              </form>

              <div className='product-single__description rte'>
                <p>{product.description}</p>

                <p>
                  The ticket can be personalised to feature your own name as the
                  passenger, and the date can be changed as well. The perfect
                  case for travelers, frequent flyers, and aviation lovers
                  alike!
                </p>
              </div>
            </Fragment>

            <div className='collapsibles-wrapper collapsibles-wrapper--border-bottom'>
              {productReview()}
              {productInstaReview()}
            </div>
            {productSocialShare()}
            {productTags()}
          </div>
        </div>
      </Fragment>
    );
  };

  const relatedProducts = () => {
    return (
      <Fragment>
        {productDetailPage()}
        <div
          id='themobilecase-section-product-recommendations'
          className='themobilecase-section'>
          <div
            id='Recommendations-4409464487989'
            data-section-id='4409464487989'
            data-section-type='product-recommendations'
            data-enable='true'
            data-product-id='4409464487989'
            data-url='/recommendations/products'
            data-limit='6'>
            <div
              data-section-id='4409464487989'
              data-subsection=''
              data-section-type='collection-template'
              className='index-section'>
              <div className='page-width'>
                <header className='section-header'>
                  <h3 className='section-header__title'>You may also like</h3>
                </header>
              </div>

              <div className='page-width page-width--flush-small'>
                <div className='grid-overflow-wrapper'>
                  <div className='product-recommendations-placeholder'>
                    <div className='product-recommendations'>
                      <div
                        className='product-single__related grid grid--uniform aos-init aos-animate'
                        data-aos='overflow__animation'>
                        {relatedProduct.map((rproduct) => {
                          return (
                            <div
                              key={rproduct._id}
                              onClick={() => {
                                setProductId(rproduct._id);
                              }}
                              className='grid__item grid-product small--one-half medium-up--one-fifth aos-init aos-animate'
                              data-aos='row-of-5'>
                              <div className='grid-product__content'>
                                <div className='grid-product__tag grid-product__tag--sale'>
                                  Save $6
                                </div>
                                <span className='grid-product__link'>
                                  <div className='grid-product__image-mask'>
                                    <div
                                      className='image-wrap'
                                      style={{
                                        height: '0',
                                        paddingBottom: '133.333333333%',
                                      }}>
                                      <img
                                        className='grid-product__image lazyautosizes lazyloaded'
                                        data-widths='[180, 360, 540, 720, 900, 1080]'
                                        data-aspectratio='0.75'
                                        data-sizes='auto'
                                        alt='Abstract Faces (Customised) Impact Phone Case for iPhone 11 Pro Max'
                                        data-srcset={rproduct.photo.data}
                                        sizes='160px'
                                        srcSet={rproduct.photo.data}
                                      />
                                      <noscript>
                                        <img
                                          className='grid-product__image lazyloaded'
                                          src={rproduct.photo.data}
                                          alt='Abstract Faces (Customised) Impact Phone Case for iPhone 11 Pro Max'
                                        />
                                      </noscript>
                                    </div>
                                  </div>

                                  <div className='grid-product__meta'>
                                    <div className='grid-product__title'>
                                      {rproduct.name}
                                    </div>
                                    <div className='grid-product__price'>
                                      <span className='visually-hidden'>
                                        Regular price
                                      </span>
                                      <span className='grid-product__price--original'>
                                        $27.95
                                      </span>
                                      <span className='visually-hidden'>
                                        Sale price
                                      </span>
                                      <span className='sale-price'>
                                        from ${rproduct.price}
                                      </span>
                                    </div>
                                    <span
                                      className='spr-badge'
                                      id='spr_badge_4858639286325'
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
                                      <span className='spr-badge-caption'>
                                        4 reviews
                                      </span>
                                    </span>
                                  </div>
                                </span>
                                <div className='grid-product__colors'>
                                  <span
                                    className='color-swatch color-swatch--small'
                                    style={{
                                      backgroundImage:
                                        'url(https://cdn.shopify.com/s/files/1/2485/7096/t/122/assets/impact-case_50x.png)',
                                      backgroundColor: 'case',
                                    }}
                                    aria-label='Abstract Faces (Customised) iPhone Case - Impact Case'></span>
                                  <span
                                    className='color-swatch color-swatch--small'
                                    style={{
                                      backgroundImage:
                                        'url(https://cdn.shopify.com/s/files/1/2485/7096/t/122/assets/black-impact_50x.png)',
                                      backgroundColor: 'impact',
                                    }}
                                    aria-label='Abstract Faces (Customised) iPhone Case - Black Impact'></span>
                                  <span
                                    className='color-swatch color-swatch--small'
                                    style={{
                                      backgroundImage:
                                        'url(https://cdn.shopify.com/s/files/1/2485/7096/t/122/assets/pink-fade-impact_50x.png)',
                                      backgroundColor: 'impact',
                                    }}
                                    aria-label='Abstract Faces (Customised) iPhone Case - Pink Fade Impact'></span>
                                  <span
                                    className='color-swatch color-swatch--small'
                                    style={{
                                      backgroundImage:
                                        'url(https://cdn.shopify.com/s/files/1/2485/7096/t/122/assets/neon-impact_50x.png)',
                                      backgroundColor: 'impact',
                                    }}
                                    aria-label='Abstract Faces (Customised) iPhone Case - Neon Impact'></span>
                                  <span
                                    className='color-swatch color-swatch--small'
                                    style={{
                                      backgroundImage:
                                        'url(https://cdn.shopify.com/s/files/1/2485/7096/t/122/assets/slim-case_50x.png)',
                                      backgroundColor: 'case',
                                    }}
                                    aria-label='Abstract Faces (Customised) iPhone Case - Slim Case'></span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
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

  const singleProduct = () => {
    return (
      <Fragment>
        {/* Main Content Begin */}
        <main className='main-content' id='MainContent'>
          <div
            id='themobilecase-section-product-template'
            className='themobilecase-section'>
            <div
              id='ProductSection-4356270587957'
              className='product-section'
              data-section-id='4356270587957'
              data-section-type='product-template'
              data-enable-history-state='true'>
              <div className='page-content'>
                <div className='page-width'>
                  {breadCrumb()}
                  <div className='grid'>
                    {productSlider()}
                    {productSideDetail()}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {relatedProducts()}
        </main>

        {/* Main Content End */}
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Layout childComponent={singleProduct()}></Layout>
    </Fragment>
  );
}

export default SingleProduct;
