import React, { Component } from "react";
import { Icon } from "antd";
import BasicCard from "../../styledcomponents/card/BasicCard";
import "./styleCategory.css";
import { connect } from "react-redux";
import {
  ROUTE_TO_MAIN_CATEGORY_MASTER,
  ROUTE_TO_SUB_CATEGORY_MASTER,
  ROUTE_TO_SAMPLE_CATEGORY_MASTER,
  ROUTE_TO_MATERIAL_TYPE
} from "../../../redux/action/master/categorylevel/CatergoryLevel";
import {
  TileArea,
  TileAreaText,
  TileAreaAction
} from "../../styledcomponents/card/TileArea";

class CategoryTitleArea extends Component {
  render() {
    return (
      <TileArea>
        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToMaterialType}
        >
          <TileAreaText category>Material Category</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>
        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToMainCategoryMaster}
        >
          <TileAreaText materialcategory unit>
            Material Sub Category
          </TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>
        {/* <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToSubCategoryMaster}
        >
          <TileAreaText materialcategory unit>
            Material Sub Category
          </TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard>
        <BasicCard
          finalproduct
          tileareacard
          size='small'
          hoverable={true}
          onClick={this.props.routeToSampleCategoryMaster}
        >
          <TileAreaText category>Sample Category</TileAreaText>
          <TileAreaAction>
            <Icon
              filled
              type='plus'
              style={{ color: "red", fontSize: "22px" }}
            />
          </TileAreaAction>
        </BasicCard> */}
      </TileArea>
    );
  }
}

// const mapStateToProps = state => {};

const mapDispatchToProps = dispatch => {
  return {
    routeToMainCategoryMaster: () => {
      dispatch({ type: ROUTE_TO_MAIN_CATEGORY_MASTER });
      console.log("ROUTE_TO_MAIN_CATEGORY_MASTER click dispatched");
    },
    routeToSubCategoryMaster: () => {
      dispatch({ type: ROUTE_TO_SUB_CATEGORY_MASTER });
      console.log("ROUTE_TO_SUB_CATEGORY_MASTER click dispatched");
    },
    routeToSampleCategoryMaster: () => {
      dispatch({ type: ROUTE_TO_SAMPLE_CATEGORY_MASTER });
      console.log("ROUTE_TO_SAMPLE_CATEGORY_MASTER click dispatched");
    },
    routeToMaterialType: () => {
      dispatch({ type: ROUTE_TO_MATERIAL_TYPE });
      console.log("ROUTE_TO_MATERIAL_TYPE click dispatched");
    }
  };
};

export default connect(null, mapDispatchToProps)(CategoryTitleArea);
