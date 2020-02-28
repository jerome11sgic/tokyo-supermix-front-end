import React, { Component } from "react";
import { Input, Modal, Icon, Button, Form, DatePicker, Select } from "antd";

import { PrimaryButton } from "../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../styledcomponents/form/MasterLevelForms";
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import { api } from "../../services/AxiosService";
import Notification from "../../Constant/Notification";
import HandelError from "../../Constant/HandleError";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../redux/action/master/plantlevel/PlantLevel";

const { Option } = Select;
class Addincoming extends Component {
  state = {
    loading: false,
    visible: false,
    code: "",
    date: "",
    status: "",
    supplierId: "",
    plantCode: "",
    vehicleNo: "",
    rawMaterialId: "",
    supplierselect: "",
    SelectPlants: "",
    SelectRaw: "",
    plantName: "",
    supplierName: "",
    rawMaterialName: "",
    edit_plantName: "",
    edit_supplierName: "",
    edit_rawMaterialName: "",

    type: "add"
  };
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;

    // switch (name) {
    //   // case "parameter_code":
    //   //   errors.code =
    //   //     value.length === 0
    //   //       ? "Code can't be empty"
    //   //       : value.length < 3
    //   //       ? "Code \n must be 3 characters long!"
    //   //       : "";
    //   //   break;
    //   case "parameter_name":
    //     errors.name =
    //       value.length === 0
    //         ? "Parameter Name can't be empty"
    //         : value.length < 3
    //         ? "Parameter Name \n must be 3 characters long!"
    //         : value.replace(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/, "")
    //         ? "Parameter Name allow only letters"
    //         : "";
    //     break;
    //   case "parameter_abbrivation":
    //     errors.abbrivation =
    //       value.length === 0
    //         ? "Abbrivation can't be empty"
    //         : value.length < 3
    //         ? "Abbrivation \n must be 3 characters long!"
    //         : "";
    //     break;

    //   default:
    //     break;
    // }

