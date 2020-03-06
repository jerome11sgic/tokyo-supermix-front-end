import React, { Component } from "react";
import { Icon, Popconfirm, Divider, Tag } from "antd";
import ConcreteTestTitle from "../titles/ConcreteTestTitle";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import { api } from "../../services/AxiosService";
import Notification from "../../Constant/Notification";
import { connect } from "react-redux";
import { SWITCH_TO_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";

class ManageConcreteTest extends Component {
  state = {
    concreteData: "",
    size: "small"
  };

  getallConcreteTest = () => {
    api("GET", "supermix", "/concrete-tests", "", "", "").then(res => {
      console.log(res.data);
      this.setState({
        concreteData: res.data.results.concreteTests
      });
    });
  };
  onConfirmdelete(id) {
    console.log(id);

    api("DELETE", "supermix", "/concrete-test", "", "", id).then(res => {
      console.log(res.data);
      this.getallConcreteTest();
      Notification("success", res.data.message);
    });
    console.log(this.state.id);
  }

  componentDidMount() {
    this.getallConcreteTest();
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
        title: "Slump",
        dataIndex: "slump",
        key: "slump",
        width: "6%"
      },
      {
        title: "Temperature",
        dataIndex: "temperature",
        key: "temperature",
        width: "6%"
      },
      {
        title: "Plant Name",
        dataIndex: "plantName",
        key: "role",
        width: "6%"
      },
      {
        title: "Water Content",
        dataIndex: "waterContent",
        key: "water_content",
        width: "6%"
      },
      {
        title: "Slump Grade Ratio",
        dataIndex: "slumpGradeRatio",
        key: "slump_grade_ratio",
        width: "6%"
      },
      {
        title: "Water Cement Ratio",
        dataIndex: "waterCementRatio",
        key: "water_cement_ratio",
        width: "7%"
      },

      {
        title: "Water Binder Ratio",
        dataIndex: "waterBinderRatio",
        key: "water_binder_ratio",
        width: "7%"
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
                onClick={this.props.passEditconcreteTestToModal.bind(
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
        title={() => <ConcreteTestTitle reload={this.getallConcreteTest} />}
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
    passEditconcreteTestToModal: record => {
      //this payload is the data we pass into redux which is in the row which we clicked
      dispatch({ type: SWITCH_TO_EDIT_MODE, payload: record });
      console.log(record);
    }
  };
};

export default connect(null, mapDispatchToProps)(ManageConcreteTest);
