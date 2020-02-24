import styled from "styled-components";
import { Select } from "antd";

export const Selection = styled(Select)`
  width: ${props => (props.large ? "180px" : "100px")};
`;
