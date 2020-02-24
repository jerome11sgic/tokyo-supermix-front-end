import styled, { css } from "styled-components";

export const TileArea = styled.div`
  min-height: 200px;
  flex-basis: 180px;
  position: sticky;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.04);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin-left: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const TileAreaText = styled.div`
  margin-top: 9px;
  font-size: 13px;
  flex-basis: 65px;

  ${props =>
    props.category &&
    css`
      margin-top: 0px;
      font-size: 13px;
      flex-basis: 65px;
    `}
  ${props =>
    props.unit &&
    css`
      margin-top: 0px;
      font-size: 13px;
    `}
  ${props =>
    props.test &&
    css`
      margin-top: -0px;
      font-size: 13px;
    `}
  ${props =>
    props.testreport &&
    css`
      flex-basis: 100px;
    `}
  ${props =>
    props.materialcategory &&
    css`
      flex-basis: 75px;
    `}
`;

export const TileAreaAction = styled.div`
  margin-top: 7px;
`;
