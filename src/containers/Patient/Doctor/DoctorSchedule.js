import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import moment, { locale } from "moment";
import localization from "moment/locale/vi";
import { getScheduleDoctorByDate } from "../../../services/userService";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
    };
  }
  componentDidMount() {
    //console.log('moment vi :',moment(new Date()).format("dddd - DD/MM"));
    //console.log('moment en :',moment(new Date()).locale("en").format("ddd - DD/MM"));

    let allDays = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};
      obj.label = moment(new Date()).add(i, "days").format("dddd - DD/MM");
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(obj);
    }
    this.setState({
      allDays: allDays,
    });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    let res = await getScheduleDoctorByDate(13, 1639328400000);
    console.log("check res from schedule: ", res);
  }
  render() {
    let { allDays } = this.state;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          <select>
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
        <div className="all-available-time"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
