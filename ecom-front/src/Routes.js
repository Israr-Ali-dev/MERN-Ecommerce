import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './components/user/Signup';
import Signin from './components/user/Signin';
import Home from './components/core/Home';
import Dashboard from './components/user/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import AdminDashboard from './components/admin/AdminDashboard';
import SingleProduct from './components/screens/SingleProduct';
import ShopPage from './components/screens/ShopPage';
import Cart from './components/screens/Cart';
import noFound from './components/screens/noFound';
import Checkout from './components/screens/Checkout';
// import Account from './components/screens/Account';
import AboutUs from './components/screens/AboutUs';
import ContactUs from './components/screens/ContactUs';
import DeliveryPage from './components/screens/DeliveryPage';
import Returns from './components/screens/Returns';
import InfluencerSignup from './components/screens/InfluencerSignup';
import Job from './components/screens/Job';
import ShopInstagram from './components/screens/ShopInstagram';
import TrackOrder from './components/screens/TrackOrder';
import FAQ from './components/screens/FAQ';

function routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/signup' exact component={Signup} />
          <Route path='/signin' exact component={Signin} />
          <PrivateRoute path='/user/dashboard' exact component={Dashboard} />
          <Route path='/admin/dashboard' exact component={AdminDashboard} />
          <Route path='/single' exact component={SingleProduct} />
          <Route path='/shop' exact component={ShopPage} />
          <Route path='/cart' exact component={Cart} />
          <Route path='/checkout' exact component={Checkout} />
          <Route path='/about-us' exact component={AboutUs} />
          <Route path='/contact-us' exact component={ContactUs} />
          <Route path='/delivery-info' exact component={DeliveryPage} />
          <Route path='/returns' exact component={Returns} />
          <Route path='/influencer-signup' exact component={InfluencerSignup} />
          <Route path='/job' exact component={Job} />
          <Route path='/shop-instagram' exact component={ShopInstagram} />
          <Route path='/track-order' exact component={TrackOrder} />
          <Route path='/faq' exact component={FAQ} />
          <Route component={noFound} />
          {/* <PrivateRoute path='/user/profile' exact component={Account} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default routes;
