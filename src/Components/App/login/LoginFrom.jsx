/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { Form, Icon, Input, Button, Checkbox, Select } from "antd";
import FollowAt from "react-social-media-follow";

import Logo from "../../../assets/tokyosuper.png";
import { Link } from "react-router-dom";

const { Option } = Select;
const links = [
  "https://twitter.com/magicahmd",
  "https://www.facebook.com/pages/category/Industrial-Company/Tokyo-Cement-Co-Lanka-PLC-265617693452213",
  "https://www.youtube.com/magicahmd",
  "https://www.instagram.com/ahmdsalhi"
];

export default class LoginForm extends Component {
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
        <div className='login_form_card'>
          <Form onSubmit={this.handleSubmit} className='login-form'>
            <h3 className='h1_login'>Login to your account</h3>
            <div className='login_form'>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type='user' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder='Username'
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={
                    <Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type='password'
                  placeholder='Password'
                />
              </Form.Item>
              <Form.Item>
                <Select
                  prefix={
                    <Icon type='lock' style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type='Plant'
                  placeholder='Select the Plant'
                >
                  <Option value='cement'>peliyagoda</Option>
                  <Option value='admixture'> Trincomale</Option>
                  <Option value='riverSand '>Jaffna</Option>
                  <Option value='riverSand '>Ratmalana</Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Checkbox>Remember me</Checkbox>

                <a href='' className='login-form-forgot'>
                  Forgot password?
                </a>
                <Link to='/'>
                  {" "}
                  <Button
                    style={{ background: "#001328", color: "white" }}
                    htmlType='submit'
                    className='login-form-button'
                  >
                    Login
                  </Button>
                </Link>
                <h4>
                  Don't have an Account{" "}
                  <Link to='/signup'>
                    <u>Signup</u>
                  </Link>
                </h4>
              </Form.Item>
            </div>
          </Form>
        </div>
        <div className='follow'>
          <FollowAt links={links} />
        </div>
        <div className='footer'>
          <h5 className='h5'>
            Quality Data Management System @ 2020 Created By Tokyo Cement Group
          </h5>
        </div>
      </div>
    );
  }
}
