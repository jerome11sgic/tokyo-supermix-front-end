import React, { Component } from "react";
import { Icon, Popconfirm, Divider, Tag } from "antd";
import ConcreteStrengthTestTitle from "../titles/ConcreteStrengthTestTitle";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import { api } from "../../services/AxiosService";
import Notification from "../../Constant/Notification";
import { connect } from "react-redux";
import { SWITCH_TO_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";

class ManageStrength extends Component {
  state = {
    concreteData: "",
    size: "small"
  };

  getallConcreteStrengthTest = () => {
    api("GET", "supermix", "/concrete-strength-tests", "", "", "").then(res => {
      console.log(res.data);
      this.setState({
        concreteData: res.data.results.concreteStrengthTests
      });
    });
  };
  onConfirmdelete(id) {
    console.log(id);

    api("DELETE", "supermix", "/concrete-strength-test", "", "", id).then(
      res => {
        console.log(res.data);
        this.getallConcreteStrengthTest();
        Notification("success", res.data.message);
      }
    );
    console.log(this.state.id);
  }

  componentDidMount() {
    this.getallConcreteStrengthTest();
  }
  render() {
    const columns = [
      {
        title: "Mix Design Code",
        dataIndex: "mixDesignCode",
        key: "mix_design_code",
        width: "6%"
      },
      {
        title: "concrete age",
        dataIndex: "concreteAge",
        key: "concreteAge",
        width: "6%"
      },
      {
        title: "Strength",
        dataIndex: "strength",
        key: "strength",
        width: "6%"
      },

      {
        title: "Mix Design TargetGrade",
        dataIndex: "mixDesignTargetGrade",
        key: "mixDesignTargetGrade",
        width: "6%"
      },
      {
        title: "Strength GradeRatio",
        dataIndex: "strengthGradeRatio",
        key: "strengthGradeRatio",
        width: "8%"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "7%",
        render: status => (
          <span>
            {
              <Tag
                color={
                  status == "PASS"
                    ? "green"
                    : status == "PROCESS"
                    ? "orange"
                    : "red"
                }
              >
                {status}
              </Tag>
            }
          </span>
        )
      },

      {
        title: "Edit & Delete",
        key: "action",
        width: "7%",
        render: (text, record = this.state.concreteData) => (
          <span>
            <a>
              <Icon
                type="edit"
                style={{ fontSize: "1.2em" }}
                onClick={this.props.passEditconcreteStrengthTestToModal.bind(
                  this,
                  record
                )}
              />
            </a>
            <Divider type="vertical" />
            <a>
              <Popconfirm
                title="Are you sure you want to Delete this?"
                icon={
                  <Icon type="question-circle-o" style={{ color: "red" }} />
                }
                onConfirm={this.onConfirmdelete.bind(this, record.id)}
              >
                <a href="#">
                  <Icon
                    type="delete"
                    style={{ color: "red", fontSize: "1.2em" }}
                  />
                </a>
              </Popconfirm>
            </a>
          </span>
        )
      }
    ];

    return (
      <AntTable
        maxlength
        style={{ width: "1300px" }}
        title={() => (
          <ConcreteStrengthTestTitle reload={this.getallConcreteStrengthTest} />
        )}
        className="plantManageTable"
        columns={columns}
        dataSource={this.state.concreteData}
        // onChange={this.handleChange}
        pagination={{ defaultPageSize: 4 }}
        size={this.state.size}
      />
    );
  }
}
const mapDispatchToProps = dispatch => {
  return {
    // if this function dispatches modal will be shown and the data will be drawn :)
    passEditconcreteStrengthTestToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(null, mapDispatchToProps)(ManageStrength);
