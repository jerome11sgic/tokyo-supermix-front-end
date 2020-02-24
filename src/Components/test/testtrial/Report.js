import React from "react";
import Handlebars from "handlebars";
import Logo from "../../../assets/new1.png";
import { Divider, Row, Col } from "antd";
import SampleTable from "../../Constant/TableGenerator";

const body = [
  { id: 1, name: "Wasif", age: 21, email: "wasif@email.com" },
  { id: 2, name: "Ali", age: 19, email: "ali@email.com" },
  { id: 3, name: "Saad", age: 16, email: "saad@email.com" },
  { id: 4, name: "Asad", age: 25, email: "asad@email.com" }
];

const hbr = `
<table border="1" width=100%>
    {{#  parameter}}
    <tr>
    <td width=30% style="height:80px">
       {{paraname}}
       </td>
       {{# each value}}
       {{#each this}}
       <td>
       {{ this }}
       </td>
       {{/each}}
       {{/each}}

       </tr>
    {{/parameter}}
    </table>
`;

const hbr1 = `
<table border="1" width=100%>
</table>

`;

const template = Handlebars.compile(hbr);

const sampledetails = Handlebars.compile(hbr1);

export function Report() {
  const data = {
    name:
      "DETERMINATION OF CLAY, SILT AND DUST IN FINE AGGREGATE - MANUFACTURED SAND (0-5 mm)",
    hometown: "Somewhere, TX",
    parameter: [
      { paraname: "Weight", value: [[1], [4], [9], [9]] },
      { paraname: "Size", value: [[5], [8], [12], [9]] },
      { paraname: "Size", value: [[5], [8], [12], [9]] },
      { paraname: "Size", value: [[5], [8], [12], [9]] }
    ]
  };

  const sampledata = {
    type: "incomming"
  };

  return (
    <div
      style={{
        border: "thin solid black",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        background: "#DAF6F8",
        padding: "2rem",
        margin: "4rem",
        justifyContent: "space-around",
        width: "720px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          border: "thin solid black",
          padding: "1rem",
          justifyContent: "space-between",
          height: "150px",
          width: "650px"
        }}
      >
        <div
          style={{
            marginRight: "-20px"
          }}
        >
          <img
            src={Logo}
            style={{
              height: "120px",
              width: "130px"
            }}
          />
        </div>
        <div style={{ marginRight: "10px" }}>
          <h4 style={{ fontWeight: "bold" }}>
            TOKYO SUPERMIX Ready Mixed Concrete Plant.
          </h4>

          <h5>77B, New Nuge Road, Pliyagoda</h5>

          <h5 style={{}}>Tel. 0112-945865, Fax. 0112-945866</h5>

          <div
            style={{
              background: "#cbcaa5",
              width: "420px",
              height: "50px",

              color: "black",
              fontWeight: "bold"
            }}
          >
            {data.name}
          </div>
        </div>
      </div>
      <br />
      <SampleTable
        sambodydata={body}
        // sampleheaderdata={header}
      />
      <div
        dangerouslySetInnerHTML={{ __html: template(data) }}
        style={{
          background: "white",
          width: "650px"
        }}
      />
    </div>
  );
}
