import React, { Component } from 'react';
import Slider from 'react-slick';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

export default class ProductSlider extends Component {
  // State
  // =========================================== //
  state = {
    nav1: null,
    nav2: null,
    slides: [],
  };

  // Lifecycle
  // =========================================== //
  componentDidMount() {
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
      slides: this.props.slides,
    });
  }

  componentDidUpdate() {
    if (this.props.slides !== this.state.slides) {
      this.setState({
        nav1: this.slider1,
        nav2: this.slider2,
        slides: this.props.slides,
      });
    }
  }

  render() {
    const { slides } = this.state;

    const slickSettingsVerticalNav = {
      arrows: false,
      vertical: true,
      slidesToShow: 4,
      swipeToSlide: false,
      focusOnSelect: true,
      verticalSwiping: true,
      asNavFor: this.state.nav2,
      ref: (slider) => (this.slider1 = slider),
    };

    const slickSettingsVerticalMain = {
      arrows: false,
      slidesToShow: 1,
      asNavFor: this.state.nav1,
      ref: (slider) => (this.slider2 = slider),
    };

    return (
      <Row>
        <Col xs={3} style={{ maxHeight: '500px' }}>
          <Slider {...slickSettingsVerticalNav}>
            {slides.map((slide, i) => (
              <div className='d-block' key={i}>
                <img src={slide} className='slide-nav' alt='' width='100px' />
              </div>
            ))}
          </Slider>
        </Col>

        <Col xs={9} style={{ maxHeight: '500px' }}>
          <Slider {...slickSettingsVerticalMain}>
            {slides.map((slide, i) => (
              <div key={i} className='d-block'>
                <img src={slide} className='slide-main' alt='' />
              </div>
            ))}
          </Slider>
        </Col>
      </Row>
    );
  }
}
