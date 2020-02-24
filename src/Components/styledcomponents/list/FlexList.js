import styled from "styled-components";
import { List } from "antd";

export const FlexList = styled(List)`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: wrap;
`;

export const FlexListItem = styled(List.Item)`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  width: 500px;
`;
