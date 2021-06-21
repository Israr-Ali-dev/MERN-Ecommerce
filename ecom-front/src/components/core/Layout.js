import { React, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

export default function Layout(props) {
  useEffect(() => {
    //An array of assets
    // let scripts = [{ src: '/assets/js/custom.js' }];
    // //Append the script element on each iteration
    // scripts.map((item) => {
    //   const script = document.createElement('script');
    //   script.src = item.src;
    //   script.async = true;
    //   document.body.appendChild(script);
    // });
    // window.scrollTo(0, 0);
  });
  // useEffect(() => {
  // .remove(
  //     '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet"/>'
  //   );
  // }, []);
  return (
    <div>
      <Header />
      {props.childComponent}
      <Footer />
    </div>
  );
}
