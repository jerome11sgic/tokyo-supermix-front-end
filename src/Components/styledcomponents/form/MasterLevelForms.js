import styled, { css } from "styled-components";
import { Form } from "antd";
import theme from "../../../theme";

export const MasterLevelForm = styled(Form)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${props =>
    props.unalignedform ? "flex-start" : "space-evenly"};
  height: auto;
  width: auto;
  background: ${props => (props.filled ? "white" : "")};

  ${props =>
    props.testconfiguration &&
    css`
      border-radius: 15px;
      padding: 20px;
      flex-direction: row;
      justify-content: space-around;
      height: 300px;
      width: 250px;
     
      }
    `}
`;

export const MasterLevelFormTitle = styled.div`
  padding: 15px;
  margin: ${props => (props.nomargin ? "0px" : "-25px")};
  width: auto;
  height: 50px;
  background: #001328;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: -10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  color: white;
`;

export const AuditFormTitle = styled.div`
  padding: 15px;
  margin: ${props => (props.nomargin ? "0px" : "-7px 0px 1px")};
  width: auto;
  height: 50px;
  background: ${theme.colors.primary};
  /* border-top-right-radius: 10px; */
  /* border-top-left-radius: 10px; */
  border-bottom-right-radius: -10px;
  border-bottom-left-radius: -10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  color: white;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const PrivlegesFormTitle = styled.div`
  padding: 10px;
  margin: ${props => (props.nomargin ? "0px" : "-7px -25px 1px")};
  width: auto;
  height: 50px;
  background: ${theme.colors.primary};
  /* border-top-right-radius: 10px; */
  /* border-top-left-radius: 10px; */
  border-bottom-right-radius: -10px;
  border-bottom-left-radius: -10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  color: white;
  font-size: 18px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;
