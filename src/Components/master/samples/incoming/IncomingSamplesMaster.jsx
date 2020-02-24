import React, { Component } from 'react';
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import IncomingTileArea from "./IncomingTileArea";
import Addincomingsample from './Addincoming';
import ManageincomingSample from './ManageIncoming';


export default class IncomingSamplesMaster extends Component {
    render() {
        return (
            <FlexContainer
            style={{ marginTop: "-15px", justifyContent: "space-around" }}
          >
              <IncomingTileArea/>

              <Addincomingsample/>
              <ManageincomingSample/>
            </FlexContainer>   
        )

    }
}
