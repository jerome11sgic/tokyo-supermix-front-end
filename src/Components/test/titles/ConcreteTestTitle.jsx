import React, { Component } from "react";
import Paragraph from "antd/lib/typography/Paragraph";
import AddConcreteTest from "../concrete/ConcreteTest";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import Search from "antd/lib/input/Search";

const style = {
  fontSize: "medium",
  fontWeight: "600",
  alignSelf: "auto",
  padding: "10px"
};

export default class ConcreteTestTitle extends Component {
  getallConcreteTest = () => {
    this.props.reload();
  };
  render() {
    return (
      <FlexContainer titles leveltitles>
        <Paragraph style={style}>Concrete Test</Paragraph>
        <div style={{ display: "flex" }}>
          {/* <Search
        placeholder="Search Employee"
        onSearch={value => console.log(value)}
        style={{ width: 200, height: 30, marginRight: "50px" }}
      /> */}
          <AddConcreteTest reload={this.getallConcreteTest} />
        </div>
      </FlexContainer>
    );
  }
}
