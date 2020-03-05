import React, { Component } from "react";
import {
  Input,
  DatePicker,
  Modal,
  Button,
  Icon,
  Table,
  Checkbox,
  Select,
  Form,
  Row,
  Col
} from "antd";

import { PrimaryButton } from "../../../styledcomponents/button/button";
import {
  MasterLevelFormTitle,
  MasterLevelForm
} from "../../../styledcomponents/form/MasterLevelForms";
import moment from "moment";
import FormGenerator from "../../../Constant/FormGenerator";
import { api } from "../../../services/AxiosService";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

const a = [];
const b = [];

const Option = Select;
const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "0.2px"
};

class AddMixDesignForm extends Component {
  state = {
    loading: false,
    visible: false,
    visible1: false,
    disabled: true,
    errors: {
      code: "",
      plant: "",
      grade: "",
      target_strength: "",
      actual_grade: ""
    },
    code: "",
    plant: "",
    grade: "",
    date: "",
    target_strength: "",
    actual_grade: "",
    water_cement_ratio: 0,
    water_binder_ratio: 0,
    errormgs: "",
    rowreord: [{ name: "", nature: "", unit: "", quantity: "" }],
    checked: false,
    disableAddQuantity: true,
    mixProportionData: "",
    SubCategoriesselect: "",
    SubCategory: "",
    datalist: "",
    unit: "",
    selectunit: "",
    selectPlants: "",
    cement_data: [],
    water_data: [],
    flyash_data: [],
    material_data: {}
  };
  // **************quantity add modal start*****************
  showModal1 = () => {
    this.setState({
      visible1: true,
      water_data: [],
      cement_data: [],
      flyash_data: [],
      material_data: {}
    });
  };

  handleOk1 = e => {
    console.log(e);
    this.setState({
      visible1: false
    });
  };

  handleCancel1 = e => {
    this.setState({
      cement_data: [],
      water_data: [],
      flyash_data: [],
      material_data: {}
    });

    console.log(e);
    this.setState({
      visible1: false
    });
  };

  // **************quantity add modal end*****************
  showModal = () => {
    this.setState({
      visible: true,
      water_data: [],
      cement_data: [],
      flyash_data: []
    });
  };

