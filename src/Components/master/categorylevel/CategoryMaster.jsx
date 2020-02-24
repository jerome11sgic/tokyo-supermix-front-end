import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";

import CategoryTitleArea from "./CategoryTileArea";
import { connect } from "react-redux";

import ManageMainCategory from "./maincategory/ManageMainCategory";

import ManageSampleCategory from "./samplecategory/ManageSampleCategory";

import ManageSubCategory from "./subcategory/ManageSubCategory";
import ManageType from "../categorylevel/materialtype/ManageType";

class CategoryMaster extends Component {
  renderComponents = () => {
    if (this.props.routepath === "/materialtypemaster") {
      return <ManageType />;
    } else if (this.props.routepath === "/subcatergorymaster") {
      return <ManageSubCategory />;
    } else if (this.props.routepath === "/samplecatergorymaster") {
      return <ManageSampleCategory />;
    } else if (this.props.routepath === "/maincatergorymaster") {
      return <ManageMainCategory />;
    }
  };
  render() {
    return (
      <FlexContainer leveltileareafixed>
        <CategoryTitleArea />
        {this.renderComponents()}
      </FlexContainer>
    );
  }
}

const mapStateToProps = state => {
  return {
    routepath: state.categoryLevelReducers.RoutingBetweenCategoryLevel.routepath
  };
};

// const mapDispatchToProps = dispatch => {};

export default connect(mapStateToProps, null)(CategoryMaster);
