import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import BasicCard from "../../styledcomponents/card/BasicCard";
import imgObj from "../../../assets/labtesting.jpg";
// import { ManageTest, MaterialsType } from "./TestTrial";
import { NavigationLink } from "../../styledcomponents/Link/NavLink";
import TestTrialMaster from "../../test/testtrial/TestTrialMaster";
import { api } from "../../services/AxiosService";

const testTypes = [
  {
    id: 34,
    type: "Fine aggregates"
  },
  {
    id: 35,
    type: "Coarse aggregates"
  },
  {
    id: 36,
    type: "Admixture"
  }
];

export const TestTypePage = ({ match, location }) => {
  const {
    params: { testTypeId }
  } = match;

  return (
    <div>
      <div>
        <TestTrialMaster typeId={testTypeId} />
      </div>
      {/* <div style={{ height: "40px" }}></div>
      {/* <div>
          {ManageTest(testData[testId - 1].data, testData[testId - 1].name)}
        </div> */}{" "}
      */}
    </div>
  );
};

export default class TestType extends Component {
  state = {
    typeData: ""
  };
  componentDidMount() {
    this.getallTypes();
  }
  getallTypes = () => {
    api("GET", "supermix", "/test-types", "", "", "").then(res => {
      console.log(res.data);
      let typeData = res.data.results.testTypes.map((post, index) => {
        return (
          <NavigationLink to={`/testtype/${post.id}`}>
            <BasicCard
              testtrial
              finalproduct
              imgUrl={imgObj}
              style={{ margin: "10px" }}
            >
              <h1 style={styleObj}>{post.type}</h1>
            </BasicCard>
          </NavigationLink>
        );
      });
      this.setState({
        typeData
      });
    });
  };
  render() {
    return <FlexContainer home>{this.state.typeData}</FlexContainer>;
  }
}
const styleObj = {
  fontSize: 20,
  color: "#fff",
  textAlign: "center",
  paddingTop: "30px",
  fontFamily: "Arial"
};
