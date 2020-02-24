import styled from "styled-components";
import { Typography } from "antd";
import theme from "../../../theme";

const { Title } = Typography;

export const Heading = styled(Title)`
  font-family: ${props => (props.card ? theme.fonts.calibri : "roboto")};
`;

export const TileParagraph = styled.p`
  font-size: 14px;
  font-family: "Roboto";
  align-self: auto;
  width: 100%;
  color: white;
`;

export const Heading1 = styled.h1`
  font-family: "Roboto";
  color: white;
  font-weight: 500;
  letter-spacing: 1.8;
  font-size: 18px;
`;
