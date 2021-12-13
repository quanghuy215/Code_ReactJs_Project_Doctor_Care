import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import specialityImg from "../../../assets/images/speciality.jpg";

class Speciality extends Component {
  render() {
    return (
      <div className="section-share section-speciality">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-image section-speciality" />
                <div className="text-section">Cơ xương khớp</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-speciality" />
                <div className="text-section">Thần kinh</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-speciality" />
                <div className="text-section">Tiêu hoá</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-speciality" />
                <div className="text-section">Cột sống</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-speciality" />
                <div className="text-section">Nhi khoa</div>
              </div>
              <div className="section-customize">
                <div className="bg-image section-speciality" />
                <div className="text-section">Da liễu</div>
              </div>
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
