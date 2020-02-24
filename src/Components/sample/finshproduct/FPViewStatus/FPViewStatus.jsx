import React, { Component } from "react";

import "./FPViewStyle.css";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import { NavigationLink } from "../../../styledcomponents/Link/NavLink";
import { ImageCard } from "../../../styledcomponents/card/ImageCard";
import { Heading1 } from "../../../styledcomponents/typography/typography";

class FPViewStatus extends Component {
  render() {
    return (
      <div className='fpViewStatus'>
        <FlexContainer
          style={{ justifyContent: "space-around", paddingTop: "20px" }}
        >
          <NavigationLink to=''>
            <ImageCard reports>
              <div style={{ display: "flex", padding: "5px", margin: "10px" }}>
                <Heading1>Strength Test</Heading1>
              </div>
            </ImageCard>
          </NavigationLink>

          <NavigationLink to=''>
            <ImageCard reports>
              <div style={{ display: "flex", padding: "5px", margin: "10px" }}>
                <Heading1>Slump Test</Heading1>
              </div>
            </ImageCard>
          </NavigationLink>

          <NavigationLink to=''>
            <ImageCard reports>
              <div style={{ display: "flex", padding: "5px", margin: "10px" }}>
                <Heading1>Moisture Test</Heading1>
              </div>
            </ImageCard>
          </NavigationLink>
        </FlexContainer>
      </div>
    );
  }
}

export default FPViewStatus;
