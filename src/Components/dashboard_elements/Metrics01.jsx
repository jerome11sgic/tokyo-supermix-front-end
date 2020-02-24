import React, { Component } from "react";
import Concrete from "../../assets/concrete.png";
import Concrete2x from "../../assets/concrete@2x.png";
import Concrete3x from "../../assets/concrete@3x.png";
import "./style.css";

export default class Metrics01 extends Component {
  render() {
    return (
      <div>
        <div className="rectangle-6">
          <div className="arranger">
            <div className="rectangle-7">
              <img
                src={Concrete}
                // srcset={(Concrete, Concrete2x, Concrete3x)}
                class="concrete"
                alt="sorry no img"
              />
            </div>
            <div style={{ flexBasis: "15px" }}></div>
            <div className="Samples-Tested">Samples Tested</div>
          </div>
          <br />
          <div className="arranger2">
            <div className="Icon-material-keyboard-arrow-down" />
            <div className="data_area">10</div>
          </div>
        </div>
      </div>
    );
  }
}
