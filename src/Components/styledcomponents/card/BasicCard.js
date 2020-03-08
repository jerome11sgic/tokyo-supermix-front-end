import styled, { css } from "styled-components";
import theme from "../../../theme";
import { Heading } from "../typography/typography";

const BasicCard = styled.div`
  position: static;
  z-index: 100;
  background: ${props =>
    props.black ? theme.colors.black : theme.colors.white};
  font-family: "Roboto";
  box-shadow: ${props =>
    props.finalproduct
      ? "10px 10px 25px 10px rgba(0, 0, 0, 0.2)"
      : "50px 50px 18px 3px rgba(0, 0, 0, 0.1)"};
  height: auto;
  width: 22em;
  text-align: left;
  margin-top: ${props => (props.margined ? "0em" : "1em")};
  border-radius: 0.4em;
  cursor: ${props => (props.finalproduct ? "pointer" : "")};

  &:hover {
    box-shadow: ${props =>
      props.finalproduct ? "10px 14px 15px 14px rgba(0, 0, 0, 0.3)" : ""};
    transform: translate3d(2px);
    transition: 0.3s ease-in-out;
  }

  ${props =>
    props.black &&
    css`
      background: ${theme.colors.black};
      ${Heading} {
        color: ${theme.colors.white};
      }
    `}

  ${props =>
    props.finalproduct &&
    css`
      &:active {
        transform: translateY(4px);
        transition: 1.5s cubic-bezier(0.215, 0.61, 0.355, 1);
      }
    `}


    ${props =>
      props.tileareacard &&
      css`
        background: #001328;
        height: 50px;
        padding-right: 50px;
        font-size: 12px;
        color: #ffff;
        width: 150px;
        padding: 6px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      `}

   
    ${props =>
      props.testtrial &&
      css`
        /* background: #001328; */
        height: 120px;
        padding-right: 50px;
        font-size: 12px;
        background: url(${props => props.imgUrl});
        width: 245px;
        padding: 6px;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
      `};

      ${props =>
        props.testreport &&
        css`
          height: 60px;
          width: 170px;
        `}
    
`;

export default BasicCard;
