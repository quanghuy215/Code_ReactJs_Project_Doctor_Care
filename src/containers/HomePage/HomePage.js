import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Speciality from "./Section/Speciality";
import './HomePage.scss'
import DoctorSection from "./Section/DoctorSection";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4, //number of pictures on the slide
      slidesToScroll: 2,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true}/>
        <Speciality settings={settings} />
        <DoctorSection settings={settings} />
        <About/>
        <HomeFooter/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
