import styled from "styled-components";
import { Select } from "antd";

export const Selector = styled(Select)`
  width: 100px;
  flex-basis: 110px;

  @media (min-width: 1920px) {
    width: 50px;
  }
`;
