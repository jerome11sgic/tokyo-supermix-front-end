import styled, { css } from "styled-components";
import { Table } from "antd";
export const AntTable = styled(Table)`
  background: white;
  border: none;
  border-radius: 15px;
  margin-left: ${props => (props.nomargin ? "0px" : "15px")};
  margin-top: 20px;
  width: ${props =>
    props.length
      ? "1000px"
      : props.lowLength2
      ? "420px"
      : props.medium
      ? "600px"
      : props.length2
      ? "850px"
      : props.maxlength
      ? "1100px"
      : "800px"};
  box-shadow: 8px 5px 15px 5px rgba(0, 0, 0, 0.19);
  height: ${props => (props.lowHeight ? "220px" : "auto")};

  @media (min-width: 1920px) {
    width: ${props =>
      props.length ? "1200px" : props.lowLength2 ? "650px" : "800px"};
  }

  ${props =>
    props.emptyTableTestTrial &&
    css`
      background: none;
      border: none;
      outline: none;
      box-shadow: 0.5px 0.5px 0.5px 1px rgba(0, 0, 0, 0.05);
      height: 150px;
    `}
`;
