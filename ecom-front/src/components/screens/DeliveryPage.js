import React, { Fragment } from 'react';
import Layout from '../core/Layout';

function DeliveryPage() {
  const deliveryPage = () => {
    return (
      <Fragment>
        {/* Content Begin  */}
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
              <span>Free Shipping & Returns</span>
            </nav>
            <div className='grid'>
              <div className='grid__item medium-up--three-quarters medium-up--push-one-eighth'>
                <header className='section-header'>
                  <h1 className='section-header__title'>
                    Free Shipping & Returns
                  </h1>
                </header>
                <div className='rte rte--nomargin'>
                  <div style={{ textAlign: 'left' }}>
                    <img src='' width='' height='' />
                  </div>
                  <p>
                    All Case Warehouse orders are shipped within 2 business days
                    &amp; include tracking. We ship orders with Royal Mail, USPS
                    or Fedex Express. 
                    <br />
                    <br />
                    <strong>
                      Delivery times and cost estimates are shown below. 
                    </strong>
                  </p>
                  <h1>
                    <strong>🇬🇧 UK Shipping</strong>
                  </h1>
                  <p>
                    <strong>
                      Standard shipping 
                      <span style={{ color: '#339966' }}>
                        (3-4 Business Days)
                        <br />
                      </span>
                    </strong>
                    <em>
                      Cost : FREE
                      <br />
                      <strong>
                        Express shipping 
                        <span style={{ color: '#339966' }}>
                          (1-2 Business Days)
                          <br />
                        </span>
                      </strong>
                      Cost : £2.99
                      <br />
                    </em>
                  </p>
                  <hr />
                  <h1>🇺🇸 USA Shipping</h1>
                  <p>
                    <strong>
                      Standard shipping 
                      <span style={{ color: '#339966' }}>
                        (Upto 12 Business Days)
                        <br />
                      </span>
                    </strong>
                    <em>Cost : FREE</em>
                  </p>
                  <p>
                    <strong>
                      Express Shipping 
                      <span style={{ color: '#339966' }}>
                        (2-3 Business Days)
                        <br />
                      </span>
                    </strong>
                    <em>Cost : £9 (Approx $12 USD)</em>
                  </p>
                  <hr />
                  <h1>🇪🇺 EU &amp; ROW Shipping</h1>
                  <p>
                    <strong>
                      Premium shipping{' '}
                      <span style={{ color: '#339966' }}>
                        (Upto 12 Business Days)
                        <br />
                      </span>
                    </strong>
                    <em>Cost : FREE</em>
                  </p>
                  <p>
                    <strong>
                      Express Shipping{' '}
                      <span style={{ color: '#339966' }}>
                        (2-3 Business Days)
                        <br />
                      </span>
                    </strong>
                    <em>Cost : £9</em>
                  </p>
                  <hr />
                  <h1>HOW TO RETURN YOUR ORDER</h1>
                  <p>
                    <span>See our </span>
                    <a
                      href='returns.html'
                      target='_blank'
                      title='Case Warehouse Returns'
                      rel='noopener noreferrer'>
                      returns
                    </a>
                     
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='18'
                      viewbox='0 0 18 18'>
                      <path
                        fill='#2D2D2D'
                        fill-rule='evenodd'
                        d='M14 12h2V2H6v2h8v8zm0 2v4H0V4h4V0h14v14h-4zM4 6H2v10h10V6H4z'></path>
                    </svg>
                    <span> page for more information</span>
                  </p>
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
      <Layout childComponent={deliveryPage()} />
    </Fragment>
  );
}

export default DeliveryPage;
