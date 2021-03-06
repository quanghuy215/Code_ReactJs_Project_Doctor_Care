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
          <div className="m-p-title">Qu???n l?? b???nh nh??n kh??m b???nh</div>
          <div className="manage-patinet-body row">
            <div className="col-4 form-group">
              <label>Ch???n ng??y th??ng</label>
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
                    <th>Th???i gian</th>
                    <th>H??? v?? t??n</th>
                    <th>Gi???i t??nh</th>
                    <th>S??T</th>
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
                              X??c nh???n
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div>
                      Kh??ng c?? b???nh nh??n ?????t l???ch h???n trong th???i gian n??y
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
