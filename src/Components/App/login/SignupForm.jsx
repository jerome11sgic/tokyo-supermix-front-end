/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Select } from "antd";
import FollowAt from "react-social-media-follow";

import Logo from "../../../assets/tokyosuper.png";
import { Link } from "react-router-dom";
import { MasterLevelForm } from "../../styledcomponents/form/MasterLevelForms";

const { Option } = Select;
const links = [
  "https://twitter.com/magicahmd",
  "https://www.facebook.com/pages/category/Industrial-Company/Tokyo-Cement-Co-Lanka-PLC-265617693452213",
  "https://www.youtube.com/magicahmd",
  "https://www.instagram.com/ahmdsalhi"
];

export default class SignupForm extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    return (
      <div className='login_form_area'>
        <img
          src={Logo}
          className='logo_login'
          alt='Logo'
          style={{ height: "80px", width: "400px" }}
        />
        <div className='signup_form_card'>
          <MasterLevelForm
            onSubmit={this.handleSubmit}
            style={{ flexDirection: "column", height: "400px", width: "250px" }}
          >
            <h3 className='h1_login'>Create a new Account</h3>

            <Input
              prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder='Username'
            />

            <Input
              prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='password'
              placeholder='Password'
            />

            <Input
              prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='password'
              placeholder='Confirm Password'
            />

            <Input
              prefix={<Icon type='mail' style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder='Email'
              type='email'
            />

            <Select
              prefix={<Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='Plant'
              placeholder='Select Employee'
            >
              <Option value='1'>A</Option>
              <Option value='2'>B</Option>
              <Option value='3'>C</Option>
            </Select>

            <Select
              prefix={<Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />}
              type='Plant'
              placeholder='Select the Plant'
            >
              <Option value='cement'>Peliyagoda</Option>
              <Option value='admixture'>Trincomale</Option>
              <Option value='riverSand '>Jaffna</Option>
              <Option value='riverSand '>Ratmalana</Option>
            </Select>

            <Link to='/login'>
              <Button
                style={{ background: "#001328", color: "white" }}
                htmlType='submit'
                className='login-form-button'
              >
                Sign Up
              </Button>
            </Link>
            <h4>
              Already have an Account ?{" "}
              <Link to='/login'>
                <u>Login</u>
              </Link>
            </h4>
          </MasterLevelForm>
        </div>
        <div className='follow_signup'>
          <FollowAt links={links} />
        </div>
        <div className='footer_signup'>
          <h5 className='h5'>
            Quality Data Management System @ 2020 Created By Tokyo Cement Group
          </h5>
        </div>
      </div>
    );
  }
}
