import React, { Component } from 'react';
import { Icon } from "antd";
import BasicCard from "../../../styledcomponents/card/BasicCard";
import "./styleProcess.css";


export default class ProcessTileArea extends Component {
    render() {
        return (
            <div className="process_tiles_area">
            <BasicCard
              finalproduct
              size="small"
              className="process_basic_card"
              hoverable={true}
            //   onClick={this.statusChange1}
            >
              <div className="text_area"> Add Sample</div>
              <div className="action_area">
                <Icon
                  filled
                  type="plus"
                  style={{ color: "red", fontSize: "22px" }}
                />
              </div>
            </BasicCard>
            <BasicCard
              finalproduct
              size="small"
              className="process_basic_card"
              hoverable={true}
            //   onClick={this.statusChange2}
            >
              <div className="text_area"> Import From Excel</div>
              <div className="action_area">
                <Icon
                  filled
                  type="plus"
                  style={{ color: "red", fontSize: "22px" }}
                />
              </div>
            </BasicCard>
           
          </div>
        )
    }
}
