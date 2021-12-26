import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment, { locale } from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
import BookingModal from "./Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: {},
    };
  }
  async componentDidMount() {
    //console.log('moment vi :',moment(new Date()).format("dddd - DD/MM"));
    //console.log('moment en :',moment(new Date()).locale("en").format("ddd - DD/MM"));
    //console.log("check alldays: ", allDays);
    let allDays = this.getArrDays();
    if (this.props.doctorIdFromParent) {
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }

    this.setState({
      allDays: allDays,
    });
  }
  getArrDays = () => {
    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      if (i === 0) {
        let today = moment(new Date()).format("DD/MM");
        let today2 = `Hôm nay - ${today}`;
        obj.label = today2;
      } else {
        let labelUpper = moment(new Date())
          .add(i, "days")
          .format("dddd - DD/MM");
        obj.label = this.capitalizeFirstLetter(labelUpper);
      }

      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(obj);
    }
    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays();
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    //console.log('check id: ',this.props.detailDoctor)
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let res = await getScheduleDoctorByDate(doctorId, date);

      if (res && res.errCode === 0) {
        this.setState({ allAvailableTime: res.data ? res.data : [] });
      }

      console.log("check res from schedule: ", res);
    }

    //console.log("event onchange date value: ", event.target.value);
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  handleClickScheduleTime = (time) => {
    //console.log('check time: ', time)
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeModalBooking = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calender">
              <i className="fas fa-calendar-alt">
                <span>Lịch khám</span>
              </i>
            </div>
            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                allAvailableTime.map((item, index) => {
                  return (
                    <button
                      key={index}
                      onClick={() => this.handleClickScheduleTime(item)}
                    >
                      {item.timeTypeData.valueVI}
                    </button>
                  );
                })
              ) : (
                <div className="no-schedule">
                  Không có lịch khám trong thời gian này! Vui lòng chọn thời
                  gian khác!!!
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeModalBooking={this.closeModalBooking}
          dataTime={dataScheduleTimeModal}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
