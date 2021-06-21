import React, { Fragment } from 'react';
import Layout from '../core/Layout';

function ShopInstagram() {
  const shopInstaPage = () => {
    return (
      <Fragment>
        {/* Main Content Begin  */}
        <main className='main-content' id='MainContent'>
          <div className='page-content page-full'>
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
              <span>SHOP OUR INSTAGRAM</span>
            </nav>
            <div className='page-width'>
              <header className='section-header'>
                <h1 className='section-header__title'>SHOP OUR INSTAGRAM</h1>
              </header>
            </div>
            <div className='rte rte--nomargin'>
              <p>
                Tag
                <a href='#' title='Casewarehouse Instagram'>
                  <strong>@theMobileCase</strong>
                </a>
                in your Mirror Selfies &amp; photos to be featured here on our
                Instagram Shop Customer Gallery.
              </p>

              <div className='covet-pics-gallery' data-id='107757'></div>
            </div>
          </div>
        </main>

        {/* Main Content Footer */}
      </Fragment>
    );
  };
  return (
    <Fragment>
      <Layout childComponent={shopInstaPage()} />
    </Fragment>
  );
}

export default ShopInstagram;
