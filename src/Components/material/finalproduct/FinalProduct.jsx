import React, { Component } from "react";
import SplitPane, { Pane } from "react-split-pane";
import { Card, Icon, Row, Col, Divider } from "antd";
import AddSample from "./FinishProductSamples";
import TestFinal from "./TestFinalProduct";
import BasicCard from "../../styledcomponents/card/BasicCard";
import { Linechart } from "./LineData";
import { Wrapper } from "./Wrapper";
import Paragraph from "antd/lib/typography/Paragraph";
import { PrimaryButton } from "../../styledcomponents/button/button";
// import ProductParameter from "./FinalProductParameter";
// import FinalProductParameter from "./FinalProductParameter";

const data1 = {
  labels: ["7", "14", "30", "60", "90", "120"],
  datasets: [
    {
      label: "Strength",
      data: [28, 48, 40, 19, 86, 27, 90],
      fill: false,
      backgroundColor: "#66BB6A",
      borderColor: "#66BB6A"
    }
  ]
};

const data2 = {
  labels: ["7", "14", "30", "60", "90", "120"],
  datasets: [
    {
      label: "Strength",
      data: [15, 22, 36, 44, 29, 52, 66],
      fill: false,
      backgroundColor: "#66BB6A",
      borderColor: "#66BB6A"
    }
  ]
};
const data3 = {
  labels: ["7", "14", "30", "60", "90", "120"],
  datasets: [
    {
      label: "Strength",
      data: [30, 41, 24, 54, 19, 38, 44],
      fill: false,
      backgroundColor: "#66BB6A",
      borderColor: "#66BB6A"
    }
  ]
};
export default class FinalProduct extends Component {
  constructor() {
    super();
    this.toggleBtmHeight = this.toggleBtmHeight.bind(this);
  }
  state = {
    rowdata: ""
  };

  rowdataforchart = data => {
    console.log(data);
    if (data === 1) {
      this.setState({ rowdata: data1 });
    } else if (data === 2) {
      this.setState({ rowdata: data2 });
    } else if (data === 3) {
      this.setState({ rowdata: data3 });
    }
  };
  componentWillMount() {
    this.setState({
      btmHeight: ""
    });
  }
  toggleBtmHeight(newSize) {
    this.setState({ btmHeight: newSize + "px" });
  }
  render() {
    return (
      <Wrapper>
        <SplitPane
          split="vertical"
          defaultSize="172px"
          style={{ height: "500px" }}
        >
          <div
            style={{
              minHeight: "500px",
              width: "auto",
              boxShadow:
                "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
              transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
              marginLeft: "1em"
            }}
          >
            <PrimaryButton
              primary
              icon="plus"
              type="primary"
              style={{
                background: "#001328",
                color: "white",
                border: "none",
                width: "150px"
              }}
            >
              Create Sample
            </PrimaryButton>
            <BasicCard
              finalproduct
              size="small"
              style={{
                background: "#001328",
                height: "50px",
                paddingRight: "50px",
                fontSize: "12px",
                color: "#ffff",
                width: "150px",
                padding: "6px"
              }}
              hoverable={true}
            >
              <Row>
                <Col span={21}>
                  <p>
                    concrete sample1
                    <br />
                    <Icon type="calendar" />
                    &nbsp; 2019/12/15 &nbsp;
                  </p>
                </Col>
                <Col span={1}>
                  <Icon type="delete" style={{ color: "red" }} />
                  <br />

                  <Icon type="edit" theme="filled" style={{ color: "green" }} />
                </Col>
              </Row>
            </BasicCard>
            <BasicCard
              finalproduct
              size="small"
              style={{
                background: "#001328",
                height: "50px",
                paddingRight: "50px",
                fontSize: "12px",
                color: "#ffff",
                width: "150px",
                padding: "6px"
              }}
              hoverable={true}
            >
              <Row>
                <Col span={21}>
                  <p>
                    concrete sample2
                    <br />
                    <Icon type="calendar" />
                    &nbsp; 2019/12/15 &nbsp;
                  </p>
                </Col>
                <Col span={1}>
                  <Icon type="delete" style={{ color: "red" }} />
                  <br />

                  <Icon type="edit" theme="filled" style={{ color: "green" }} />
                </Col>
              </Row>
            </BasicCard>
            <BasicCard
              finalproduct
              size="small"
              style={{
                background: "#001328",
                height: "50px",
                paddingRight: "50px",
                fontSize: "12px",
                color: "#ffff",
                width: "150px",
                padding: "6px"
              }}
              hoverable={true}
            >
              <Row>
                <Col span={21}>
                  <p>
                    concrete sample3
                    <br />
                    <Icon type="calendar" />
                    &nbsp; 2019/12/15 &nbsp;
                  </p>
                </Col>
                <Col span={1}>
                  <Icon type="delete" style={{ color: "red" }} />
                  <br />

                  <Icon type="edit" theme="filled" style={{ color: "green" }} />
                </Col>
              </Row>
            </BasicCard>
          </div>

          <SplitPane
            split="vertical"
            defaultSize={620}
            primary="second"
            resizerStyle={false}
          >
            <div
              style={{
                background: "#eef6fc",
                minHeight: "100px",
                width: "auto",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
              }}
            >
              <Row>
                <AddSample />
                {Linechart(this.state.rowdata)}
              </Row>
            </div>
            <div
              style={{
                background: "#eef6fc",
                minHeight: "200px",
                width: "620px",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
              }}
            >
              <TestFinal row={this.rowdataforchart} />
            </div>
          </SplitPane>
        </SplitPane>
      </Wrapper>
    );
  }
}
