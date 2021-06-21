import React, { Fragment } from 'react';
import Layout from '../core/Layout';

function TrackOrder() {
  const trackOrderPage = () => {
    return (
      <Fragment>
        {/* Main Content Begin */}
        <main className='main-content' id='MainContent'>
          <div className='page-width page-content'>
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
              <span>Track My Order</span>
            </nav>
            <div className='grid'>
              <div className='grid__item medium-up--three-quarters medium-up--push-one-eighth'>
                <header className='section-header'>
                  <h1 className='section-header__title'>Track My Order</h1>
                </header>
                <div className='rte rte--nomargin'>
                  <p>
                    All orders are currently shipped from the UK within 2
                    business days &amp; include tracking. We ship orders with{' '}
                    <strong>Royal Mail</strong>, <strong>USPS</strong> or{' '}
                    <strong>Fedex</strong>. For full delivery times please see
                    our 
                    <a
                      href='delivery-info.html'
                      title='Free Shipping &amp; Returns'>
                      Shipping &amp; Returns
                    </a>
                     page.
                  </p>
                  <p>
                    <span>We dispatch orders on </span>
                    <strong>MONDAY - FRIDAY.</strong>
                    <span>
                       This means orders placed on a Friday will be dispatched
                      on the Monday so don't panic if you don't receive your
                      shipping confirmation over the weekend!
                    </span>
                  </p>
                  <h2>How do I track my order?</h2>
                  <p>
                    As soon as your order has been fulfilled, you'll receive a
                    <strong>shipping confirmation email</strong> titled "Your
                    order is on the way". You will then be able to{' '}
                    <strong>track your order</strong> through the
                    <strong> tracking link on the email. </strong>
                  </p>
                  <p>
                    If you haven't received an email yet, not to worry! Your
                    order will usually take around 24-48 hours to be
                    dispatched. 
                  </p>
                  <p> </p>
                  <p>
                    For more information please see our{' '}
                    <a href='faq.php' title='FAQ Page'>
                      FAQ{' '}
                    </a>
                    Page
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Main Content End */}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Layout childComponent={trackOrderPage()} />
    </Fragment>
  );
}

export default TrackOrder;
