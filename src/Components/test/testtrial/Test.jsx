import React, { useEffect } from "react";
import FormGenerator from "../../Constant/FormGenerator";

const parameter = [
  {
    id: "1",
    short_name: "l",
    pra_name: "length",
    unit: "m",
    test_id: "1"
  },
  {
    id: "2",
    short_name: "s",
    pra_name: "size",
    unit: "m",
    test_id: "1"
  },

  {
    id: "3",
    short_name: "w",
    pra_name: "weight",
    unit: "kg",
    test_id: "1"
  }
];

const formData = [
  {
    name: "Weigth",
    label: " Weigth"
  },
  {
    name: "Size",
    label: "Size"
  }
];

const form = JSON.stringify(formData);

function setJson(form1, x) {
  console.log(form1.data.form);
  const JsonValue = JSON.parse(x);
  console.log(JsonValue);
  const values = [];

  for (let i = 0; i < JsonValue.length; i++) {
    let st = JsonValue[i].name;
    console.log(st);
    values.push({
      parameter_name: `${JsonValue[i].name}`,
      value: `${form1.data.form[JsonValue[i].name]}`
    });
  }

  console.log(values);
}

export default function Test() {
  const x = () => {
    let para = [];
    for (let i = 0; i < parameter.length; i++) {
      // let st = parameter[i].name;
      // console.log(st);
      para.push({
        name: `${parameter[i].short_name}`,
        label: `${parameter[i].pra_name}`
      });
    }
    console.log(para);
    return JSON.stringify(para);
  };
  useEffect(() => {
    console.log(x());
  });

  return (
    <div style={{ height: "auto" }}>
      <FormGenerator
        form={JSON.parse(x())}
        submitButton={{
          text: "Calculate",
          className: "submit"
        }}
        onSubmit={form => {
          setJson(form, x());
          console.log(form);
        }}
        inputStyle={instyle}
        buttonStyle={btstyle}
        formStyle={fostyle}
        formDriction='column'
      />
    </div>
  );
}

const instyle = {
  width: "150px",
  boxShadow: "1px 2px 8px 1px rgba(0,0,0,0.08)"
};

const btstyle = {
  marginLeft: "550px"
};

const fostyle = {
  marginTop: "10px",
  display: "flex",
  flexDirection: "row",
  width: "660px",
  height: "auto",
  flexWrap: "wrap",
  justifyContent: "space-between",
  position: "relative",
  overflowY: "scroll",
  scrollBehavior: "smooth"
};
