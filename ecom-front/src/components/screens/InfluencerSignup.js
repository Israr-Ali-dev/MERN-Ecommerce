import React, { Fragment } from 'react';
import Layout from '../core/Layout';

function InfluencerSignup() {
  const influencerPage = () => {
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
              <span>Case Warehouse Influencer Signup</span>
            </nav>
            <div className='grid'>
              <div className='grid__item medium-up--three-quarters medium-up--push-one-eighth'>
                <header className='section-header'>
                  <h1 className='section-header__title'>
                    Case Warehouse Influencer Signup
                  </h1>
                </header>
                <div className='rte rte--nomargin'>
                  <p>
                    <strong>
                      Rep the Case Warehouse brand, protect your iPhone, get
                      exclusive discounts and a hella lot more… Simply fill out
                      the below form and tell us a little bit about yourself.
                    </strong>
                  </p>
                  <div className='form-container'>
                    <form name='submit-to-google-sheet'>
                      <label for='name'>Your name</label>{' '}
                      <input name='name' type='text' required='' />{' '}
                      <label for='email'>Your email</label>{' '}
                      <input name='email' type='email' required='' />{' '}
                      <label for='instagram_username'>
                        Your Instagram username
                      </label>{' '}
                      <input
                        name='instagram_username'
                        type='text'
                        required=''
                      />{' '}
                      <label for='follower_count'>Your follower count</label>{' '}
                      <input name='follower_count' type='text' required='' />{' '}
                      <label for='location'>Your location</label>{' '}
                      <input name='location' type='text' required='' />
                      <label for='about'>
                        Why would you like to work with Case Warehouse?
                      </label>{' '}
                      <textarea name='about' required=''></textarea> <br />{' '}
                      <br />{' '}
                      <button id='go' type='submit'>
                        Send
                      </button>
                    </form>
                    <div className='loading js-loading is-hidden'>
                      <div className='loading-spinner'>
                        <svg>
                          <circle
                            cx='25'
                            cy='25'
                            r='20'
                            fill='none'
                            stroke-width='2'
                            stroke-miterlimit='10'></circle>
                        </svg>
                      </div>
                    </div>
                    <p className='js-success-message is-hidden'>
                      Thank you-your details have been submitted successfully!
                      <br />
                      We'll now have a good look over your content and if we
                      feel you're a good fit, will be in touch with in the next
                      couple of weeks.
                    </p>
                    <p className='js-error-message is-hidden'>
                      Oops! There seems to have been an error with your
                      submission!
                      <br /> Don't worry, there could be an issue at our end.
                      <br />
                      Please get in touch at hello@casewarehouse.com and we'll
                      look into it!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Main Content Begin */}
      </Fragment>
    );
  };

  return (
    <Fragment>
      <Layout childComponent={influencerPage()} />
    </Fragment>
  );
}

export default InfluencerSignup;
