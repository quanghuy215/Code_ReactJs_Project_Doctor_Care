import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import Select from "react-select";
import * as actions from "../../../store/actions";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";
import { CRUD_ACTIONS, dateFormat } from "../../../utils";
import { saveBulkScheduleDoctor } from "../../../services/userService";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDoctor: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllCodeTime();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctor !== this.props.allDoctor) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctor);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.allSchedule !== this.props.allSchedule) {
      // console.log("check range time: ", this.props.allSchedule);
      let data = this.props.allSchedule;
      if (data && data.length > 0) {
        // data.map((item) => {
        //   item.isSelected = false;
        //   return item;
        // });
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      // console.log("check range time: data :  ", data);
      this.setState({
        rangeTime: data,
      });
    }
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        obj.label = `${item.firstName} ${item.lastName}`;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };
  handleChangeSelect = (selectedDoctor) => {
    this.setState({ selectedDoctor: selectedDoctor });
  };
  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
    //console.log("check vaule onchange date picker:", date);
  };

  handleClickButtomTime = (time) => {
    let { rangeTime } = this.state;
    //console.log("check rangeTime before ", rangeTime);
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });

      this.setState({
        rangeTime: rangeTime,
      });
      //console.log("check rangeTime after ", rangeTime);
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("Please choose date!");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Please choose doctor!");
      return;
    }
    //let formatedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    //let formatedDate = moment(currentDate).unix();
    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((time) => {
          let obj = {};
          obj.doctorId = selectedDoctor.value;
          obj.date = formatedDate;
          obj.timeType = time.keyMap;
          result.push(obj);
        });
      } else {
        toast.error("Please choose your time!");
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    });

    if (res && res.errCode === 0) {
      toast.success("Save time success!!!");
    } else {
      toast.error("Error: saveBulkScheduleDoctor");
      console.log("Error: saveBulkScheduleDoctor: ", res);
    }

    // console.log("check saveBulkScheduleDoctor: ", res);
    // console.log("check result: ", result);
  };
  render() {
    let { rangeTime } = this.state;
    //console.log("check state: ", rangeTime);
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">Quản lí kế hoạch khám bệnh</div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>Chọn bác sĩ</label>
              <Select
                value={this.state.selectedDoctor}
                onChange={this.handleChangeSelect}
                options={this.state.listDoctor}
              />
            </div>
            <div className="col-6 form-group">
              <label>Chọn ngày</label>
              <DatePicker
                className="form-control"
                onChange={this.handleOnChangeDatePicker}
                value={this.state.currentDate}
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              <div className="col-12">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule"
                        }
                        key={index}
                        onClick={() => this.handleClickButtomTime(item)}
                      >
                        {item.valueEN}
                      </button>
                    );
                  })}
              </div>
            </div>
            <button
              className="btn btn-primary btn-save-schedule"
              onClick={() => this.handleSaveSchedule()}
            >
              Lưu thông tin
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctor: state.admin.allDoctor,
    allSchedule: state.admin.allSchedule,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllCodeTime: () => dispatch(actions.fetchAllCodeTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
