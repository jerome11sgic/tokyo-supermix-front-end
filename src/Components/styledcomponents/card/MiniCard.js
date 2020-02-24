import styled, { css } from "styled-components";
import Add from "../../../assets/calculator/add.png";
import Subtract from "../../../assets/calculator/subtract.png";
import Multiply from "../../../assets/calculator/multiply.png";
import Division from "../../../assets/calculator/divide.png";
import Equal from "../../../assets/calculator/equal.png";
import SquareRoot from "../../../assets/calculator/square-root.png";
import IsLesserThan from "../../../assets/calculator/is-less-than.png";
import IsGreaterThan from "../../../assets/calculator/is-greater-than.png";
import Zigma from "../../../assets/calculator/zigma.png";
import Pie from "../../../assets/calculator/pie.png";
import Square from "../../../assets/calculator/square.png";
// import Multiply from "../../../assets/calculator/";

export const MiniCard = styled.div`
  position: static;
  z-index: 100;
  height: 50px;
  width: 50px;
  display: flex;
  /* border-top-left-radius: ${props => (props.topLeft ? "20px" : "")};
  border-top-right-radius: ${props => (props.topRight ? "20px" : "")};
  border-bottom-left-radius: ${props => (props.bottomLeft ? "20px" : "")};
  border-bottom-right-radius: ${props => (props.bottomRight ? "20px" : "")}; */
  justify-content: center;
  cursor: pointer;
  
  /* border: 2px solid #001016; */
  border-radius: 20px;
  box-shadow: 1px 4px 2px 2px rgba(0, 0, 0, 0.05);
 
  /* ${props =>
    props.add &&
    css`
      background: url(${Add});
      background-size: cover;
    `}
    ${props =>
      props.subtract &&
      css`
        background: url(${Subtract});
        background-size: cover;
      `}
    ${props =>
      props.multiply &&
      css`
        background: url(${Multiply});
        background-size: cover;
      `}
    ${props =>
      props.divide &&
      css`
        background: url(${Division});
        background-size: cover;
      `} */
    ${props =>
      props.add &&
      css`
        background: url(${Add});
        background-size: cover;
      `}
    ${props =>
      props.subtract &&
      css`
        background: url(${Subtract});
        background-size: cover;
      `}
    ${props =>
      props.multiply &&
      css`
        background: url(${Multiply});
        background-size: cover;
      `}
    ${props =>
      props.divide &&
      css`
        background: url(${Division});
        background-size: cover;
      `}
    ${props =>
      props.equal &&
      css`
        background: url(${Equal});
        background-size: cover;
      `};
    ${props =>
      props.zigma &&
      css`
        background: url(${Zigma});
        background-size: cover;
      `};
    ${props =>
      props.lowerthan &&
      css`
        background: url(${IsLesserThan});
        background-size: cover;
      `};

    ${props =>
      props.greaterthan &&
      css`
        background: url(${IsGreaterThan});
        background-size: cover;
      `};

    ${props =>
      props.squareroot &&
      css`
        background: url(${SquareRoot});
        background-size: cover;
      `};
    ${props =>
      props.pie &&
      css`
        background: url(${Pie});
        background-size: cover;
      `};
    ${props =>
      props.square &&
      css`
        background: url(${Square});
        background-size: cover;
      `};



      &:active{
        box-shadow: 0px 1px 2px 2px rgba(0, 0, 0, 0.1)
      }
  
`;
