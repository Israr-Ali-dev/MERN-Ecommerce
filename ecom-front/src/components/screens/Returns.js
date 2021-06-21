import React, { Fragment } from 'react';
import Layout from '../core/Layout';

function Returns() {
  const returnsPage = () => {
    return (
      <Fragment>
        {/* Main Content Begin  */}
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
              <span>Returns & Exchanges</span>
            </nav>
            <div className='grid'>
              <div className='grid__item medium-up--three-quarters medium-up--push-one-eighth'>
                <header className='section-header'>
                  <h1 className='section-header__title'>Returns & Exchanges</h1>
                </header>

                <div className='rte rte--nomargin'>
                  <p>
                    <b>
                      <span>RETURN POLICY:</span>
                    </b>
                  </p>
                  <ul>
                    <li>
                      To begin a return, please{' '}
                      <strong>
                        <a
                          href='mailto:hello@casewarehouse.com?subject=Case%20Warehouse%20Return%20Request&amp;body=Your%20Name%20%3A%0D%0AOrder%20ID%20%3A%0D%0AReturn%20Reason%20%3A'
                          target='_blank'
                          title='Case Warehouse Return Email'
                          rel='noopener noreferrer'>
                          click here
                        </a>
                      </strong>{' '}
                      to email us. 
                    </li>
                    <li>
                      To qualify, please start your return within 30 days of
                      delivery. 
                    </li>
                    <li>
                      Item(s) must be unused and in the original packaging
                    </li>
                    <li>
                      Returns on customized item(s) for reasons other than a
                      Case Warehouse error will be subject to a 50% processing
                      fee on the refund amount (after adjustment of
                      discount/shipping, if required).
                    </li>
                    <li>
                      Please allow 5-7 business days for your return to be
                      processed.
                    </li>
                  </ul>
                  <p>
                    <b>
                      <span>EXCHANGE POLICY:</span>
                    </b>
                  </p>
                  <p>
                    We currently do not offer exchanges. To make our return
                    process as easy as possible we only offer returns. If you
                    want to exchange an item please create a return and place a
                    separate new order for the correct item. 
                  </p>
                  <p>
                    If you are based in the UK, we will provide you a free
                    return label to return or exchange your item(s). For
                    customers outside the UK, customers are responsible for
                    return shipping expenses.
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
      <Layout childComponent={returnsPage()} />
    </Fragment>
  );
}

export default Returns;
