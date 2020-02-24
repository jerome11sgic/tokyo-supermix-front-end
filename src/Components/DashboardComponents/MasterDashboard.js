import React from "react";
import { Row, Col } from "antd";
import Material from "../../assets/material2.jpg";
import Mixer from "../../assets/concretemixer.jpg";
import Lab from "../../assets/labtesting.jpg";
import MasterSupplier from "../../assets/master.jpg";
import RawMaterial from "../../assets/cementbag.jpg";
import FinalProduct from "../../assets/finalproduct2.jpg";
import Settings from "../../assets/settings.png";
import Reports from "../../assets/reports.png";
import "./style.css";
import theme from "../../theme";
import { NavigationLink } from "../styledcomponents/Link/NavLink";
import { FlexContainer } from "../styledcomponents/container/FlexGrid";
import { ImageCard } from "../styledcomponents/card/ImageCard";

export default class Master extends React.Component {
  state = {
    materialExpanded: false
  };

  expandMaterial() {
    this.setState({
      materialExpanded: true
    });
  }

  collapseMaterial() {
    this.setState({
      materialExpanded: false
    });
  }

  routeToFinalProduct() {}

  render() {
    return (
      <div className="container_flex">
        <FlexContainer>
          <div className="container">
            {/* if material big card clicked it will collapse into 2 cards */}
            {this.state.materialExpanded ? (
              <div onMouseLeave={() => this.collapseMaterial()}>
                <div className="gutter-box collapsible">
                  {/* raw material start */}
                  <NavigationLink to="/rawmaterial">
                    <ImageCard rawmaterial className="res2">
                      <div>
                        <h3 className="ani2">Raw Materials</h3>
                      </div>
                    </ImageCard>
                  </NavigationLink>
                  {/* raw material end */}
                  <div style={{ width: "1em" }}></div>
                  {/* final product start */}
                  <NavigationLink to="/finalproduct">
                    <ImageCard finalproduct className="res2">
                      <div>
                        <h3 className="ani2">Final Product</h3>
                      </div>
                    </ImageCard>
                  </NavigationLink>
                  {/* raw material end */}
                </div>
              </div>
            ) : (
              <div className="gutter-box" onClick={() => this.expandMaterial()}>
                <ImageCard material className="res">
                  <div>
                    <h1 className="h1">Materials</h1>
                    <br></br>
                    <div style={{ height: "50px" }}></div>
                    <div className="ani">
                      <h4
                        style={{
                          color: "#ffff"
                        }}
                        className="ani1"
                      >
                        Raw Materials
                      </h4>
                      <h4
                        style={{
                          color: "#ffff"
                        }}
                      >
                        Final Product
                      </h4>
                    </div>
                  </div>
                </ImageCard>
              </div>
            )}
          </div>

          <div className="container">
            <div className="gutter-box">
              <ImageCard samples className="res">
                <div>
                  <h1 className="h1">Samples</h1>
                  <br></br>
                  <div style={{ height: "50px" }}></div>
                  <div className="ani">
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className="ani1"
                    >
                      Raw Materials
                    </h4>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                      Final Product
                    </h4>
                  </div>
                </div>
              </ImageCard>
            </div>
          </div>

          <div className="container">
            <div className="gutter-box">
              <ImageCard testing className="res">
                <div>
                  <h1 className="h1">Testing</h1>
                  <br></br>
                  <div style={{ height: "50px" }}></div>
                  <div className="ani">
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className="ani1"
                    >
                      Raw Materials
                    </h4>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                      Final Product
                    </h4>
                  </div>
                </div>
              </ImageCard>
            </div>
          </div>

          <div className="container">
            <div className="gutter-box">
              <ImageCard master className="res">
                <div>
                  <h1 className="h1">Master</h1>
                  <br></br>
                  <div style={{ height: "50px" }}></div>
                  <div className="ani">
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className="ani1"
                    >
                      Raw Materials
                    </h4>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                      Final Product
                    </h4>
                  </div>
                </div>
              </ImageCard>
            </div>
          </div>
        </FlexContainer>
        <br></br>
        <FlexContainer style={{ justifyContent: "space-between" }}>
          <div className="container">
            <div className="gutter-box">
              <ImageCard reports className="res">
                <div>
                  <h1 className="h1">Samples</h1>
                  <br></br>
                  <div style={{ height: "50px" }}></div>
                  <div className="ani">
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className="ani1"
                    >
                      Raw Materials
                    </h4>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                      Final Product
                    </h4>
                  </div>
                </div>
              </ImageCard>
            </div>
          </div>

          <div>
            <div className="gutter-box">
              <ImageCard importexcel className="res">
                <div>
                  <h1 className="h1">Test Trial</h1>
                  <br></br>
                  <div style={{ height: "50px" }}></div>
                  <div className="ani">
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className="ani1"
                    >
                      Raw Materials
                    </h4>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                      Final Product
                    </h4>
                  </div>
                </div>
              </ImageCard>
            </div>
          </div>

          <div>
            <div className="gutter-box">
              <ImageCard accounts className="res">
                <div>
                  <h1 className="h1">Test Result & Test Report </h1>
                  <br></br>
                  <div style={{ height: "50px" }}></div>
                  <div className="ani">
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className="ani1"
                    >
                      Raw Materials
                    </h4>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                      Final Product
                    </h4>
                  </div>
                </div>
              </ImageCard>
            </div>
          </div>

          <div>
            <div className="gutter-box">
              <ImageCard settings className="res">
                <div>
                  <h1 className="h1">Settings</h1>
                  <br></br>
                  <div style={{ height: "50px" }}></div>
                  <div className="ani">
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className="ani1"
                    >
                      Raw Materials
                    </h4>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                      Final Product
                    </h4>
                  </div>
                </div>
              </ImageCard>
            </div>
          </div>
        </FlexContainer>
      </div>
    );
  }
}
