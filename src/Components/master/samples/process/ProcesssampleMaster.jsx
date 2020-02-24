import React, { Component } from 'react';
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
 import ProcessTileArea from "./ProcessTileArea";
 import AddProcessSample from './AddProcessSample';
import ManageProcessSample from './ManageProcessSample';

export default class ProcesssampleMaster extends Component {
    render() {
        return (
            <FlexContainer
            style={{ marginTop: "-15px", justifyContent: "space-around" }}
          >
             
            <ProcessTileArea/>
            <AddProcessSample/>
            <ManageProcessSample/>
            </FlexContainer>   
        )
    }
}

