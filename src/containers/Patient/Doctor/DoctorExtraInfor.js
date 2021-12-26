import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import {
  getScheduleDoctorByDate,
  getExtraInforDoctorById,
} from "../../../services/userService";
class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }
  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode == 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode == 0) {
        this.setState({
          extraInfor: res.data,
        });
      }

      // console.log("check data: ", res);
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor, extraInfor } = this.state;
    //console.log("check state ", this.state);
    //console.log("check name clinic ", extraInfor.nameClinic);
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text_address">ĐỊA CHỈ KHÁM</div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-clinic">
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short_infor">
              GIÁ KHÁM:{" "}
              {extraInfor && extraInfor.priceTypeData
                ? extraInfor.priceTypeData.valueVI
                : ""}{" "}
              VND
              <span onClick={() => this.showHideDetailInfor(true)}>
                Xem chi tiết
              </span>
            </div>
          )}
          {isShowDetailInfor === true && (
            <>
              <div className="title-price">GIÁ KHÁM: </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">Giá khám </span>
                  <span className="right">
                    {extraInfor && extraInfor.priceTypeData
                      ? extraInfor.priceTypeData.valueVI
                      : ""}{" "}
                    VND
                  </span>
                </div>
                <div className="note">
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </div>
              </div>
              <div className="payment-method">
                Người bệnh có thể thanh toán chi phí bằng hình thức:{" "}
                {extraInfor && extraInfor.paymentTypeData
                  ? extraInfor.paymentTypeData.valueVI
                  : ""}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
