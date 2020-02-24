import React from "react";
import { Input } from "antd";

export const TestResultInput = (fieldname, inputidname, value) => {
  return (
    <div style={{ display: "flex" }}>
      <h3 style={{ width: "170px" }}>{fieldname}</h3>
      <Input
        id={inputidname}
        name={inputidname}
        style={{ width: "150px", marginBottom: "10px" }}
        value={value}
      />
    </div>
  );
};