    this.setState({ errors, [name]: value });
  };

  handleSelect = (name, value) => {
    console.log(name);
    console.log(value);

    const { errors } = this.state;
    // handle select for  equipment_plant
    if (name === "plant") {
      console.log(value);
      this.setState({
        plantCode: value,
        edit_plantName: value
      });
    }
    // handle select for  supplier
    if (name === "supplier") {
      this.setState({
        supplierId: value,
        edit_supplier: value
      });
    }
    // handle select for  status
    if (name === "rawMaterial") {
      this.setState({
        rawMaterialId: value,
        edit_rawMaterialName: value
      });
    }
    // handle select for  radio group
  };

  Selectsupplier = () => {
    api("GET", "supermix", "/suppliers", "", "", "").then(res => {
      console.log(res.data);

      if (res.data.results.Supplier.length > 0) {
        let supplierselect = res.data.results.Supplier.map((post, index) => {
          console.log(post.name);
          console.log("kkkkkkkkkk");
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          supplierselect
        });
      }
    });
  };

  getAllplant = () => {
    api("GET", "supermix", "/plants", "", "", "").then(res => {
      console.log(res.data.results.plants.length);
      if (res.data.results.plants.length > 0) {
        console.log("ggg");
        let SelectPlants = res.data.results.plants.map((post, index) => {
          return (
            <Option value={post.code} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectPlants
        });
      }
    });
  };

  getallMaterial = () => {
    console.log("api");
    const datalist = [];
    api("GET", "supermix", "/raw-materials", "", "", "").then(res => {
      console.log(res);

      if (res.data.results.rawMaterial.length > 0) {
        console.log("ggg");
        let SelectRaw = res.data.results.rawMaterial.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectRaw
        });
      }
    });
  };

  handleSubmit = e => {
    if (this.state.type === "edit") {
      const data = {
        code: this.state.code,
        date: this.state.date,
        status: false,
        supplierId: this.state.supplierId,
        plantCode: this.state.plantCode,
        vehicleNo: this.state.vehicleNo,
        rawMaterialId: this.state.rawMaterialId
      };
      console.log("edit part");
      console.log(data);
      api("PUT", "supermix", "/incoming-sample", "", data, "").then(
        res => {
          console.log(res.data);

          Notification("success", res.data.message);
          this.props.reload();
          this.setState({ loading: true });
          this.setState({
            equipment_plant: "",
            calibrated_date: "",
            due_date: "",
            calibrated_by: "",
            supplier: "",
            tester: "",
            description: "",
            status: "",
            errormgs: ""
          });
          setTimeout(() => {
            this.setState({ loading: false, visible: false });
          }, 3000);
        },
        error => {
          // this.setState({
          //   errormgs: error.validationFailures[0]
          // });
          console.log("DEBUG34: ", error);
          // console.log(HandelError(error.validationFailures[0]));
        }
      );
    } else {
      const data = {
        code: this.state.code,
        date: moment(this.state.date).format("YYYY-MM-DD"),
        status: this.state.status,
        supplierId: this.state.supplierId,
        plantCode: this.state.plantCode,
        vehicleNo: this.state.vehicleNo,
        rawMaterialId: this.state.rawMaterialId
      };
      console.log("hhhhhhhhhhhhhhh");

      console.log(data);
      api("POST", "supermix", "/incoming-sample", "", data, "").then(
        res => {
          console.log(res.data);

          Notification("success", res.data.message);
          this.props.reload();
          this.setState({ loading: true });
          this.setState({
            code: "",
            date: "",
            status: "",
            supplierId: "",
            plantCode: "",
            vehicleNo: "",
            rawMaterialId: ""
          });
          setTimeout(() => {
            this.setState({ loading: false, visible: false });
          }, 3000);
        },
        error => {
          // this.setState({
          //   errormgs: error.validationFailures[0]
          // });
          console.log("DEBUG34: ", error);
          // console.log(HandelError(error.validationFailures[0]));
        }
      );
    }
  };
  handleDates(name, dateString, field) {
    console.log(name);
    console.log(dateString);
    console.log(field);
    let convertedDate = moment(dateString).format("DD-MM-YYYY");
    console.log(convertedDate);

    this.setState({
      date: dateString
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log("gggg" + nextProps);
    this.setState({
      visible: nextProps.visible,
      code: nextProps.editPlantData.code,
      vehicleNo: nextProps.editPlantData.vehicleNo,
      date: moment(nextProps.editPlantData.date, "DD-MM-YYYY"),
      status: nextProps.editPlantData.status,
      rawMaterialId: nextProps.editPlantData.rawMaterialId,
      rawMaterialName: nextProps.editPlantData.rawMaterialName,
      plantCode: nextProps.editPlantData.plantCode,
      plantName: nextProps.editPlantData.plantName,
      supplierId: nextProps.editPlantData.supplierId,
      supplierName: nextProps.editPlantData.supplierName,
      edit_plantName: nextProps.editPlantData.plantName,
      edit_supplierName: nextProps.editPlantData.supplierName,
      edit_rawMaterialName: nextProps.editPlantData.rawMaterialName,
      type: nextProps.type
    });
  }
  componentDidMount() {
    this.Selectsupplier();
    this.getAllplant();
    this.getallMaterial();
    console.log(this.props.screen);
  }
  render() {
    const { visible, loading } = this.state;

    return (
      <div>
        <PrimaryButton
          onClick={this.showModal}
          style={{
            background: "#001328",
            color: "white",
            border: "none",
            width: "auto",
            marginLeft: "-10px"
          }}
        >
          Add Incoming Sample
        </PrimaryButton>
        <Modal
          width="500px"
          className="addsubcategorymodal"
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key="submit"
              loading={loading}
              onClick={e => this.handleSubmit(e)}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Submit
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                Add Incoming Sample
              </p>
              <Icon
                type="close-circle"
                onClick={this.handleCancel}
                style={{
                  color: "white"
                }}
              />
            </MasterLevelFormTitle>
          }
        >
          <MasterLevelForm>
            {/* Code */}
            <div className="input_wrapper">
              <label for="code" className="label">
                Code:
              </label>

              <Input
                id="code"
                name="code"
                value={this.state.code}
                onChange={this.handleChange}
                disabled={this.state.type === "edit" ? true : false}
                // placeholder='Enter the Code '
                // disabled
              />
            </div>

            {/* Plant Name */}
            <div className="input_wrapper">
              <label for="supplier_name" className="label">
                Supplier Name:
              </label>

              <Select
                className="inputfield"
                id="supplierId"
                name="supplierId"
                placeholder="Enter Supplier Name"
                style={{ width: "180px" }}
                value={this.state.edit_supplierName}
                onChange={value => this.handleSelect("supplier", value)}
              >
                {this.state.supplierselect}
              </Select>
            </div>

            {/* Place */}
            <div className="input_wrapper">
              <label for="raw_material" className="label">
                Raw Material
              </label>

              <Select
                id="rawMaterialId"
                name="rawMaterialId"
                placeholder=" Raw Material"
                style={{ width: "180px" }}
                value={this.state.edit_rawMaterialName}
                onChange={value => this.handleSelect("rawMaterial", value)}
              >
                {this.state.SelectRaw}
              </Select>
            </div>

            {/* T.P No */}
            <div className="input_wrapper">
              <label for=" delivered_date" className="label">
                Delivered Date
              </label>

              <DatePicker
                id="date"
                name="date"
                format={"DD-MM-YYYY"}
                value={this.state.date}
                onChange={(dateString, field) =>
                  this.handleDates("due_date", dateString, field)
                }
                showToday
              />
            </div>

            {/* Description  */}
            <div className="input_wrapper">
              <label for="vechical_no" className="label">
                Vechical No
              </label>

              <Input
                id="vehicleNo"
                name="vehicleNo"
                placeholder="Vechical No"
                value={this.state.vehicleNo}
                onChange={this.handleChange}
              />
            </div>

            <div className="input_wrapper">
              <label for="description" className="label">
                Plant
              </label>
              <Select
                id="plant"
                name="plant"
                placeholder="plant"
                value={this.state.edit_plantName}
                onChange={value => this.handleSelect("plant", value)}
                style={{ width: "200px" }}
              >
                {this.state.SelectPlants}
              </Select>
            </div>
            <div className="input_wrapper">
              <label for="vechical_no" className="label">
                Status
              </label>

              <Input
                id="status"
                name="status"
                placeholder="status"
                value={this.state.status}
                onChange={this.handleChange}
                disabled
              />
            </div>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => {
  //getting the global redux state to get the data from the EditPlantReducer.js
  return {
    visible: state.plantLevelReducers.EditPlantReducer.visible,
    type: state.plantLevelReducers.EditPlantReducer.type,
    editPlantData: state.plantLevelReducers.EditPlantReducer.editPlantData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setincomingVisibility: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Addincoming);
