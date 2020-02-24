import React, { Component } from 'react';
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
 import FinshTileArea from "./FinshProductTileArea";
 import AddFinshSample from './AddFinshProduct';
import ManageFinshSample from './ManageFinshProduct';

export default class FinshProductSampleMaster extends Component {
    render() {
        return (
            <FlexContainer
            style={{ marginTop: "-15px", justifyContent: "space-around" }}
          >
              <FinshTileArea/>
              <AddFinshSample/>
              <ManageFinshSample/>
            </FlexContainer>   
        )
    }
}
