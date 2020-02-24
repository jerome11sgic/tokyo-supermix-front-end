import React, { Component } from "react";
import { Table, Switch, Button } from "antd";
import { PrivlegesFormTitle } from "../styledcomponents/form/MasterLevelForms";

const columns = [
  {
    title: "Company Admin Privillages",
    dataIndex: "name",
    width: "25%",
    render: text => <a href=' '>{text}</a>
  },
  {
    title: "QAQC Manager",
    width: "15%",
    render: (e, record) => <Switch defaultChecked={e} size='small' />
  },
  {
    title: "QAQC Technician",
    width: "15%",
    render: (e, record) => <Switch defaultChecked={e} size='small' />
  },
  {
    title: "QAQC Staff",
    width: "15%",
    render: (e, record) => <Switch defaultChecked={e} size='small' />
  },
  {
    title: "QAQC Assistant Manager",
    width: "15%",
    render: (e, record) => <Switch defaultChecked={e} size='small' />
  },
  {
    title: "QAQC Tester",
    width: "15%",
    render: (e, record) => <Switch defaultChecked={e} size='small' />
  }
];
const data = [
  {
    key: "1",
    name: "Add Plant Master"
  },
  {
    key: "2",
    name: "Delete Plant  Master"
  },
  {
    key: "3",
    name: "Edit Plant Master"
  },
  {
    key: "4",
    name: "View Plant Master"
  },
  {
    key: "5",
    name: "Add User Role"
  },
  {
    key: "6",
    name: "Delete User Role"
  },
  {
    key: "7",
    name: "Edit User Role"
  },
  {
    key: "8",
    name: "View User Role"
  },
  {
    key: "9",
    name: "Add Employee Master"
  },
  {
    key: "10",
    name: "Delete Employee Master"
  },
  {
    key: "11",
    name: "Edit Employee Master"
  },
  {
    key: "12",
    name: "View Employee Master"
  },
  {
    key: "13",
    name: "Add Customer Master "
  },
  {
    key: "14",
    name: "Delete Customer Master"
  },
  {
    key: "15",
    name: "Edit Customer Master"
  },
  {
    key: "16",
    name: "View Customer Master"
  },
  {
    key: "17",
    name: "Add Supplier Master "
  },
  {
    key: "18",
    name: "Delete Supplier Master"
  },
  {
    key: "19",
    name: "Edit Supplier Master"
  },
  {
    key: "20",
    name: "View Supplier Master"
  },
  {
    key: "21",
    name: "Add Material Type Master "
  },
  {
    key: "22",
    name: "Delete Material Type Master"
  },
  {
    key: "23",
    name: "Edit Material Type Master"
  },
  {
    key: "24",
    name: "View Material Type Master"
  },
  {
    key: "25",
    name: "Add Main Category"
  },
  {
    key: "26",
    name: "Delete Main Category"
  },
  {
    key: "27",
    name: "Edit Main Category "
  },
  {
    key: "28",
    name: "View Main Category"
  },
  {
    key: "29",
    name: "Add Sub Category"
  },
  {
    key: "30",
    name: "Delete Sub Category"
  },
  {
    key: "31",
    name: "Edit Sub Category"
  },
  {
    key: "32",
    name: "View Sub Category"
  },
  {
    key: "33",
    name: "Add Sample Category"
  },
  {
    key: "34",
    name: "Edit Sample Category"
  },
  {
    key: "35",
    name: " Delete Sample Category"
  },
  {
    key: "36",
    name: "View Sample Category"
  },
  {
    key: "37",
    name: "Add Unit Master"
  },
  {
    key: "38",
    name: "Delete Unit Master"
  },
  {
    key: "39",
    name: "Edit Unit Master"
  },
  {
    key: "40",
    name: "View Unit Master"
  },
  {
    key: "41",
    name: "Add Material Master"
  },
  {
    key: "42",
    name: "Delete Material Master"
  },
  {
    key: "43",
    name: "Edit Material Master "
  },
  {
    key: "44",
    name: "View Material Master"
  },
  {
    key: "45",
    name: "Add Material Nature "
  },
  {
    key: "46",
    name: "Delete Material  Nature"
  },
  {
    key: "47",
    name: "Edit Material Nature"
  },
  {
    key: "48",
    name: "View Material Nature"
  },
  {
    key: "49",
    name: "Add Equipemnt Master "
  },
  {
    key: "50",
    name: "Delete Equipment Master"
  },
  {
    key: "51",
    name: "Edit Equipment Master"
  },
  {
    key: "52",
    name: "View Equipment Master"
  },
  {
    key: "53",
    name: "Add Eqipment Calibration  "
  },
  {
    key: "54",
    name: "Delete Equipment Calibration"
  },
  {
    key: "55",
    name: "Edit Equipment Calibration"
  },
  {
    key: "56",
    name: "View Equipment Calibration"
  },
  {
    key: "57",
    name: "Add Test Level Master"
  },
  {
    key: "58",
    name: "Delete Test Level Master"
  },
  {
    key: "59",
    name: "Edit Test Level Master"
  },
  {
    key: "60",
    name: "View Test Level Master"
  },
  {
    key: "61",
    name: "Add Parameter Master"
  },
  {
    key: "62",
    name: "Delete Parameter Master"
  },
  {
    key: "63",
    name: "Edit Parameter Master"
  },
  {
    key: "64",
    name: "View Parameter Master"
  }
];

export default class CompanyPrivilege extends Component {
  render() {
    const { handleSwitchChange } = this.props;
    // const routes = [
    //   {
    //     path: "index",
    //     breadcrumbName: "Settings"
    //   },
    //   {
    //     path: "first",
    //     breadcrumbName: "Privilege"
    //   },
    //   {
    //     path: "second",
    //     breadcrumbName: "Company Privilege"
    //   }
    // ];
    return (
      <React.Fragment>
        <div
          style={{
            padding: "0 24px 24px 24px",
            background: "#fff",
            minHeight: "500px",
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
          }}
        >
          <PrivlegesFormTitle>Privileges</PrivlegesFormTitle>
          <br />

          <Table
            columns={columns}
            dataSource={data}
            onChange={handleSwitchChange}
            pagination={{ pageSize: 7 }}
            size='small'
          />
          <p align='right'>
            <Button type='primary'>Set Privilages</Button>
          </p>
        </div>
      </React.Fragment>
    );
  }
}
