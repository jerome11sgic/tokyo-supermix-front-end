import React, { Component } from "react";
import { Input, Modal, Icon, Button, Select, Row, Col } from "antd";
import { MasterLevelForm } from "../../../styledcomponents/form/MasterLevelForms";

import { PrimaryButton } from "../../../styledcomponents/button/button";

const { Option } = Select;
export default class AdditionalParameter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [{ id: "", parameter: "", unit: "", entry: "" }],
      val: "",
      loading: false,
      visible: false
    };
  }

  addClick() {
    this.setState(prevState => ({
      test: [...prevState.test, { id: "", parameter: "", unit: "", entry: "" }]
    }));
  }

  handleChange(i, e) {
    console.log("kkkkkkk");
    const { name, value } = e.target;
    let test = [...this.state.test];
    test[i] = { ...test[i], [name]: value };
    this.setState({ test });
  }

  removeClick(i) {
    let test = [...this.state.test];
    test.splice(i, 1);
    this.setState({ test });
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  componentDidMount() {
    console.log(this.props.screen);
  }

  createUI() {
    return this.state.test.map((el, i) => (
      <div key={i}>
        <Row>
          <Input
            placeholder='ID'
            name='parameter'
            value={el.parameter || ""}
            onChange={this.handleChange.bind(this, i)}
            style={{ width: "100px" }}
          />

          <Input
            placeholder='Parameter'
            name='parameter'
            value={el.parameter || ""}
            onChange={this.handleChange.bind(this, i)}
            style={{ width: "100px", marginLeft: "10PX" }}
          />

          <Select
            style={{ width: "140px", marginLeft: "10px" }}
            placeholder='Select the Unit'
          >
            <Option value='g'> g </Option>
            <Option value='Kg'>kg </Option>
          </Select>

          <Select
            style={{ width: "140px", marginLeft: "10px" }}
            placeholder='Short Format'
          >
            <Option value='g'> A </Option>
            <Option value='Kg'>B </Option>
          </Select>

          <Select
            style={{ width: "190px", marginLeft: "10px" }}
            placeholder='Equation Configuration'
          >
            <Option value='g'> Eq_Con_001 </Option>
          </Select>

          <Button
            type=''
            value='remove'
            onClick={this.removeClick.bind(this, i)}
            style={{ width: "75px", marginLeft: "40px" }}
          >
            Remove
          </Button>
        </Row>
        <br />
      </div>
    ));
  }
  render() {
    const { visible, loading } = this.state;
    return (
      <div>
        <PrimaryButton
          onClick={this.showModal}
          style={{
            background: "#001328",
            color: "white",
            border: "none",
            width: "auto",
            marginLeft: "-10px"
          }}
        >
          Add Additional Parameter
        </PrimaryButton>
        <Modal
          width='900px'
          visible={visible}
          closable={false}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key='back' onClick={this.handleCancel}>
              Return
            </Button>,
            <PrimaryButton
              key='submit'
              loading={loading}
              onClick={this.handleOk}
              style={{ background: "#001328", color: "white", border: "none" }}
            >
              Submit
            </PrimaryButton>
          ]}
          // title={<MasterLevelFormTitle>Add AdditionalParameter</MasterLevelFormTitle>}
        >
          <MasterLevelForm>
            <div
              className='AdditionalAddFormHeadingContainer'
              style={{
                width: "903px",
                marginLeft: "-25px",
                marginTop: "-40px"
              }}
            >
              <p
                style={{
                  marginTop: "10px",
                  marginLeft: "15px",
                  color: "white"
                }}
              >
                Add Additional Parameter
              </p>
            </div>
            <Icon
              type='close-circle'
              onClick={this.handleCancel}
              style={{
                marginLeft: "270px",
                color: "white",
                marginTop: "-30px"
              }}
            />

            {this.createUI()}

            <Row>
              <Col span={3}>
                <Button
                  type=''
                  value='add more'
                  onClick={this.addClick.bind(this)}
                >
                  Add more
                </Button>
              </Col>
            </Row>
          </MasterLevelForm>
        </Modal>
      </div>
    );
  }
}
