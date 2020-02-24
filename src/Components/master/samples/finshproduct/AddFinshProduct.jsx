import React, { Component } from 'react';
import { Form, Input, Select, DatePicker } from "antd";
import { PrimaryButton } from "../../../styledcomponents/button/button";
import TextArea from "antd/lib/input/TextArea";
import "./styleFinsh.css";

export default class AddFinshProduct extends Component {
    render() {
        return (
            <div className="addfinshFormWrapper">
            <Form className="addfinshForm" title="Add Equipment Parameter">
              <div className="addfinshFormHeadingContainer">
                <p
                  style={{ marginTop: "10px", marginLeft: "15px", color: "white" }}
                >
                  Add FinshProduct Sample
                </p>
                {/* <Divider style={{marginTop:'-5px'}}/> */}
              </div>
              <div className="addfinshFormInnerWrapper">
                {/* Code */}
                <div className="input_wrapper">
                  <label for="code" className="label">
                  Code
                  </label>
                  <Input id="code" name="code" placeholder="Code" />
                </div>
    
                {/* Plant Name */}
                <div className="input_wrapper">
                  <label for="Customer_name" className="label">
                   Customer Name
                  </label>
                  <Select  
                    className="inputfinshfield" 
                    id="Customer_name" 
                    name="Customer_name" 
                    placeholder="Customer_name "
                    style={{ width: "195px" }}
                   />
                </div>
    
                {/* Place */}
                <div className="input_wrapper">
                  <label for=" Finsh_Product_Code" className="label">
                Finsh Product Code
                  </label>
                  <Select id="Finsh_Product_Code" name="Finsh_Product_Code" placeholder=" Raw Material"  style={{ width: "195px" }} />

                </div>
    
                {/* T.P No */}
                <div className="input_wrapper">
                  <label for=" delivered_date" className="label">
                  Delivered Date
                  </label>
                  <DatePicker 
                //   onChange={onChange} 
                  />
                </div>
    
                {/* Description  */}
                <div className="input_wrapper">
                  <label for="grade" className="label">
                 Grade
                  </label>
                  <Input id="grade" name="grade" placeholder="Grade" />
                </div>
                <div className="input_wrapper">
                  <label for="plant" className="label">
                 Plant
                  </label>
                  <Input id="plant" name="plant" placeholder="plant" />
                </div>
                <div className="input_wrapper" >
                  <label for="sample_size" className="label">
                 Sample Size
                  </label>
                  <Input id="sample_size" name="sample_size" placeholder="sample_size" />
                </div>

                <div className="input_wrapper" style={{marginRight:"220px"}}>
                  <label for="description" className="label">
                  Description
                  </label>
                  <TextArea id="description" name="description" placeholder="Description"  style={{ width: "410px" }} />
                </div>
               
        
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    alignContent: "right",
                     marginLeft: "900px",
                     marginTop:"-80px"
                    
                  }}
                >
                  <PrimaryButton
                    type=""
                    style={{
                      marginTop: "30px",
                      marginRight: "20px",
                      background: "#001328",
                      color: "white"
                    }}
                  >
                    Submit
                  </PrimaryButton>
                  <PrimaryButton style={{ marginTop: "30px" }}>Clear</PrimaryButton>
                </div>
              </div>
            </Form>
          </div>
        )
    }
}
