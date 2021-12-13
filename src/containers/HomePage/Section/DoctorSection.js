import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from "../../../store/actions";
import { withRouter } from "react-router";

class DoctorSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorRedux !== this.props.topDoctorRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorRedux,
      });
    }
  }
  componentDidMount() {
    this.props.loadTopDoctor();
  }
  handleViewDetailDocotor = (doctor) => {
    console.log("check detail doctor: ", doctor);
    if (this.props.history) {
      this.props.history.push(`/detail-doctor/${doctor.id}`);
    }
  };
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4, //number of pictures on the slide
      slidesToScroll: 2,
    };
    //console.log("check topDoctorRedux: ", this.props.topDoctorRedux);
    let arrDoctors = this.state.arrDoctors;
    return (
      <div className="section-share section-doctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">Bác sĩ phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  // if (index == 0) {
                  //   console.log("check item :", item.positionData.valueVi);
                  // }
                  let nameDoctor = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => this.handleViewDetailDocotor(item)}
                    >
                      <div className="out-bg">
                        <div className="bg-image section-doctor" />
                      </div>
                      <div className="position text-center">
                        <div className="text-section">{nameDoctor}</div>
                        <div>Xương khớp</div>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctor: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DoctorSection)
);
