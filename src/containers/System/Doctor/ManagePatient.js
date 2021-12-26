import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";
import { getAllPatient } from "../../../services/userService";
import moment from "moment";
import ModalBill from "./ModalBill";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      isOpenModalBill: false,
      dataModal: {},
    };
  }
  async componentDidMount() {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatedDate = new Date(currentDate).getTime();
    this.getDataPatient(user, formatedDate);
  }
  getDataPatient = async (user, formatedDate) => {
    let res = await getAllPatient({
      doctorId: user.id,
      date: formatedDate,
    });
    if (res && res.errCode === 0) {
      this.setState({
        dataPatient: res.data,
      });
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {}
  handleOnChangeDatePicker = (date) => {
    this.setState(
      {
        currentDate: date[0],
      },
      () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatedDate = new Date(currentDate).getTime();
        this.getDataPatient(user, formatedDate);
      }
    );
    //console.log("check vaule onchange date picker:", date);
  };
  handleConfirm = (item) => {
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientId,
      email: item.patientData.email,
    };

    this.setState({
      isOpenModalBill: true,
      dataModal: data,
    });
  };
  closeModalBill = () => {
    this.setState({
      isOpenModalBill: false,
      dataModal: {},
    });
  };
  sendBill = (dataFromModal) => {
    
  };
  render() {
    console.log("check user: ", this.props);
    let { dataPatient, isOpenModalBill, dataModal } = this.state;
    return (
      <>
        <div className="manage-patient-container">
          <div className="m-p-title">Quản lí bệnh nhân khám bệnh</div>
          <div className="manage-patinet-body row">
            <div className="col-4 form-group">
              <label>Chọn ngày tháng</label>
              <DatePicker
                className="form-control"
                onChange={this.handleOnChangeDatePicker}
                value={this.state.currentDate}
              />
            </div>
            <div className="col-12 table-manage-patient">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Họ và tên</th>
                    <th>Giới tính</th>
                    <th>SĐT</th>
                    <th>Actions</th>
                  </tr>
                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item.timeTypeDataPatient.valueVI}</td>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.genderData.valueVI}</td>
                          <td>{item.patientData.phoneNumber}</td>
                          <td>
                            <button
                              className="mp-btn-confirm"
                              onClick={() => this.handleConfirm(item)}
                            >
                              Xác nhận
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div>
                      Không có bệnh nhân đặt lịch hẹn trong thời gian này
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <ModalBill
          isOpenModal={isOpenModalBill}
          dataModal={dataModal}
          closeModalBill={this.closeModalBill}
          sendBill={this.sendBill}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
