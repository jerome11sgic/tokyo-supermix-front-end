import styled from "styled-components";
import { Menu } from "antd";

export const TopNavMenu = styled(Menu)`
  line-height: 55px;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: ${props => (props.home ? "flex-start" : "flex-start")};
`;
