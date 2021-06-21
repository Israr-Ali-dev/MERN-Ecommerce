import React, { Component } from 'react';
import Slider from 'react-slick';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

export default class InstaSlider extends Component {
  // State
  // =========================================== //
  state = {
    slides: [
      'assets/img/insta.jpg',
      'assets/img/insta.jpg',
      'assets/img/insta.jpg',
      'assets/img/insta.jpg',
      'assets/img/insta.jpg',
      'assets/img/insta.jpg',
      'assets/img/insta.jpg',
      'assets/img/insta.jpg',
      'assets/img/insta.jpg',
    ],
  };

  render() {
    const { slides } = this.state;

    const instaSlickSlider = {
      arrows: false,
      slidesToShow: 6,
      swipeToSlide: false,
      focusOnSelect: true,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5,
            infinite: true,

            // dots: true
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 4,
            slidesToScroll: 4,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
        {
          breakpoint: 450,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            mobileFirst: true,
          },
        },
        {
          breakpoint: 300,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            mobileFirst: true,
          },
        },
      ],
    };

    return (
      <Slider
        {...instaSlickSlider}
        className='responsive-ig-slider'
        style={{ maxHeight: '280px' }}>
        {slides.map((slide, i) => (
          <div key={i} className='slide-box'>
            <img src={slide} src='assets/img/insta.jpg' alt='insta' />
          </div>
        ))}
      </Slider>
    );
  }
}
