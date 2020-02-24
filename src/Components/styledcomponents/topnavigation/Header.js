import styled from "styled-components";
import { Layout } from "antd";
const { Header } = Layout;

export const HeaderArea = styled(Header)`
  padding-left: 14px;
  height: 55px;
  width: 100%;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
