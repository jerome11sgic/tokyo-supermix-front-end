import React from "react";
import { Layout } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import { Route, Switch } from "react-router-dom";
import Image from "../../../assets/background.jpg";
import HeaderComponent from "../../Constant/Header";

import HomeScreen from "../../homescreen/HomeScreen";
import PlantMaster from "../../master/plantlevel/PlantMaster";

import MaterialMaster from "../../master/materiallevel/MaterialMaster";

import CategoryMaster from "../../master/categorylevel/CategoryMaster";

import SiteMaster from "../../master/sitelevel/SiteMaster";
import Test from ".././../test/testtrial/TestMaster";

import EquipmentMaster from "../../master/equipmentlevel/EquipmentMaster";
import TestLevelMaster from "../../master/testlevel/TestLevelMaster";
import ParameterMaster from "../../master/ParameterLevel/ParameterMaster";
import UnitMaster from "../../master/unitlevel/UnitMaster";
import TestConfigurationMaster from "../../test/testconfiguration/TestConfigurationMaster";

import MixDesignMaster from "../../master/mixdesign/MixDesignMaster";
import SampleMaster from "../../sample/SampleMaster";
import TestTrialMaster, {
  TestPage
} from "../../test/testtrial/TestTrialMaster";
import MaterialTest from "../../test/testtrial/MaterialTest";

import Profile from "../../profile/Profile";
import CompanyPrivilege from "../../priviledges/Privileges";
import FPViewStatus from "../../sample/finshproduct/FPViewStatus/FPViewStatus";
import TestResultsMaster from "../../test/testresults/TestResultsMaster";
import GraphDashboard from "../../graphdashboard/GraphDashboard";
import AuditLog from "../../AuditLog/AuditLog";
import ProcessViewStatus from "../../sample/process/processviewstatus/ProcessViewStatus";
import IncomingViewStatus from "../../sample/incoming/IncomingViewStatus/IncomingViewStatus";

// import AddMixDesign from "../../ConfigurationLevel/MixDesign/AddMixDesign";
// import MixDesign from "../../ConfigurationLevel/MixDesign/AddMixDesign";

const { Content, Footer } = Layout;

class RouterContent extends React.Component {
  render() {
    return (
      <Layout
        style={{
          minHeight: "100vh"
        }}
      >
        <Layout
          style={{
            background: `url(${Image})`
          }}
        >
          <Route path='/'>
            <HeaderComponent />
          </Route>

          <Content
            style={{
              margin: "24px 16px 0"
            }}
          >
            <Switch>
              <Route exact path='/'>
                <HomeScreen />
              </Route>

              <Route exact path='/dashboard'>
                <GraphDashboard />
              </Route>

              {/* Plant Level */}
              <Route exact path='/master/plantlevel'>
                <PlantMaster />
              </Route>

              {/* Category Level */}
              <Route exact path='/master/categorylevel'>
                <CategoryMaster />
              </Route>

              {/* <Route exact path="/finalproduct">
                <FinalProduct />
              </Route> */}
              {/* <Route exact path="/rawmaterial">
                <RawMaterialHome />
              </Route> */}
              <Route exact path='/master/materiallevel'>
                <MaterialMaster />
              </Route>
              {/* <Route  exact path="/MixDesign">
              <MixDesign/>
             </Route> */}

              <Route exact path='/master/sitelevel'>
                <SiteMaster />
              </Route>

              <Route exact path='/master/equipmentlevel'>
                <EquipmentMaster />
              </Route>

              <Route exact path='/master/testlevel'>
                <TestLevelMaster />
              </Route>

              <Route exact path='/master/unitlevel'>
                <UnitMaster />
              </Route>

              <Route exact path='/master/parameterlevel'>
                <ParameterMaster />
              </Route>

              <Route exact path='/master/mixdesignlevel'>
                <MixDesignMaster />
              </Route>

              {/* Test Configuration */}
              <Route exact path='/testconfiguration'>
                <TestConfigurationMaster />
              </Route>

              {/* Samples */}
              <Route exact path='/samples'>
                <SampleMaster />
              </Route>
              <Route exact path='/samples/incoming'>
                <SampleMaster />
              </Route>

              <Route exact path='/samples/viewincomingstatus'>
                <IncomingViewStatus />
              </Route>

              <Route exact path='/samples/viewprocessstatus'>
                <ProcessViewStatus />
              </Route>

              <Route exact path='/samples/viewfpstatus'>
                <FPViewStatus />
              </Route>

              {/* Test Trial */}
              <Route exact path='/test/testtrial'>
                <TestTrialMaster />
              </Route>

              <Route exact path='/test/:testId' component={TestPage} />

              <Route
                exact
                path='/matrialtest/:sampleId'
                component={MaterialTest}
              />

              {/* Test Reports and Results */}
              <Route exact path='/testreport'>
                <TestResultsMaster />
              </Route>

              {/* Profile */}
              <Route exact path='/profile'>
                <Profile />
              </Route>

              {/* Priviledges */}
              <Route exact path='/priviledges'>
                <CompanyPrivilege />
              </Route>
              <Route exact path='/testinput'>
                <Test />
              </Route>

              <Route exact path='/priviledges/auditlog'>
                <AuditLog />
              </Route>
            </Switch>
          </Content>
          <br />

          <Footer
            style={{
              textAlign: "center",
              backgroundColor: "#001422",
              lineHeight: "0rem",
              height: "5px",
              marginTop: "-15px"
            }}
          >
            <Paragraph
              style={{
                color: "white",
                fontFamily: "sans-serif",
                fontWeight: "520"
              }}
            >
              Quality Data Management System @ 2020 Created By Tokyo Cement
              Group
            </Paragraph>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default RouterContent;
