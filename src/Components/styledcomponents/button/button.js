import styled, { css } from "styled-components";
import theme from "../../../theme";
import { Button } from "antd";

export const PrimaryButton = styled(Button)`
  ${props =>
    props.primary &&
    css`
      border-radius: "0.1em";
      box-shadow: "20px 20px 1px 1px";
      border: none;
      outline: none;

      &:hover {
        color: ${theme.colors.black};
        outline: none;
        border: none;
      }
    `}
`;
