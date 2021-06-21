import React, { Fragment } from 'react';
import Layout from '../core/Layout';

function ContactUs() {
  const ContactPage = () => {
    return (
      <Fragment>
        {/* Content Begin */}
        <main className='main-content' id='MainContent'>
          <div
            id='themobilecase-section-page-contact-template'
            className='themobilecase-section'>
            <div className='page-width page-content page-content--with-blocks'>
              <div className='grid'>
                <div className='grid__item medium-up--three-quarters medium-up--push-one-eighth'>
                  <nav
                    className='breadcrumb'
                    role='navigation'
                    aria-label='breadcrumbs'>
                    <a href='index.php' title='Back to the frontpage'>
                      Home
                    </a>
                    <span className='divider' aria-hidden='true'>
                      /
                    </span>
                    <span>Contact Us</span>
                  </nav>
                  <header className='section-header'>
                    <h1 className='section-header__title'>Contact Us</h1>
                  </header>
                  <div className='rte text-spacing'>
                    <h3 style={{ textAlign: 'center' }}>
                      To track your order, please{' '}
                      <a href='track-my-order.html'>click here</a>.
                    </h3>
                    <p>
                      Please drop us a message, we would love to hear from you.
                      If you are messaging about an order please include your{' '}
                      <strong>order ID</strong>, <strong>name</strong> or{' '}
                      <strong>email address</strong>.
                    </p>
                    <p>
                      If you have any enquiries with regards to sales, Returns,
                      deliveries, sizes, etc you can also email<span> </span>
                      <em>
                        <strong>hello@casewarehouse.com</strong>
                      </em>
                    </p>
                    <p>
                      Our Mailing Address : Case Warehouse, Unit 6D,
                      Catherinefield Ind Est, Dumfries, DG1 3PQ, United
                      Kingdom. 
                      <br />
                      Business Hours : Mon - Fri 9am - 5pm GMT{' '}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='page-blocks'>
              <div>
                <div className='index-section'>
                  <div className='page-width'>
                    <div className='grid'>
                      <div className='grid__item medium-up--three-quarters medium-up--push-one-eighth'>
                        <div className='form-vertical'>
                          <form
                            method='post'
                            action=''
                            id='contact-page-contact-template-0'
                            accept-charset='UTF-8'
                            className='contact-form'>
                            <input
                              type='hidden'
                              name='form_type'
                              value='contact'
                            />
                            <input type='hidden' name='utf8' value='✓' />

                            <div className='grid grid--small'>
                              <div className='grid__item medium-up--one-half'>
                                <label for='ContactFormName-page-contact-template-0'>
                                  Name
                                </label>
                                <input
                                  type='text'
                                  id='ContactFormName-page-contact-template-0'
                                  className='input-full'
                                  name='contact[name]'
                                  autocapitalize='words'
                                  value=''
                                />
                              </div>

                              <div className='grid__item medium-up--one-half'>
                                <label for='ContactFormEmail-page-contact-template-0'>
                                  Email
                                </label>
                                <input
                                  type='email'
                                  id='ContactFormEmail-page-contact-template-0'
                                  className='input-full'
                                  name='contact[email]'
                                  autocorrect='off'
                                  autocapitalize='off'
                                  value=''
                                />
                              </div>
                            </div>
                            <label for='ContactFormMessage-page-contact-template-0'>
                              Message
                            </label>
                            <textarea
                              rows='5'
                              id='ContactFormMessage-page-contact-template-0'
                              className='input-full'
                              name='contact[body]'></textarea>

                            <button type='submit' className='btn'>
                              Send
                            </button>
                            <p data-spam-detection-disclaimer>
                              This site is protected by reCAPTCHA and the Google{' '}
                              <a href='https://policies.google.com/privacy'>
                                Privacy Policy
                              </a>{' '}
                              and
                              <a href='https://policies.google.com/terms'>
                                Terms of Service
                              </a>{' '}
                              apply.
                            </p>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Content End */}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Layout childComponent={ContactPage()} />
    </Fragment>
  );
}

export default ContactUs;
