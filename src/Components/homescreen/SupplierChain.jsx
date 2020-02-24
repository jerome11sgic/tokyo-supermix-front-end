import React, { Component } from "react";
import "./style1.css";
import FinalProduct from "../../assets/skins/efficiency.png";
import ProcessSamples from "../../assets/skins/processing.png";
import IncomingSamples from "../../assets/skins/concrete_mixer.png";
import Arrow from "../../assets/skins/arrowdown.png";

const altText = "sorry no image";

export default class SupplierChain extends Component {
  render() {
    return (
      <div id='rectangle_8' style={{ position: "relative" }}>
        {/* incoming  samples box */}
        <div id='incomingsamples' style={{ position: "relative" }}>
          <div id='item03' style={{ position: "relative" }}></div>
          <div id='incoming_samples' style={{ position: "relative" }}>
            Incoming Samples
          </div>

          <div id='icon_ek1' style={{ position: "relative" }}>
            <div
              id='item03innerrectangle'
              style={{ position: "relative" }}
            ></div>
            <img src={IncomingSamples} id='concrete_mixer' alt={altText} />
          </div>
          <div id='_10_ek2' style={{ position: "relative" }}>
            10
          </div>
          <img src={Arrow} id='arrowdown_ek2' alt={altText} />
        </div>
        {/* process  samples box */}
        <div id='processsamples' style={{ position: "relative" }}>
          <div id='wrapper_ek1' style={{ position: "relative" }}></div>
          <div id='process_samples' style={{ position: "relative" }}>
            Process Samples
          </div>
          <div id='icon' style={{ position: "relative" }}>
            <div id='inner_ek1' style={{ position: "relative" }}></div>
            <img src={ProcessSamples} id='processing' alt={altText} />
          </div>
          <div id='_10_ek1' style={{ position: "relative" }}>
            5
          </div>
          <img src={Arrow} id='arrowdown_ek1' alt={altText} />
        </div>
        {/* final products box */}
        <div id='finalproducts' style={{ position: "relative" }}>
          <div id='wrapper' style={{ position: "relative" }}>
            {" "}
          </div>
          <div id='final_products' style={{ position: "relative" }}>
            Final Products
          </div>
          <div id='icon' style={{ position: "relative" }}>
            <div id='inner' style={{ position: "relative" }}></div>
            <img src={FinalProduct} id='efficiency' alt={altText} />
          </div>
          <div id='_10' style={{ position: "relative" }}>
            10
          </div>
          <img src={Arrow} id='arrowdown' alt={altText} />
        </div>
      </div>
    );
  }
}
