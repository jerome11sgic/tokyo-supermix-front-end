import React from "react";
import { Table, Button, Select, Input } from "antd";
import { AntTable } from "../../../styledcomponents/table/AntTabl";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import theme from "../../../../theme";
import { api } from "../../../services/AxiosService";
import { PrimaryButton } from "../../../styledcomponents/button/button";

const { Option } = Select;
class AddTestParameterTable extends React.Component {
  state = {
    selectedRowKeys: [], // Check here to configure the default column
    loading: false,
    equationParametersList: [],
    parameterList: [],
    testsList: [],
    test_name: "",
    test_equation: "",
    selectedRecords: []
  };

  getAllParameters = () => {
    api("GET", "supermix", "/parameters", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        parameterList: res.data.results.parameters
      });
    });
  };

  getAllEquationParameters = () => {
    api("GET", "supermix", "/equation-parameters", "", "", "").then(res => {
      console.log(res.data.results);
      this.setState({
        equationParametersList: res.data.results.equationParameters
      });
    });
  };

  //get all for tests select
  getAllTests() {
    api("GET", "supermix", "/tests", "", "", "").then(res => {
      console.log(res.data.results);
      if (res.data.results.test.length > 0) {
        console.log("got tests");
        let SelectTest = res.data.results.test.map((post, index) => {
          return (
            <Option value={post.id} key={index}>
              {post.name}
            </Option>
          );
        });
        this.setState({
          SelectTest,
          testsList: res.data.results.test
        });
      }
    });
  }

  loadLatestTest() {
    api("GET", "supermix", "/tests", "", "", "").then(res => {
      console.log(res.data.results.test[res.data.results.test.length - 1]);

      //   this.setState({
      //     test_name: res.data.results.test[res.data.results.test.length - 1]
      //   });
    });
  }

  componentDidMount() {
    this.getAllParameters();
    this.getAllTests();
    this.loadLatestTest();
    this.getAllEquationParameters();
  }

  start = () => {
    this.setState({ loading: true });
    // ajax request after empty completing
    setTimeout(() => {
      this.setState({
        selectedRowKeys: [],
        loading: false
      });
    }, 1000);
  };

  onSelectChange = (selectedRowKeys, record) => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
    console.log(record);

    this.state.selectedRecords.push(record);
    console.log(this.state.selectedRecords);
  };

  handleSelect = (name, value) => {
    const {
      testsList,
      equationParametersList,
      selectedRowKeys,
      parameterList
    } = this.state;
    console.log(value);
    this.setState({
      test_name: value
    });
    console.log(testsList.length);
    for (let m = 0; m < testsList.length; m++) {
      if (value === testsList[m].id) {
        console.log("names match " + testsList[m].name);
        console.log(testsList[m].equation.id);
        for (let n = 0; n < equationParametersList.length; n++) {
          console.log(
            equationParametersList[n].equationId +
              " and " +
              testsList[m].equation.id
          );
          if (
            testsList[m].equation.id === equationParametersList[n].equationId
          ) {
            console.log("hit");
            for (let l = 0; l < parameterList.length; l++) {
              console.log(parameterList[l].id);
              if (
                parameterList[l].abbreviation ===
                equationParametersList[n].parameterAbbreviation
              ) {
                console.log("parameters are matching");
              }
            }
            // selectedRowKeys.push(equationParametersList[n].equationId);
            // console.log(selectedRowKeys);
          }
        }
      }
    }
  };

  handleSubmit = record => {
    console.log(record);
  };

  render() {
    // id: 5
    // parameterId: 1
    // parameterName: "length"
    // parameterAbbreviation: "l"
    // equationFormula: "*wl"
    // equationId: 1
    const columns = [
      {
        title: "Parameter Name",
        dataIndex: "name",
        key: "name"
      },
      {
        title: "Abbreviation",
        dataIndex: "abbreviation",
        key: "abbreviation"
      }
    ];
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <FlexContainer
        style={{
          justifyContent: "center",
          background: "white",
          flexDirection: "column",
          marginTop: "20px",
          borderRadius: "15px"
        }}
      >
        <FlexContainer normal style={{ marginTop: 14, width: "550px" }}>
          <Select
            id='test_name'
            name='test_name'
            value={this.state.test_name}
            onChange={value => this.handleSelect("test_name", value)}
            style={{ width: 170 }}
          >
            {this.state.SelectTest}
          </Select>
          {/* {this.state.test_name.length !== 0 ? (
            <Input
              id='test_equation'
              name='test_equation'
              value={this.state.test_equation}
              style={{ width: 120 }}
            />
          ) : (
            ""
          )} */}

          <Button
            type='primary'
            onClick={this.start}
            disabled={!hasSelected}
            loading={loading}
          >
            Reload
          </Button>
          <span style={{ marginLeft: 8 }}>
            {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
          </span>
        </FlexContainer>
        <AntTable
          style={{
            width: "800px",
            marginLeft: "-2px"
          }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={this.state.parameterList}
          pagination={false}
          title={() => (
            <div
              style={{
                background: theme.colors.primary,
                color: "white",
                height: "40px",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                margin: "-15px",
                marginLeft: "0.5px",
                borderTopLeftRadius: "15px",
                borderTopRightRadius: "15px",
                width: "800px"
              }}
            >
              Test Parameter
            </div>
          )}
        />
        <PrimaryButton
          type={"primary"}
          primary
          onClick={this.handleSubmit}
          style={{
            marginTop: "45px",
            marginBottom: "15px",
            width: 100,
            marginLeft: "350px",
            background: theme.colors.primary,
            border: "none"
          }}
        >
          Submit
        </PrimaryButton>
      </FlexContainer>
    );
  }
}

export default AddTestParameterTable;
