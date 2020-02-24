import React, { Component } from "react";
import { PickList } from "primereact/picklist";
import { CarService } from "./CarService";
import "primereact/resources/themes/nova-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Data from "./Data.json";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import "./pickListStyle.css";

export class PickListDemo extends Component {
  constructor() {
    super();
    this.state = {
      source: [],
      target: []
    };
    this.carservice = new CarService();
    this.carTemplate = this.carTemplate.bind(this);
    this.onChange = this.onChange.bind(this);
    console.log(this.carservice.getCarsSmall());
  }

  componentDidMount() {
    console.log(Data);
    this.setState({
      source: Data
    });
  }

  onChange(event) {
    this.setState({
      source: event.source,
      target: event.target
    });
  }

  carTemplate(car) {
    return (
      <FlexContainer style={{ justifyContent: "space-around" }}>
        <div style={{ textAlign: "justify", width: "-40px" }}>{car.id}</div>
        <div style={{ textAlign: "justify", width: "60px" }}>{car.name}</div>
      </FlexContainer>
    );
  }

  render() {
    console.log(this.state.source);
    return (
      <FlexContainer style={{ justifyContent: "center", marginTop: "20px" }}>
        <div className='content-section implementation'>
          <PickList
            source={this.state.source}
            target={this.state.target}
            itemTemplate={this.carTemplate}
            sourceHeader={
              <table>
                <thead>
                  <th>id</th>
                  <th>name</th>
                </thead>
              </table>
            }
            targetHeader={
              <table>
                <thead>
                  <th>id</th>
                  <th>name</th>
                </thead>
              </table>
            }
            responsive={true}
            sourceStyle={{
              height: "300px",
              width: "250px"
            }}
            targetStyle={{ height: "300px", width: "250px" }}
            showSourceControls={false}
            showTargetControls={false}
            onChange={this.onChange}
          ></PickList>
        </div>
      </FlexContainer>
    );
  }
}
