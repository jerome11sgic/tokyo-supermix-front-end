import React, { Component } from "react";
import { Input, Modal, Button, Icon, Select } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import { api } from "../../../services/AxiosService";
import Notification from "../../../Constant/Notification";

import {
  MasterLevelForm,
  MasterLevelFormTitle
} from "../../../styledcomponents/form/MasterLevelForms";
import { connect } from "react-redux";
import { DISABLE_EDIT_MODE } from "../../../../redux/action/master/plantlevel/PlantLevel";

function onBlur() {
  console.log("blur");
}

function onFocus() {
  console.log("focus");
}

function onSearch(val) {
  console.log("search:", val);
}

const error = {
  color: "red",
  fontSize: "12px",
  width: "160px",
  height: "2px"
};

//email validation
const validEmailRegex = RegExp(
  /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

const { Option } = Select;

class SupplierAddForm extends Component {
  state = {
    formValid: false,
    errorCount: null,
    errors: {
      code: "",
      name: "",
      companyName: "",
      category: "",
      address: "",
      contactno: "",
      email: ""
    },
    // category: "",
    loading: false,
    visible: false,
    supplier_code: "",
    supplier_name: "",
    supplier_company_name: "",
    supplier_category: "",
    supplier_address: "",
    supplier_contactno: "",
    supplier_email: "",
    errormgs: "",
    type: ""
  };

  validateForm = errors => {
    let valid;
    Object.values(errors).forEach(
      val => val.length > 0 && (valid = false),
      (valid = true)
    );
    return valid;
  };

  countErrors = errors => {
    let count = 0;
    Object.values(errors).forEach(val => val.length > 0 && (count = count + 1));
    return count;
  };

  showModal = () => {
    this.setState({
      visible: true,
      supplier_code: "",
      supplier_name: "",
      supplier_company_name: "",
      supplier_category: "",
      supplier_address: "",
      supplier_contactno: "",
      supplier_email: ""
    });
  };

  handleSelect = value => {
    this.setState({
      supplier_category: value,
      errors: {
        code: "",
        name: this.state.errors.name,
        companyName: this.state.errors.companyName,
        category: "",
        address: this.state.errors.address,
        contactno: this.state.errors.contactno,
        email: this.state.errors.email
      }
    });
    // console.log(value);
    // console.log(value.length);
    // if (this.state.supplier_category.length > 0) {
    //   console.log("dgsdfgs");
    // this.setState({
    //   errors: {
    //     code: "",
    //     name: "",
    //     companyName: "",
    //     category: "",
    //     address: "",
    //     contactno: "",
    //     email: ""
    //   }
    // });
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.editPlantData);
    this.setState({
      visible: nextProps.visible,
      supplier_code: nextProps.editPlantData.id,
      supplier_name: nextProps.editPlantData.name,
      supplier_category: nextProps.editPlantData.suppilerCategory,
      supplier_address: nextProps.editPlantData.address,
      supplier_contactno: nextProps.editPlantData.phoneNumber,
      supplier_email: nextProps.editPlantData.email,
      supplier_company_name: nextProps.editPlantData.companyName,
      type: nextProps.type
    });
  }
  handleChange = (event, field) => {
    this.setState({ [field]: event.target.value });

    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    // console.log(name + " is \t" + value);
    switch (name) {
      case "supplier_code":
        errors.code =
          value.length === 0
            ? "Code can't be empty"
            : value.length < 3
            ? "Code must be 3 characters long!"
            : "";
        break;
      case "supplier_name":
        errors.name =
          value.length === 0
            ? "Name can't be empty"
            : value.length < 6
            ? "Name \n must be 6 characters long!"
            : "";
        break;
      case "supplier_address":
        errors.address =
          value.length === 0
            ? "Address can't be empty"
            : value.length < 6
            ? "Address \n must be 6 characters long!"
            : "";
        break;
      case "supplier_contactno":
        errors.contactno = isNaN(value)
          ? `Contact Number must be a number`
          : value.length === 0
          ? "Contact Number can't be empty"
          : value.length < 6
          ? `Contact Number must be 6 characters long!`
          : "";
        break;
      case "supplier_email":
        errors.email =
          value.length === 0
            ? "Email can't be empty"
            : !validEmailRegex.test(value)
            ? "Please enter a valid email!"
            : "";
        break;
      case "supplier_company_name":
        errors.companyName =
          value.length === 0
            ? "Company Name can't be empty"
            : value.length < 6
            ? "Company Name \n must be 6 characters long!"
            : "";
        break;
      default:
        break;
    }

    this.setState({ errors, [name]: value });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    if (this.state.type === "edit") {
      this.props.setSupplierVisiblity();
    }
    this.setState({
      visible: false,
      supplier_code: "",
      supplier_name: "",
      supplier_category: "",
      supplier_address: "",
      supplier_contactno: "",
      supplier_email: "",
      errors: {
        // code: "",
        name: "",
        companyName: "",
        category: "",
        address: "",
        contactno: "",
        email: ""
      }
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    // initial empty field validation
    if (
      // this.state.supplier_code.length === 0 &&
      this.state.supplier_name.length === 0 &&
      this.state.supplier_category.length === 0 &&
      this.state.supplier_address.length === 0 &&
      this.state.supplier_contactno.length === 0 &&
      this.state.supplier_email.length === 0
    ) {
      this.setState({
        errors: {
          // code: "Code can't be empty",
          name: "Name can't be empty",
          companyName: "Company Name can't be empty",
          category: "Category can't be empty",
          address: "Address can't be empty",
          contactno: "Contact No can't be empty",
          email: "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    // code
    // else if (
    //   this.state.supplier_code.length === 0 &&
    //   this.state.errors.code.length === 0
    // ) {
    //   this.setState({
    //     errors: {
    //       // code: this.state.errors.code || "Code can't be empty",
    //       name: this.state.errors.name || "Name can't be empty",
    //       category: this.state.errors.category || "Category can't be empty",
    //       address: this.state.errors.address || "Address can't be empty",
    //       contactno: this.state.errors.contactno || "Contact No can't be empty",
    //       email: this.state.errors.email || "Email can't be empty"
    //     },
    //     formValid: this.validateForm(this.state.errors),
    //     errorCount: this.countErrors(this.state.errors)
    //   });
    // }
    // supplier name
    else if (
      this.state.supplier_name.length === 0 &&
      this.state.errors.name.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code || "Code can't be empty",
          name: this.state.errors.name || "Name can't be empty",
          companyName:
            this.state.errors.companyName || "Company Name can't be empty",
          category: this.state.errors.category || "Category can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          contactno: this.state.errors.contactno || "Contact No can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    // company name
    else if (
      this.state.supplier_company_name.length === 0 &&
      this.state.errors.companyName.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code || "Code can't be empty",
          name: this.state.errors.name || "Name can't be empty",
          companyName:
            this.state.errors.companyName || "Company Name can't be empty",
          category: this.state.errors.category || "Category can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          contactno: this.state.errors.contactno || "Contact No can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    //category
    else if (
      this.state.supplier_category.length === 0 &&
      this.state.errors.category.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code || "Code can't be empty",
          name: this.state.errors.name || "Name can't be empty",
          companyName:
            this.state.errors.companyName || "Company Name can't be empty",
          category: this.state.errors.category || "Category can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          contactno: this.state.errors.contactno || "Contact No can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    //address
    else if (
      this.state.supplier_address.length === 0 &&
      this.state.errors.address.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code || "Code can't be empty",
          name: this.state.errors.name || "Name can't be empty",
          companyName:
            this.state.errors.companyName || "Company Name can't be empty",
          category: this.state.errors.category || "Category can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          contactno: this.state.errors.contactno || "Contact No can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    // Email
    else if (
      this.state.supplier_email.length === 0 &&
      this.state.errors.email.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code || "Code can't be empty",
          name: this.state.errors.name || "Name can't be empty",
          companyName:
            this.state.errors.companyName || "Company Name can't be empty",
          category: this.state.errors.category || "Category can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          contactno: this.state.errors.contactno || "Contact No can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    // Contact No
    else if (
      this.state.supplier_contactno.length === 0 &&
      this.state.errors.contactno.length === 0
    ) {
      this.setState({
        errors: {
          // code: this.state.errors.code || "Code can't be empty",
          name: this.state.errors.name || "Name can't be empty",
          companyName:
            this.state.errors.companyName || "Company Name can't be empty",
          category: this.state.errors.category || "Category can't be empty",
          address: this.state.errors.address || "Address can't be empty",
          contactno: this.state.errors.contactno || "Contact No can't be empty",
          email: this.state.errors.email || "Email can't be empty"
        },
        formValid: this.validateForm(this.state.errors),
        errorCount: this.countErrors(this.state.errors)
      });
    }
    // proceed to api request
    else if (
      // this.state.errors.code.length === 0 &&
      this.state.errors.name.length === 0 &&
      this.state.errors.companyName.length === 0 &&
      this.state.errors.address.length === 0 &&
      this.state.errors.category.length === 0 &&
      this.state.errors.contactno.length === 0 &&
      this.state.errors.email.length === 0
    ) {
      this.setState({ formValid: this.validateForm(this.state.errors) });
      this.setState({ errorCount: this.countErrors(this.state.errors) });
      console.log(this.state.supplier_name);

      if (this.state.type == "edit") {
        const data = {
          id: this.state.supplier_code,
          name: this.state.supplier_name,
          companyName: this.state.supplier_company_name,
          suppilerCategoryId: this.state.supplier_category,
          address: this.state.supplier_address,
          phoneNumber: this.state.supplier_contactno,
          email: this.state.supplier_email
        };
        console.log("edit" + data);
        api("PUT", "supermix", "/supplier", "", data, "")
          .then(res => {
            console.log(res.data);

            if (res.data.status === "VALIDATION_FAILURE") {
              console.log("update");
              this.responeserror(res.data.results.name.message);
            } else {
              Notification("success", res.data.message);
              this.props.reload();
              this.setState({ loading: true });
              this.setState({
                supplier_code: "",
                supplier_name: "",
                supplier_company_name: "",
                supplier_category: "",
                supplier_address: "",
                supplier_contactno: "",
                supplier_email: "",
                errormgs: ""
              });
              setTimeout(() => {
                this.setState({ loading: false, visible: false });
              }, 3000);
            }
          })
          .catch(error => {
            // this.setState({
            //   errormgs: "Plant Name Exist"
            // });
            console.log(error);
          });
      } else {
        const data = {
          name: this.state.supplier_name,
          companyName: this.state.supplier_company_name,
          suppilerCategoryId: this.state.supplier_category,
          address: this.state.supplier_address,
          phoneNumber: this.state.supplier_contactno,
          email: this.state.supplier_email
        };
        console.log(data);
        api("POST", "supermix", "/supplier", "", data, "").then(res => {
          console.log("jjjj");
          console.log(res.data);
          if (res.data.status === "VALIDATION_FAILURE") {
            console.log("jjjj");
            // this.responeserror(res.data.results.name.message);
          } else {
            this.props.reload();
            Notification("success", res.data.message);
            this.setState({ loading: true });
            this.setState({
              // supplier_code: "",
              supplier_name: "",
              supplier_company_name: "",
              supplier_category: "",
              supplier_address: "",
              supplier_contactno: "",
              supplier_email: "",
              errormgs: ""
            });
            setTimeout(() => {
              this.setState({ loading: false, visible: false });
            }, 3000);
          }
        });
      }

      console.log("form is valid");
    }
  };

  getallsupplireCategory = () => {
    api("GET", "supermix", "/supplier-categories", "", "", "").then(res => {
      console.log(res.data);
      let a = "supplier - category";
      if (res.data.results.supplierCategory.length > 0) {
        console.log("kkkkkkkkkk");
        let categ = res.data.results.supplierCategory.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.category}
            </Option>
          );
        });
        this.setState({
          categ
        });
      }
    });
  };

  componentDidMount() {
    console.log(this.props.screen);
    this.getallsupplireCategory();
  }

  render() {
    const { visible, loading } = this.state;
    const { errors } = this.state;

    return (
      <div>
        <PrimaryButton
          onClick={this.showModal}
          style={{
            background: "#001328",
            color: "white",
            border: "none",
            width: "120px",
            marginLeft: "-10px"
          }}
        >
          Add Supplier
        </PrimaryButton>
        <Modal
          width='500px'
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Cancel
            </Button>,
            <PrimaryButton
              key='submit'
              loading={loading}
              onClick={e => this.handleSubmit(e)}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              {this.state.type === "edit" ? "Edit" : "Save"}
            </PrimaryButton>
          ]}
          title={
            <MasterLevelFormTitle>
              <p
                style={{
                  color: "white"
                }}
              >
                Add Supplier
              </p>
              <Icon
                type='close-circle'
                onClick={this.handleCancel}
                style={{
                  color: "white"
                }}
              />
            </MasterLevelFormTitle>
          }
        >
          <MasterLevelForm>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "space-evenly"
              }}
            >
              {/* Code */}
              <div className='input_wrapper'>
                <label for='supplier_code' className='label'>
                  Code:
                </label>

                <Input
                  id='supplier_code'
                  name='supplier_code'
                  placeholder='Enter the Code'
                  onChange={this.handleChange}
                  value={this.state.supplier_code}
                  disabled={this.state.type == "edit" ? true : true}
                />
                {/* {errors.code.length > 0 && (
                  <div style={error}>{errors.code}</div>
                )} */}
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Plant Name */}
              <div className='input_wrapper'>
                <label for='supplier_name' className='label'>
                  Supplier Name:
                </label>

                <Input
                  id='supplier_name'
                  name='supplier_name'
                  placeholder='Enter the Supplier'
                  onChange={this.handleChange}
                  value={this.state.supplier_name}
                />
                {errors.name.length > 0 && (
                  <div style={error}>{errors.name}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Company Name */}
              <div className='input_wrapper'>
                <label for='supplier_company_name' className='label'>
                  Company Name:
                </label>

                <Input
                  id='supplier_company_name'
                  name='supplier_company_name'
                  placeholder='Enter the Supplier'
                  onChange={this.handleChange}
                  value={this.state.supplier_company_name}
                />
                {errors.companyName.length > 0 && (
                  <div style={error}>{errors.companyName}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>
              <div className='input_wrapper'>
                <label for='supplier_category' className='label'>
                  Supplier Category:
                </label>

                <Select
                  showSearch
                  style={{ width: "170px" }}
                  id='supplier_category'
                  name='supplier_category'
                  placeholder='Select Category '
                  optionFilterProp='children'
                  onChange={this.handleSelect}
                  defaultValue={this.state.supplier_category}
                  value={this.state.supplier_category}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {this.state.categ}
                  {/* Hard Coded */}
                  {/* <Option value="category01">Category 01</Option>
                  <Option value="category02">Category 02</Option> */}
                </Select>
                {errors.category.length > 0 && (
                  <div style={error}>{errors.category}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Place */}
              <div className='input_wrapper'>
                <label for='supplier_address' className='label'>
                  Address:
                </label>

                <Input
                  id='supplier_address'
                  name='supplier_address'
                  placeholder='Enter the Address'
                  onChange={this.handleChange}
                  value={this.state.supplier_address}
                />
                {errors.address.length > 0 && (
                  <div style={error}>{errors.address}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              {/* T.P No */}
              <div className='input_wrapper'>
                <label for='supplier_contactno' className='label'>
                  Contact No:
                </label>

                <Input
                  className='input_number'
                  id='supplier_contactno'
                  name='supplier_contactno'
                  placeholder='Enter Contact No'
                  onChange={this.handleChange}
                  value={this.state.supplier_contactno}
                />
                {errors.contactno.length > 0 && (
                  <div style={error}>{errors.contactno}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Description  */}
              <div className='input_wrapper'>
                <label for='supplier_email' className='label'>
                  Email:
                </label>

                <Input
                  id='supplier_email'
                  name='supplier_email'
                  placeholder='Enter the Email'
                  onChange={this.handleChange}
                  value={this.state.supplier_email}
                />
                {errors.email.length > 0 && (
                  <div style={error}>{errors.email}</div>
                )}
                <div style={{ height: "12px" }}></div>
              </div>

              {/* Date */}
              {/* <div className="input_wrapper">
              <label for="date" className="label">
                Date
              </label>
              <DatePicker id="date" name="date" placeholder="" />
            </div> */}

              {/* <PrimaryButton
              type="primary"
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Submit
            </PrimaryButton> */}
              {/* <PrimaryButton>Clear</PrimaryButton> */}
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
    // setting visible to false if we close the modal .. and all state data will be deleted if this function is dispatched
    setSupplierVisiblity: () => {
      dispatch({ type: DISABLE_EDIT_MODE });
      console.log("edit modal closed");
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SupplierAddForm);
