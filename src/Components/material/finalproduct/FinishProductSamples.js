import React from 'react';
import { Form, Icon, Input, Button, DatePicker, Modal, message, Menu, Row, Col, Select } from 'antd';
import TextArea from 'antd/lib/input/TextArea';


const { Option } = Select;

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}



function handleChange(value) {
  console.log(`selected ${value}`);
}

export default class FinishProductSamples extends React.Component {

  state = {
    tabPosition: 'Suppliers',
    tabPosition1: 'River Sand',
    loading: false,
    visible: false
  };

 
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };


  changeTabPosition = tabPosition => {
    this.setState({ tabPosition });
  };


  render() {
    const { visible, loading } = this.state;
    const menu = (
      <Menu >
        <Menu.Item key="1">
          <Icon type="user" />
          yes
          </Menu.Item>
        <Menu.Item key="2">
          <Icon type="user" />
          NO
          </Menu.Item>

      </Menu>
    );

    return (
    



      
        <div
        style={{
        
        background: '#d6dbd9',
        minHeight: '200px',
        width:'566px',
       
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
    }}>

            <Form layout="inline" labelAlign='left' labelCol={2} onSubmit={this.handleSubmit} >
              <Row>
                <Col span={8} >

                  {/* <Form.Item labelAlign={"right"} label=" Sample Code: "> */}

<label style={{marginRight:'60px'}}>Sample Code:</label>
                    <Input
                      placeholder=" Sample Code"
                      style={{ width: '150px' }}
                    />
                  {/* </Form.Item> */}


                </Col>
                <Col span={8} >

                  {/* <Form.Item label="Customer Name"> */}

                  <label style={{marginRight:'50px'}}>Customer Name:</label>
                    <Select
                      style={{ width: '150px' }}
                      placeholder="Customer Name"
                    >
                      <Option value="top">Mr.Perera</Option>
                      <Option value="bottom">Mr.Nuwan</Option>
                      <Option value="left">Mr.Lakmal</Option>
                      <Option value="right">Mr.Sunil</Option>
                    </Select>

                  {/* </Form.Item> */}

                </Col>

                <Col span={8} >

                  {/* <Form.Item label="Delivered Date: "> */}
                  <label style={{marginRight:'60px'}}>Delivered Date:</label>
                    <DatePicker onChange={onChange} style={{ width: '150px' }} />
                  {/* </Form.Item> */}

                </Col>
              </Row>

              <Row>

                <Col span={8} >

                  {/* <Form.Item label="Finish Product Code "> */}

                  <label style={{marginRight:'20px'}}>Finish Product Code:</label>
                    <Select
                      style={{ width: '150px' }}
                      placeholder="Finish Product Code"
                    >
                      <Option value="top">PR/C25/001</Option>
                      <Option value="bottom">PR/C30/001</Option>
                      <Option value="left">PR/C35/001</Option>
                      <Option value="right">PR/C40/001</Option>
                    </Select>

                  {/* </Form.Item> */}
                </Col>


                <  Col span={8} >
                  {/* <Form.Item label="Grade :"> */}
                  <label style={{marginRight:'100px'}}>Grade :</label>
                    <Select
                      style={{ width: 150 }}
                      placeholder="Select Grade"

                    >
                      <Option value="cement">Grade 20</Option>
                      <Option value="admixture"> Grade 25</Option>
                      <Option value="fineaggregate ">Grade 30</Option>
                      <Option value="coarseaggregate">Grade 35</Option>
                      <Option value="concrete">Grade 40</Option>


                    </Select>
                  {/* </Form.Item> */}
                </Col>

                <  Col span={8} >
                  {/* <Form.Item label="Plant :"> */}
                  <label style={{marginRight:'100px'}}>Plant:</label>
                    <Select
                      style={{ width: 150 }}
                      placeholder="Select Plant"

                    >
                      <Option value="cement">Peliyagoda</Option>
                      <Option value="admixture">Jaffna</Option>
                      <Option value="fineaggregate ">Ratmalana</Option>
                      <Option value="coarseaggregate">Kandy</Option>
                    
                    </Select>
                  {/* </Form.Item> */}

                </Col>
              </Row>


              <Row>

                <Col span={12} >
                  {/* <Form.Item label=" Sample Size: "> */}
                  <label style={{marginRight:'150px'}}>Sample Size:</label>
                  <TextArea
                      placeholder=" Sample Size"
                      style={{ width: '240px' }}
                    />
                  {/* </Form.Item> */}
                </Col>

                <Col span={12} >

                  {/* <Form.Item label=" Description: "> */}
                  <label style={{marginRight:'150px'}}>Description:</label>
                    <TextArea
                      placeholder=" Description"
                      style={{ width: '240px' }}
                    />
                  {/* </Form.Item> */}
                </Col>

            

              </Row>

            </Form>
          </div>
       
      

    );
  }
}