import React, { Component } from "react";
import { MasterLevelForm } from "../../../styledcomponents/form/MasterLevelForms";
import {
  FlexList,
  FlexListItem
} from "../../../styledcomponents/list/FlexList";

export default class DeliveryReport extends Component {
  render() {
    return (
      <MasterLevelForm>
        <FlexList>
          <FlexListItem>
            <p>Supplier Name :</p>
            <p>Any Name</p>
          </FlexListItem>
          <FlexListItem>
            <p>Vehicle No :</p>
            <p>Any No</p>
          </FlexListItem>
          <FlexListItem>
            <p>Raw Material :</p>
            <p>Any Material</p>
          </FlexListItem>
          <FlexListItem>
            <p>Moisture Test :</p>
            <p>Any Test</p>
          </FlexListItem>
          <FlexListItem>
            <p>Date :</p>
            <p>Any Date</p>
          </FlexListItem>
          <FlexListItem>
            <p>Tested By:</p>
            <p>Any Tester</p>
          </FlexListItem>
        </FlexList>
      </MasterLevelForm>
    );
  }
}
