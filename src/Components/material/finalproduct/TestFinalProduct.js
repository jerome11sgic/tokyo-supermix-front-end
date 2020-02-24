import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Tabs } from 'antd';
import ProductParameter from './FinalProductParameter';
import FinalProduct from './FinalProduct';
import FinalResultFP from './FinalResultFP';
const { TabPane } = Tabs;

export default class TestFinalProduct extends Component {

    transferrowdata=(data)=>{
this.props.row(data);
    }
    render() {
       
        return (
            <div className="card-container">
            <Tabs type="card" animated={true}>
              <TabPane tab="Test Results" key="1">
              <FinalResultFP rowtransfer={this.transferrowdata}  />
              </TabPane>
              <TabPane tab="MaterialParameter" key="2">
              <ProductParameter/>
              </TabPane>
              <TabPane tab="NewTest" key="3">
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
              </TabPane>
              <TabPane tab="Report" key="4">
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
                <p>Content of Tab Pane 3</p>
              </TabPane>
            </Tabs>
            
          </div>

        )
    }
}
