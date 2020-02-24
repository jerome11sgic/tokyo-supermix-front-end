import React, { Component } from "react";
import { Tabs } from "antd";
import QualityParameter from "./QualityParameter";

import TestTrialResult from "./TestTrialResult";
import TestResults from "./TestResults";
const { TabPane } = Tabs;

export default class MaterialTest extends Component {
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <Tabs
        defaultActiveKey='2'
        onChange={this.callback}
        tabBarStyle={{
          background: "#001328",
          borderRadius: "10px",
          color: "white",
          position: "sticky"
        }}
        //  tabPosition="right"
      >
        <TabPane tab='Quality Parameter' key='1'>
          <QualityParameter samId={this.props.match.params.sampleId} />
        </TabPane>
        <TabPane tab='Trial Results' key='2'>
          <TestTrialResult />
        </TabPane>
        <TabPane tab='Final Test Result' key='3'>
          <TestResults />
        </TabPane>
      </Tabs>
    );
  }
}
