/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";

import { Input, Icon, Button, Avatar } from "antd";
import FollowAt from "react-social-media-follow";
import "./Profilestyle.css";
// import UserIcon from "../../assets/user3.png";

import TextArea from "antd/lib/input/TextArea";
import { FlexContainer } from "../styledcomponents/container/FlexGrid";
import { MasterLevelForm } from "../styledcomponents/form/MasterLevelForms";

const links = [
  "https://twitter.com/magicahmd",
  "https://www.facebook.com/pages/category/Industrial-Company/Tokyo-Cement-Co-Lanka-PLC-265617693452213",
  "https://www.instagram.com/ahmdsalhi"
];
class Profile extends Component {
  render() {
    return (
      <FlexContainer>
        <FlexContainer>
          <div className='profileCard'>
            <div className='card-background'>
              <Avatar size={100} style={{ marginTop: "20px", padding: "10px" }}>
                <Icon
                  type='user'
                  style={{ fontSize: "50px", padding: "10px" }}
                />
              </Avatar>
              {/* <img src={UserIcon} className='card-image' /> */}
            </div>
            <div className='card-info'>
              <h1 className='username'>User Name</h1>
              <br />
              <p className='profileHeading '>
                {" "}
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </p>
              <div className='profilefollow'>
                <FollowAt links={links} />
              </div>
            </div>
          </div>
        </FlexContainer>
        <FlexContainer column>
          <div className='profileForm'>
            <h4 className='formHeading'>Profile Details</h4>
            <MasterLevelForm>
              {/* first Name */}
              <div className='input_wrapper'>
                <label for='id' className='label'>
                  First Name
                </label>
                <Input id='id' name='id' placeholder='' />
              </div>

              {/* Last Name */}

              <div className='input_wrapper'>
                <label for='customer_name' className='label'>
                  Last Name
                </label>
                <Input id='customer_name' name='customer_name' placeholder='' />
              </div>

              {/* Email Address */}

              <div className='input_wrapper'>
                <label for='address' className='label'>
                  Email Address
                </label>
                <Input id='address' name='address' placeholder='' />
              </div>

              {/* Address */}

              <div className='input_wrapper'>
                <label for='address' className='label'>
                  Address
                </label>
                <Input id='address' name='address' placeholder='' />
              </div>

              {/* Phone Number */}

              <div className='input_wrapper'>
                <label for='phoneno' className='label'>
                  Phone Number
                </label>
                <Input id='phoneno' name='phoneno' placeholder='' />
              </div>

              {/* UserName */}

              <div className='input_wrapper'>
                <label for='username' className='label'>
                  UserName
                </label>
                <Input id='username' name='username' placeholder='' />
              </div>

              {/* Plant */}

              <div className='input_wrapper'>
                <label for='plant' className='label'>
                  Plant{" "}
                </label>
                <Input id='plant' name='plant' placeholder='' />
              </div>

              {/* Role */}

              <div className='input_wrapper'>
                <label for='role' className='label'>
                  Role
                </label>
                <Input id='role' name='role' placeholder='' />
              </div>

              {/* Description */}

              <div className='input_wrapper'>
                <label for='phoneno' className='label'>
                  Description
                </label>
                <TextArea
                  id='description'
                  name='phoneno'
                  placeholder=''
                  style={{ width: "400px" }}
                />
              </div>
              {/* Update Button */}

              <div className='profilebutton'>
                <Button type='primary'>Update profile</Button>
              </div>
            </MasterLevelForm>
          </div>
        </FlexContainer>
      </FlexContainer>
    );
  }
}

export default Profile;
