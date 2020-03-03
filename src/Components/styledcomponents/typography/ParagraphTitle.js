import styled, { css } from "styled-components";

export const ParagraphTitle = styled.p`
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 1.2;
  height: 40px;
  width: 600px;
  margin-top: -30px;
  margin-left: 3px;
  background-color: #00111b;
  color: white;
  border-radius: 15px;
  vertical-align: center;
  padding: 5px;

  @media (min-width: 1920px) {
    margin-left: 10px;
  }

  ${props =>
    props.lengthy &&
    css`
      margin-top: 10px;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      color: white;
      background: #001422;
      height: 40px;
      width: 100%;
      font-size: 16px;
      padding: 10px;
    `}
`;
