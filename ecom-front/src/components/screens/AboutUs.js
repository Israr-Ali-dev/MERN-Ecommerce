import React, { Fragment } from 'react';
import Layout from '../core/Layout';

function AboutUs() {
  const AboutPage = () => {
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
              <span>About Us</span>
            </nav>
            <div className='grid'>
              <div className='grid__item medium-up--three-quarters medium-up--push-one-eighth'>
                <header className='section-header'>
                  <h1 className='section-header__title'>About Us</h1>
                </header>
                <div className='rte rte--nomargin'>
                  <h2>
                    <img src='' alt='' width='' height='' />
                  </h2>
                  <h2>Who are theMobileCase?</h2>
                  <p>
                    Founded in 2020, in the heart of Scotland. theMobileCase are
                    the ultimate one stop shop for all your iPhone case needs.
                    Design obsessed and quality assured. Look no further. 
                  </p>
                  <p>
                    <span>
                      We strive to make sure that no matter your bank
                      balance, you, our trend-led customer can always find a new
                      case design to be obsessed with, while protecting your
                      phone at the same time. 
                    </span>
                  </p>
                  <div className='covet-pics-gallery' data-id='122214'></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        {/* Main Content Footer */}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Layout childComponent={AboutPage()} />
    </Fragment>
  );
}

export default AboutUs;