  toggle = () => {
    this.setState({
      disabled: !this.state.disabled
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    // window.location.reload();
    console.log("cancelled");
    a.slice(a.length);
    b.slice(b.length);

    this.setState({
      visible: false,
      errors: {
        code: "",
        plant: "",
        grade: "",
        target_strength: "",
        actual_grade: ""
      },
      code: "",
      plant: "",
      grade: "",
      date: "",
      target_strength: "",
      actual_grade: "",
      water_cement_ratio: 0,
      water_binder_ratio: 0,
      errormgs: ""
    });
  };

  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });
    this.setState({ errormgs: "" });
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    console.log(name);
    // console.log(name + " is \t" + value);
    switch (name) {
      case "code":
        errors.code =
          value.length === 0
            ? "Code can't be empty"
            : value.length < 2
            ? "Code \n must be 2 characters long!"
            : "";
        break;

      case "grade":
        errors.grade =
          value.length === 0
            ? "grade can't be empty"
            : value.length < 2
            ? "grade \n must be one character long!"
            : "";
        break;

      case "target_strength":
        errors.target_strength =
          value.length === 0
            ? "target_strength can't be empty"
            : value.length < 2
            ? "target strength \n must be one character long!"
            : "";
        break;
      case "actual_grade":
        errors.actual_grade =
          value.length === 0
            ? "target_strength can't be empty"
            : value.length < 2
            ? "actual grade \n must be one character long!"
            : "";
        break;

      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleSelect = value => {
    const { errors } = this.state;
    console.log(value);
    this.setState({
      plant: value
      // edit_plant: value
    });
    if (value.length !== 0) {
      this.setState({
        errors: {
          code: this.state.errors.code,
          plant: "",
          grade: this.state.errors.grade,
          target_strength: this.state.errors.target_strength,
          actual_grade: this.state.errors.actual_grade
        }
      });
    }
  };

  handleSubSelect = value => {
    console.log(value);
  };
  handleDates(name, dateString, field) {
    console.log(name);
    console.log(dateString);
    console.log(field);
    let convertedDate = moment(dateString).format("DD-MM-YYYY");
    console.log(convertedDate);
    if (name === "date") {
      this.setState({
        date: dateString
      });
    }
  }
  handleSubmit = e => {
    e.preventDefault();
    const {
      errors,
      code,
      plant,
      grade,
      date,
      target_strength,
      actual_grade,
      water_cement_ratio,
      water_binder_ratio
    } = this.state;
    if (
      code.length === 0 &&
      plant.length === 0 &&
      grade.length === 0 &&
      actual_grade.length === 0 &&
      target_strength.length === 0
    ) {
      this.setState({
        errors: {
          code: "Code can't be empty",
          plant: "Plant can't be empty",
          grade: "Grade can't be empty",
          target_strength: "Target Strength can't be empty",
          actual_grade: " Actual Grade can't be empty"
        }
      });
    } else if (code.length === 0 && errors.code.length === 0) {
      this.setState({
        errors: {
          code: errors.code || "Code can't be empty",
          plant: errors.plant,
          grade: errors.grade,
          target_strength: errors.target_strength,
          actual_grade: errors.actual_grade
        }
      });
    } else if (plant.length === 0 && errors.plant.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          plant: errors.plant || "Plant can't be empty",
          grade: errors.grade,
          target_strength: errors.target_strength,
          actual_grade: errors.actual_grade
        }
      });
    } else if (grade.length === 0 && errors.grade.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          plant: errors.plant,
          grade: errors.grade || "Grade can't be empty",
          target_strength: errors.target_strength,
          actual_grade: errors.actual_grade
        }
      });
    } else if (
      target_strength.length === 0 &&
      errors.target_strength.length === 0
    ) {
      this.setState({
        errors: {
          code: errors.code,
          plant: errors.plant,
          grade: errors.grade,
          target_strength:
            errors.target_strength || "Target Strength can't be empty",
          actual_grade: errors.actual_grade
        }
      });
    } else if (actual_grade.length === 0 && errors.actual_grade.length === 0) {
      this.setState({
        errors: {
          code: errors.code,
          plant: errors.plant,
          grade: errors.grade,
          target_strength: errors.target_strength,
          actual_grade: errors.actual_grade || " Actual Grade can't be empty"
        }
      });
    } else if (
      errors.code.length === 0 &&
      errors.plant.length === 0 &&
      errors.grade.length === 0 &&
      errors.actual_grade.length === 0 &&
      errors.target_strength.length === 0
    ) {
      console.log("form is valid");

      const data = {
        code: code,
        plantCode: plant,
        grade: grade,
        date: moment(date).format("YYYY-MM-DD"),
        targetStrength: target_strength,
        actualGrade: actual_grade,
        waterCementRatio: water_cement_ratio,
        waterBinderRatio: water_binder_ratio
      };
      console.log(data);
      console.log(this.state.mixProportionData);

      if (this.state.type === "edit") {
        console.log("edit part");
        //   const data = {
        //     id: this.state.id,
        //     plantEquipmentSerialNo: equipment_plant,
        //     calibratedDate: moment(calibrated_date).format("YYYY-MM-DD"),
        //     dueDate: moment(due_date).format("YYYY-MM-DD"),
        //     calibrationType: calibrated_by,
        //     supplierId: supplier,
        //     userId: tester,
        //     description: description,
        //     status: status
        //   };
        //   console.log(data);
        //   api(
        //     "PUT",
        //     "supermix",
        //     "/plant-equipment-calibration",
        //     "",
        //     data,
        //     ""
        //   ).then(
        //     res => {
        //       console.log(res.data);

        //       Notification("success", res.data.message);
        //       this.props.reload();
        //       this.setState({ loading: true });
        //       this.setState({
        //         equipment_plant: "",
        //         calibrated_date: "",
        //         due_date: "",
        //         calibrated_by: "",
        //         supplier: "",
        //         tester: "",
        //         description: "",
        //         status: "",
        //         errormgs: ""
        //       });
        //       setTimeout(() => {
        //         this.setState({ loading: false, visible: false });
        //       }, 3000);
        //     },
        //     error => {
        //       // this.setState({
        //       //   errormgs: error.validationFailures[0]
        //       // });
        //       console.log("DEBUG34: ", error);
        //       // console.log(HandelError(error.validationFailures[0]));
        //     }
        //   );
      } else {
        console.log("hhhhhhhhhhhhhhh");
        console.log(data);
        api("POST", "supermix", "/mixdesign", "", data, "").then(
          res => {
            console.log(res.data);
            console.log(this.state.mixProportionData);
            // Notification("success", res.data.message);
            // this.props.reload();
            // this.setState({ loading: true });
            // this.setState({
            //   equipment_plant: "",
            //   calibrated_date: "",
            //   due_date: "",
            //   calibrated_by: "",
            //   supplier: "",
            //   tester: "",
            //   description: "",
            //   status: "",
            //   errormgs: ""
            // });
            setTimeout(() => {
              this.setState({ loading: false, visible: false });
            }, 500);
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
    }
    console.log("data hit");
  };

  //restrict date
  disabledDate = current => {
    // Can not select days before today and today
    return current && current.valueOf() < Date.now();
  };

  selectSubCategories = () => {
    api("GET", "supermix", "/material-sub-categories", "", "", "").then(res => {
      console.log(res.data);
      if (res.data.results.materialSubCategories.length > 0) {
        let SubCategoriesselect = res.data.results.materialSubCategories.map(
          (post, index) => {
            return (
              <Option value={post.id} key={index}>
                {post.name}
              </Option>
            );
          }
        );
        this.setState({
          SubCategoriesselect
        });
      }
    });
  };
  getallRawMaterials = () => {
    const datalist = [];
    api("GET", "supermix", "/raw-materials", "", "", "").then(res => {
      console.log(res.data);

      res.data.results.rawMaterial.map((post, index) => {
        datalist.push({
          id: post.id,
          name: post.name,
          nature: post.nature,
          subCategoryName: post.materialSubCategory.name,
          subCategoryId: post.materialSubCategory.id,
          materialCategoryId: post.materialSubCategory.materialCategoryId,
          materialCategoryName: post.materialSubCategory.materialCategoryName
        });
      });
      console.log(datalist);
      this.setState({
        datalist: datalist
      });
    });
  };

  componentDidMount() {
    console.log(this.props.screen);
    this.selectSubCategories();
    this.getallRawMaterials();
    this.getallunit();
    this.getAllplant();
  }

  handleChangeMaterial = event => {
    // this.setState({ [field]: event.target.value });

    event.preventDefault();
    const { name, value } = event.target;

    console.log(name);
    console.log(value);
  };

  onSelectChange = (record, selectedRows) => {
    console.log(record);
    console.log(selectedRows);
    if (selectedRows) {
      a.push(record);
    } else {
      b.push(record);
      console.log(b);
      // var array = [...a]; // make a separate copy of the array
      b.map((post, key) => {
        var index = a.indexOf(post);
        if (index !== -1) {
          a.splice(index, 1);
        }
      });

      console.log(a);
    }
    console.log(a);
    if (a.length > 0) {
      console.log("disble true");
      this.setState({
        disableAddQuantity: false
      });
    } else {
      this.setState({
        disableAddQuantity: true
      });
    }
  };

  x = () => {
    let para = [];
    for (let i = 0; i < a.length; i++) {
      // let st = parameter[i].name;
      // console.log(st);
      para.push({
        name: `${a[i].name}`,
        label: `${a[i].name}`
      });
    }
    console.log(para);
    return JSON.stringify(para);
  };

  y = () => {
    let para = [];
    for (let i = 0; i < a.length; i++) {
      para.push({
        name: `${a[i].name}`,
        label: "",
        type: "select",
        options: this.state.selectunit
      });
    }
    console.log(para);
    return JSON.stringify(para);
  };
  getuniValuev = form => {
    console.log(form);
  };

  quantityChange = form1 => {
    this.setState({ material_data: form1.data.form });
  };
  setJson = () => {
    // this.setState({ material_data: form1.data.form });
    this.setState({ visible1: false });

    const values = [];

    for (let i = 0; i < a.length; i++) {
      values.push({
        mixDesignCode: this.state.code,
        materialId: a[i].id,
        unitId: this.state.unit[a[i].name],
        quantity: this.state.material_data[a[i].name]
      });
    }
    this.setState({ mixProportionData: values });
    console.log(values);

    Object.entries(this.state.material_data).map(([make, type]) => {
      a.map((post, index) => {
        console.log(post.subCategoryName);
        if (
          post.name === make &&
          post.subCategoryName.toLowerCase() === "water"
        ) {
          this.state.water_data.push(parseInt(type));
        } else if (
          post.name === make &&
          post.subCategoryName.toLowerCase() === "cement"
        ) {
          this.state.cement_data.push(parseInt(type));
        } else if (
          post.name === make &&
          post.subCategoryName.toLowerCase() === "flyash"
        ) {
          this.state.flyash_data.push(parseInt(type));
        } else {
          console.log("notfound");
        }
      });
    });
    console.log(this.state.water_data);
    console.log(this.state.cement_data);
    console.log(this.state.flyash_data);
    if (
      this.state.cement_data.length > 0 &&
      this.state.water_data.length == 1 &&
      this.state.flyash_data.length == 0
    ) {
      // Getting sum of numbers
      var sum = this.state.cement_data.reduce(function(a, b) {
        return a + b;
      }, 0);
      this.findWaterCementRatio(this.state.water_data[0], sum);
    } else if (
      this.state.cement_data.length > 0 &&
      this.state.water_data.length == 1 &&
      this.state.flyash_data.length == 1
    ) {
      var sum = this.state.cement_data.reduce(function(a, b) {
        return a + b;
      }, 0);

      this.findWaterCementRatio(this.state.water_data[0], sum);
      this.findWaterBinderRatio(
        this.state.water_data[0],
        sum + this.state.flyash_data[0]
      );
    } else {
      this.setState({
        water_cement_ratio: 0,
        water_binder_ratio: 0
      });
    }
  };

  findWaterBinderRatio = (w, f) => {
    console.log(w);
    console.log(f);
    let w_b_r = (w / f) * 100;
    this.setState({ water_binder_ratio: Number(w_b_r.toFixed(1)) });
    console.log(Number(w_b_r.toFixed(1)));
  };

  findWaterCementRatio = (w, c) => {
    let w_c_r = (w / c) * 100;
    this.setState({ water_cement_ratio: Number(w_c_r.toFixed(1)) });
    console.log(Number(w_c_r.toFixed(1)));
  };
  renderSubmit = from => {
    console.log(from);
    this.setState({
      unit: from
    });
  };

  getallunit = () => {
    api("GET", "supermix", "/units", "", "", "").then(res => {
      console.log(res.data);
      const values = [];

      for (let i = 0; i < res.data.results.units.length; i++) {
        values.push({
          value: res.data.results.units[i].id,
          text: res.data.results.units[i].unit
        });
      }
      console.log(values);
      this.setState({
        selectunit: values
      });
    });
  };
  getAllplant() {
    api("GET", "supermix", "/plants", "", "", "").then(res => {
      console.log(res.data.results.plants.length);
      if (res.data.results.plants.length > 0) {
        let selectPlants = res.data.results.plants.map((post, index) => {
          return (
            <Option value={post.code} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          selectPlants
        });
      }
    });
  }

  render() {
    const {
      visible,
      loading,
      errors,
      code,
      plant,
      grade,
      date,
      target_strength,
      water_cement_ratio,
      water_binder_ratio,
      SubCategory,
      actual_grade
    } = this.state;

    const columns = [
      { title: "RawMaterial", dataIndex: "name", key: "name" },
      {
        title: "Nature",
        dataIndex: "nature",
        key: "Nature"
      },
      {
        title: "Category",
        dataIndex: "materialCategoryName",
        key: "materialCategoryName"
      },
      {
        title: "SubCategory",
        dataIndex: "subCategoryName",
        key: "subCategoryName"
      }
    ];

    const rowSelection = {
      onSelect: this.onSelectChange
    };

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
          Add Mix Design
        </PrimaryButton>
        <Modal
          width="1100px"
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
                Add MixDesign
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
            {/* Form Area */}
            <div
              style={{
                display: "flex",
                flexBasis: "500px",
                flexWrap: "wrap",
                justifyContent: "flex-start"
              }}
            >
              {/* Code */}
              <div className="input_wrapper">
                <label for="code" className="label">
                  Code:
                </label>
                <Input
                  id="code"
                  name="code"
                  placeholder="Enter the Code "
                  value={code}
                  onChange={this.handleChange}
                  // disabled
                />
                {errors.code.length > 0 && (
                  <div style={error}>{errors.code}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Plant Name */}

              {/* Place */}
              <div className="input_wrapper">
                <label for="plant" className="label">
                  Plant
                </label>

                <Select
                  placeholder=" Plant"
                  id="plant"
                  name="plant "
                  style={{ width: "180px" }}
                  value={plant}
                  onChange={this.handleSelect}
                >
                  {this.state.selectPlants}
                  {/* <Option value="jaffna">jaffna</Option>
                  <Option value="colombo">colombo</Option> */}
                </Select>
                {errors.plant.length > 0 && (
                  <div style={error}>{errors.plant}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              <div className="input_wrapper">
                <label for="grade" className="label">
                  Grade
                </label>

                <Input
                  id="grade"
                  name="grade"
                  placeholder="Enter Grade"
                  style={{ width: "180px" }}
                  value={grade}
                  onChange={this.handleChange}
                />
                {errors.grade.length > 0 && (
                  <div style={error}>{errors.grade}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>
              <div className="input_wrapper">
                <label for="grade" className="label">
                  Actual Grade
                </label>

                <Input
                  id="actual_grade"
                  name="actual_grade"
                  placeholder="Enter Grade"
                  style={{ width: "180px" }}
                  value={actual_grade}
                  onChange={this.handleChange}
                />
                {errors.actual_grade.length > 0 && (
                  <div style={error}>{errors.actual_grade}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Place */}
              <div className="input_wrapper">
                <label for="date" className="label">
                  Date
                </label>

                <DatePicker
                  id="date"
                  name="date"
                  format={"DD-MM-YYYY"}
                  showToday
                  // disabledDate={this.disabledDate()}
                  value={date}
                  onChange={(dateString, field) =>
                    this.handleDates("date", dateString, field)
                  }
                  // disabledTime={() => Date.now()}
                />
              </div>
              <div className="input_wrapper">
                <label for="code" className="label">
                  Target Strength:
                </label>
                <Input
                  id="target_strength"
                  name="target_strength"
                  placeholder="Enter the strength "
                  value={target_strength}
                  onChange={this.handleChange}
                />
                {errors.target_strength.length > 0 && (
                  <div style={error}>{errors.target_strength}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              <div className="input_wrapper">
                <label for="code" className="label">
                  Water Cement Ratio:
                </label>
                <Input
                  id="water_cement_ratio"
                  name="water_cement_ratio"
                  placeholder="Enter the ratio "
                  value={water_cement_ratio}
                  onChange={this.handleChange}
                  disabled
                />
              </div>
              <div className="input_wrapper">
                <label for="code" className="label">
                  Water Binder Ratio:
                </label>
                <Input
                  id="water_binder_ratio"
                  name="water_binder_ratio"
                  placeholder="Enter the ratio "
                  value={water_binder_ratio}
                  onChange={this.handleChange}
                  disabled
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                flexBasis: "500px",
                flexWrap: "wrap",
                justifyContent: "flex-start"
              }}
            >
              <Button
                type="primary"
                onClick={this.showModal1}
                disabled={this.state.disableAddQuantity}
              >
                Add Quantity
              </Button>
              <Select
                placeholder="Select SubCategory"
                defaultActiveFirstOption
                id="subCategory"
                name="subCategory"
                style={{ width: "180px" }}
                value={SubCategory}
                onChange={this.handleSubSelect}
              >
                {this.state.SubCategoriesselect}
              </Select>
              <Table
                style={{ width: "500px" }}
                columns={columns}
                dataSource={this.state.datalist}
                size="middle"
                pagination={{ defaultPageSize: 7 }}
                rowSelection={rowSelection}
              />
            </div>
          </MasterLevelForm>
        </Modal>

        {/* Quantity add modal */}
        <Modal
          title=" Add RawMaterial Quantity"
          visible={this.state.visible1}
          onOk={this.setJson}
          onCancel={this.handleCancel1}
          footer={false}
        >
          <Row>
            <Col span={12}>
              <FormGenerator
                form={JSON.parse(this.x())}
                dedefaultValues={this.state.material_data}
                submitButton={{
                  text: "Submit",
                  className: "submit"
                }}
                onChange={form => {
                  this.quantityChange(form);
                }}
                onSubmit={form => {
                  this.setJson(form);
                  console.log(form);
                }}
                inputStyle={instyle}
                buttonStyle={btstyle}
                // formStyle={fostyle}
                formDriction="column"
              />
            </Col>
            <Col span={12}>
              <FormGenerator
                className="input_wrapper"
                form={JSON.parse(this.y())}
                onChange={form => {
                  this.renderSubmit(form.data.form);
                }}
                onSubmit={form => {
                  // this.setJson(form);
                  console.log(form);
                }}
                inputStyle={instyle}
                lableStyle={lableStyle}
                // buttonStyle={btstyle}
                formStyle={fostyle}
                formDriction="column"
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

export default AddMixDesignForm;
const fostyle = {
  marginTop: "1px",
  display: "flex",
  flexDirection: "row",
  width: "300px",
  height: "auto",
  flexWrap: "wrap",
  justifyContent: "space-around",
  position: "relative",
  // overflowY: "scroll",
  scrollBehavior: "smooth"
};
const instyle = {
  width: "100px",
  boxShadow: "1px 2px 8px 1px rgba(0,0,0,0.08)"
};

const lableStyle = {
  width: "40px",
  height: "32px"
};

const btstyle = {
  marginLeft: "380px"
};
