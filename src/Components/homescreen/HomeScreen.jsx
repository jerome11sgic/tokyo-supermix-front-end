import React, { Component } from "react";
import { FlexContainer } from "../styledcomponents/container/FlexGrid";

import { ImageCard } from "../styledcomponents/card/ImageCard";
import { NavigationLink } from "../styledcomponents/Link/NavLink";
import "./style.css";
import SupplierChain from "./SupplierChain";
import Slider from "./Slider";
import Slider2 from "./Slider2";
import { connect } from "react-redux";

import { ToggleDisplayWindow } from "./ToggleDisplayWindow";
import {
  TOGGLE_TO_MASTER_TYPE_NAVIGATION,
  TOGGLE_TO_HOME_SCREEN_NAVIGATION,
  TOGGLE_TO_SAMPLE_TYPE_NAVIGATION,
  TOGGLE_TO_TEST_TRIALS_NAVIGATION,
  TOGGLE_TO_TEST_CONFIGURATION_NAVIGATION,
  TOGGLE_TO_MIX_DESIGN_NAVIGATION,
  TOGGLE_TO_TEST_RESULTS_NAVIGATION
} from "../../redux/action/topbarnavigation/TopbarNavigation";
import { HomeColoredCard } from "./HomeColoredCard";
import StrengthTest from "./charts/StrengthTest";
import { ChartResContainer } from "../styledcomponents/container/ChartResContainer";

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slider2: false
    };
  }
  componentDidMount() {
    const { navigationRefresh } = this.props;
    navigationRefresh();
  }

  render() {
    return (
      <FlexContainer normal>
        <div className='tiles_area'>
          {/* tile column 1 start*/}
          <div className='tile_col_1'>
            {/* column 1 tile 1 start*/}
            <NavigationLink
              to='/master/plantlevel'
              onClick={this.props.toggleMasterNavigation}
            >
              <ImageCard master>
                <div>
                  <h1 className='h1'>Master</h1>
                  <br></br>
                  <div style={{ height: "25px" }}></div>
                  <div className='ani'>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className='ani1'
                    >
                      Plant Level
                    </h4>
                    {/* <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                     Category
                    </h4> */}
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                      Materials
                    </h4>
                    {/* <h4
                      style={{
                        color: "#ffff"
                      }}
                    >
                     Parameter
                    </h4> */}
                  </div>
                </div>
              </ImageCard>
            </NavigationLink>
            {/* column 1 tile 1 end*/}
            {/* column 1 tile 2 start*/}
            <NavigationLink
              to='/samples'
              onClick={this.props.toggleSampleNavigation}
            >
              <ImageCard configuration>
                <div>
                  <h1 className='h1' style={{ marginLeft: "-120px" }}>
                    Samples
                  </h1>
                  <br></br>
                  <div style={{ height: "25px" }}></div>
                  <div className='ani'>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className='ani1'
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
            </NavigationLink>
            {/* column 1 tile 2 end*/}
            {/* column 1 tile 3 start*/}
            <NavigationLink
              to='/testreport'
              onClick={this.props.toggleTestResults}
            >
              <ImageCard reports>
                <div>
                  <h1 className='h1' style={{ marginLeft: "-10px" }}>
                    {" "}
                    Test Result & Test Report{" "}
                  </h1>
                  <br></br>
                  <div style={{ height: "25px" }}></div>
                  <div className='ani' style={{ marginTop: "-10px" }}>
                    <h4
                      style={{
                        color: "#ffff",
                        marginTop: "25px"
                      }}
                      className='ani1'
                    >
                      Samples
                    </h4>
                    {/* <h4
                    style={{
                      color: "#ffff"
                    }}
                  >
                    Final Product
                  </h4> */}
                  </div>
                </div>
              </ImageCard>
            </NavigationLink>
            {/* column 1 tile 3 end*/}
          </div>
          {/* tile column 1 end*/}

          {/* tile column 2 start*/}
          <div className='tile_col_2'>
            {/* column 2 tile 1 start*/}
            <NavigationLink
              to='/testconfiguration'
              onClick={this.props.toggleTestConfigurationNavigation}
            >
              <ImageCard testing>
                <div>
                  <h1 className='h1' style={{ marginLeft: "-45px" }}>
                    Test Configuration
                  </h1>
                  <br></br>
                  <div style={{ height: "25px" }}></div>
                  <div className='ani'>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className='ani1'
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
            </NavigationLink>
            {/* column 2 tile 1 end*/}
            {/* column 2 tile 2 start*/}
            <NavigationLink
              to='/trialcards'
              onClick={this.props.toggleTestTrialsNavigation}
            >
              <ImageCard testTrial>
                <div>
                  <h1 className='h1' style={{ marginLeft: "-95px" }}>
                    Test Trials
                  </h1>
                  <br></br>
                  <div style={{ height: "25px" }}></div>
                  <div className='ani'>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className='ani1'
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
                    {/* <h4
                    style={{
                      color: "#ffff"
                    }}
                  >
                    Final Product
                  </h4> */}
                  </div>
                </div>
              </ImageCard>
            </NavigationLink>
            {/* column 2 tile 2 end*/}
            {/* column 2 tile 3 start*/}
            <NavigationLink
              to='/mixdesign'
              onClick={this.props.toggleMixDesignNavigation}
            >
              <ImageCard mixDesign>
                <div>
                  <h1
                    className='h1'
                    style={{ textAlign: "left", marginLeft: "2em" }}
                  >
                    Mix Design
                  </h1>
                  <br></br>
                  <div style={{ height: "25px" }}></div>
                  <div className='ani'>
                    <h4
                      style={{
                        color: "#ffff"
                      }}
                      className='ani1'
                    >
                      Mix Design <br /> Proportion
                    </h4>
                  </div>
                </div>
              </ImageCard>
            </NavigationLink>
            {/* column 2 tile 3 end*/}
          </div>
          {/* tile column 2 end*/}
        </div>
        {/* <div className='charts_area'>
          <Slider />
          <Slider2 />s
        </div> */}
        <FlexContainer column>
          <FlexContainer resCardArea>
            {/* {CircularRadialBar(75)}
            {CircularRadialBar(85)}
            {CircularRadialBar(65)}
            {CircularRadialBar(25)} */}
            {HomeColoredCard("blue", "Fine Aggregate", 25)}
            {HomeColoredCard("green", "Cement", 15)}
            {HomeColoredCard("purple", "Admixture", 6)}
            {HomeColoredCard("red", "Coarse Aggregate", 2)}

            {/* <ToggleDisplayWindow /> */}
          </FlexContainer>
          <ChartResContainer>
            <StrengthTest />
          </ChartResContainer>
        </FlexContainer>

        {/* <SupplierChain /> */}
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    navpath: state.topbarNavigationReducers.navpath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleMasterNavigation: () => {
      dispatch({ type: TOGGLE_TO_MASTER_TYPE_NAVIGATION });
      console.log("toggled to master navigation click dispatched");
    },
    navigationRefresh: () => {
      dispatch({ type: TOGGLE_TO_HOME_SCREEN_NAVIGATION });
      console.log("toggled to home screen navigation render dispatched");
    },
    toggleSampleNavigation: () => {
      dispatch({ type: TOGGLE_TO_SAMPLE_TYPE_NAVIGATION });
      console.log("toggled to samples navigation click dispatched");
    },
    toggleTestTrialsNavigation: () => {
      dispatch({ type: TOGGLE_TO_TEST_TRIALS_NAVIGATION });
      console.log("toggled to test trials navigation click dispatched");
    },
    toggleTestConfigurationNavigation: () => {
      dispatch({ type: TOGGLE_TO_TEST_CONFIGURATION_NAVIGATION });
      console.log("toggled to test configuration navigation click dispatched");
    },
    toggleMixDesignNavigation: () => {
      dispatch({ type: TOGGLE_TO_MIX_DESIGN_NAVIGATION });
      console.log("toggled to mixdesign navigation click dispatched");
    },
    toggleTestResults: () => {
      dispatch({ type: TOGGLE_TO_TEST_RESULTS_NAVIGATION });
      console.log("toggled to test results navigation click dispatched");
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
