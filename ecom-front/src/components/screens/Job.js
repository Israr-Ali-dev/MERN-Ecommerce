import React, { Fragment } from 'react';
import Layout from '../core/Layout';

function Job() {
  const jobPage = () => {
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
              <span>Jobs at Case Warehouse</span>
            </nav>
            <div className='grid'>
              <div className='grid__item medium-up--three-quarters medium-up--push-one-eighth'>
                <header className='section-header'>
                  <h1 className='section-header__title'>
                    Jobs at Case Warehouse
                  </h1>
                </header>
                <div className='rte rte--nomargin'>
                  <h1>Available Positions</h1>
                  <hr />
                  <h2>Social Media Manager</h2>
                  <p>
                    <b>
                      We're looking for a talented Social media manager to take
                      our Instagram and other social media accounts to the next
                      level. 
                    </b>
                  </p>
                  <p>
                    <span>
                      The role will involve you being involved in all aspects of
                      social media management, influencers, collaborations and
                      will offer you a chance to get involved with a rapidly
                      growing international organisation.
                      <br />
                      <br />
                    </span>
                    Applicants please<span> </span>
                    <strong>contact us</strong>
                    <span> </span>with your CV. 
                  </p>
                  <p> </p>
                  <hr />
                  <h2>Graphic Designer</h2>
                  <p>
                    <b>Graphic</b>
                    <span> </span>
                    <b>Designer</b>
                    <span>
                       / Creative Artworker required to join us for work in all
                      aspects of design and print, located in Dumfries UK. This
                      job is also open to remote. 
                    </span>
                  </p>
                  <p>
                    <span>
                      The role will involve you being involved in all aspects
                      of design, print and will offer you a chance to get
                      involved with a rapidly growing international
                      organisation.
                      <br />
                      <br />
                    </span>
                    Applicants please <strong>contact us</strong> with your CV. 
                  </p>

                  <hr />
                  <h2>Marketing Manager</h2>
                  <p>
                    <span>
                      They are currently looking to recruit an enthusiastic
                      Marketing Assistant to join our team based at their head
                      office in Dumfries  UK
                    </span>
                  </p>
                  <p>
                    <span>
                      The role will involve you being involved in all aspects of
                      the marketing mix and will offer you a chance to get
                      involved with a rapidly growing international
                      organisation.
                    </span>
                  </p>
                  <p>
                    <span>
                      Applicants please <strong>contact us</strong> with your
                      CV. 
                    </span>
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
      <Layout childComponent={jobPage()} />
    </Fragment>
  );
}

export default Job;
