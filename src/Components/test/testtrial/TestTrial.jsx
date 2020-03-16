/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import { AntTable } from "../../styledcomponents/table/AntTabl";
import history from "../../../Components/Constant/history";
import { Divider, Button, Icon, Popconfirm, Tag } from "antd";
import { PrimaryButton } from "../../styledcomponents/button/button";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import { api } from "../../services/AxiosService";

// function testConfig(record, e) {
//   history.push(`/matrialtest/${record.code}`);

//   console.log(record);
//   console.log(e);
// }

// export default class MaterialsType extends Component{
//   render(){
//   return (
//     <FlexContainer
//       normal
//       style={{ width: "50%", marginLeft: "20px", marginBottom: "-10px" }}
//     >
//       {data.map((post, index) => {
//         return (
//           <PrimaryButton
//             type='primary'
//             style={{ background: "#001328", color: "white", border: "none" }}
//             key={index}
//           >
//             {post.typeName}
//           </PrimaryButton>
//         );
//       })}
//     </FlexContainer>
//   );
// }
// }
export default class ManageTest extends Component {
  state = {
    sampleData: ""
  };
  componentDidMount() {
    console.log(this.props.testId);
    this.getAll();
  }
  testConfig = record => {
    history.push(`/matrialtest/${this.props.testId}/${record.code}`);

    console.log(record);
  };

  getAll = () => {
    const datalist = [];
    api("GET", "supermix", "/incoming-samples", "", "", "").then(res => {
      console.log(res.data);
      res.data.results.incomingSamples.map((post, index) => {
        datalist.push({
          code: post.code,
          vehicleNo: post.vehicleNo,
          date: post.date,
          status: post.status,
          rawMaterialName: post.rawMaterial.name,
          nature: post.rawMaterial.nature,
          materialSubCategoryName: post.rawMaterial.materialSubCategory.name,
          plantName: post.plant.name,
          supplierName: post.supplier.name
        });
      });
      this.setState({
        sampleData: datalist
      });
    });
  };
  render() {
    const columns = [
      {
        title: "Sample Code",
        dataIndex: "code",
        key: "code",
        width: "10%"
      },
      {
        title: "Name",
        dataIndex: "rawMaterialName",
        key: "rawMaterialName",
        width: "10%"
      },
      {
        title: "vehicleNo",
        dataIndex: "vehicleNo",
        key: "vehicleNo",
        width: "10%"
      },
      {
        title: "Date",
        dataIndex: "date",
        key: "date",
        width: "10%"
      },
      {
        title: "plant",
        dataIndex: "plantName",
        key: "plantName",
        width: "12%"
      },
      {
        title: "supplier",
        dataIndex: "supplierName",
        key: "supplieName",
        width: "12%"
      },
      {
        title: "Status",
        dataIndex: "status",
        key: "status",
        width: "10%",
        render: status => (
          <span>
            {
              <Tag
                color={
                  status == "NEW"
                    ? "green"
                    : status == "PROCESS"
                    ? "orange"
                    : "red"
                }
              >
                {status}
              </Tag>
            }
          </span>
        )
      },
      {
        title: "Test",
        key: "test",
        width: "15%",
        render: (record = this.state.sampleData) => (
          <Button onClick={this.testConfig.bind(this, record)}>test</Button>
        )
      }

      // {
      //   title: "Edit & Delete",
      //   key: "action",
      //   width: "7%",
      //   render: (text, record) => (
      //     <span>
      //       <a>
      //         <Icon type="edit" />
      //       </a>
      //       <Divider type="vertical" />
      //       <a>
      //         <Popconfirm
      //           title="Are you sure you want to Delete this?"
      //           icon={
      //             <Icon type="question-circle-o" style={{ color: "red" }} />
      //           }
      //         >
      //           <a href="#">
      //             <Icon type="delete"></Icon>
      //           </a>
      //         </Popconfirm>
      //       </a>
      //     </span>
      //   )
      // }
    ];
    return (
      <AntTable
        title={() => (
          <div style={{ height: "20px" }}>
            {/* <p style={styleObj}>{title}</p> */}
          </div>
        )}
        columns={columns}
        dataSource={this.state.sampleData}
        style={{ background: "white", width: "1300px", marginTop: "-10px" }}
        size="small"
        onRow={(record, rowIndex) => {
          return {
            // onClick: event => {testConfig(record)}, // click row
            onDoubleClick: event => {
              this.testConfig(record);
            } // double click row
            // onContextMenu: event => {}, // right button click row
            // onMouseEnter: event => {}, // mouse enter row
            // onMouseLeave: event => {}, // mouse leave row
          };
        }}
      />
    );
  }
}
const styleObj = {
  fontSize: 20,
  color: "black",
  fontFamily: "Arial",
  paddingTop: "-30px"
};

const styleDiv = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: " spacebetween"
};
