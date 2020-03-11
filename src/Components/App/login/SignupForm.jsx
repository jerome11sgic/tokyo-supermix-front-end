/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Select } from "antd";
import FollowAt from "react-social-media-follow";

import Logo from "../../../assets/tokyosuper.png";
import { Link } from "react-router-dom";
import { MasterLevelForm } from "../../styledcomponents/form/MasterLevelForms";
import Notification from "../../Constant/Notification";
import { api } from "../../services/AxiosService";

const { Option } = Select;
const links = [
  "https://twitter.com/magicahmd",
  "https://www.facebook.com/pages/category/Industrial-Company/Tokyo-Cement-Co-Lanka-PLC-265617693452213",
  "https://www.youtube.com/magicahmd",
  "https://www.instagram.com/ahmdsalhi"
];

export default class SignupForm extends Component {
  state = {
    userName: "",
    password: "",
    employeeId: ""
  };

  componentDidMount() {
    this.Selectemployee();
  }

  handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handelSelect = value => {
    console.log(value);
    this.setState({
      employeeId: value
    });
  };
  handleSubmit = e => {
    e.preventDefault();
    const data = {
      userName: this.state.userName,
      password: this.state.password,
      employeeId: this.state.employeeId
    };
    console.log(data);
    api("POST", "supermix", "/user", "", data, "").then(res => {
      console.log(res.data);
      Notification("success", res.data.message);
      this.setState({
        userName: "",
        password: "",
        employeeId: ""
      });
    });
  };
  Selectemployee = () => {
    api("GET", "supermix", "/employees", "", "", "").then(res => {
      console.log(res.data);

      if (res.data.results.employees.length > 0) {
        let employeeselect = res.data.results.employees.map((post, index) => {
          console.log(post.firstName);
          console.log("kkkkkkkkkk");
          return (
            <Option value={post.id} key={index}>
              {post.firstName}
            </Option>
          );
        });
        this.setState({
          employeeselect
        });
      }
    });
  };

  render() {
    return (
      <div className="login_form_area">
        <img
          src={Logo}
          className="logo_login"
          alt="Logo"
          style={{ height: "80px", width: "400px" }}
        />
        <div className="signup_form_card">
          <MasterLevelForm
            onSubmit={this.handleSubmit}
            style={{ flexDirection: "column", height: "400px", width: "250px" }}
          >
            <h3 className="h1_login">Create a new Account</h3>

            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Username"
              id="userName"
              name="userName"
              value={this.state.userName}
              onChange={this.handleChange}
            />

            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />

            {/* <Input
              prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='password'
              placeholder='Confirm Password'
            /> */}
            {/* 
            <Input
              prefix={<Icon type='mail' style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder='Email'
              type='email'
            /> */}

            <Select
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Select Employee"
              value={this.state.employeeId}
              onChange={value => this.handelSelect(value)}
            >
              {this.state.employeeselect}
            </Select>

            {/* <Select
              prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='Plant'
              placeholder='Select the Plant'
            >
              <Option value='cement'>Peliyagoda</Option>
              <Option value='admixture'>Trincomale</Option>
              <Option value='riverSand '>Jaffna</Option>
              <Option value='riverSand '>Ratmalana</Option>
            </Select> */}

            <Link to="/login">
              <Button
                style={{ background: "#001328", color: "white" }}
                htmlType="submit"
                className="login-form-button"
                onClick={this.handleSubmit}
              >
                Sign Up
              </Button>
            </Link>
            <h4>
              Already have an Account ?{" "}
              <Link to="/login">
                <u>Login</u>
              </Link>
            </h4>
          </MasterLevelForm>
        </div>
        <div className="follow_signup">
          <FollowAt links={links} />
        </div>
        <div className="footer_signup">
          <h5 className="h5">
            Quality Data Management System @ 2020 Created By Tokyo Cement Group
          </h5>
        </div>
      </div>
    );
  }
}
