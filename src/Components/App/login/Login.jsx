import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import LoginForm from "./LoginFrom";
// import Logo from "../../../assets/tokyocement1.jpg";
import Img from "../../../assets/images1.jpg";
import "./StyleLogin.css";

export default class Login extends Component {
  render() {
    return (
      <FlexContainer className='login'>
        <div className='image_area'>
          <img src={Img} alt='Logo' className='image' />
        </div>

        <LoginForm />
      </FlexContainer>
    );
  }
}
