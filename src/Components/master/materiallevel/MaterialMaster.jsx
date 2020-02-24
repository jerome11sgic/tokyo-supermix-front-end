import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import MaterialtileArea from "./MaterialTileArea";

import ManageNature from "./materialnature/ManageNature";
import ManageMaterial from "./materialMaster/ManageMaterial";

export default class MaterialMaster extends Component {
  state = {
    type: ""
  };

  typechange = type => {
    console.log(type);
    this.setState({ type: type });
  };

  render() {
    return (
      <FlexContainer leveltileareafixed>
        <MaterialtileArea type={this.typechange} />

        {this.state.type === "nature" ? <ManageMaterial /> : <ManageNature />}
      </FlexContainer>
    );
  }
}
