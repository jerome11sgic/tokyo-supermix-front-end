import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";

export const NavigationLink = styled(NavLink)`
  text-decoration: none;
  height: auto;
  width: auto;
  color: gainsboro;

  ${props =>
    props.nav &&
    css`
      color: #188ad4;
    `};
`;
