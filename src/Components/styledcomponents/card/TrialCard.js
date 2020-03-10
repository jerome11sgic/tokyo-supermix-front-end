import styled, { css } from "styled-components";

import MaterialTest from "../../../assets/testtrial/materialTest.png";
import ConcreteTest from "../../../assets/testtrial/concreteTest.png";
import ConcreteStrengthTest from "../../../assets/testtrial/concreteStrengthTest.png";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "1920px",
  desktopL: "2560px"
};

export const device = {
  mobileS: `(max-width: ${size.mobileS})`,
  mobileM: `(max-width: ${size.mobileM})`,
  mobileL: `(max-width: ${size.mobileL})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  laptopL: `(max-width: ${size.laptopL})`,
  desktop: `(max-width: ${size.desktop})`,
  desktopL: `(max-width: ${size.desktop})`
};

export const TestTrialCardDetails = styled.p`
  color: white;
  font-weight: 550;
  margin-top: 5px;
`;

export const TestTrialCardText = styled.h2`
  margin-top: 60px;
  color: white;
`;

export const TrialCard = styled.div`
  text-shadow: 1px 6px 7px none;
  border: none;
  position: static;
  z-index: 20;
  border-radius: 0.35em;
  transform: translate3d(2px);
  background-size: cover;
  box-shadow: 4px 4px 6px 3px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  display: flex;
  flex-direction: column;

  ${props =>
    props.concreteTest &&
    css`
      background: url(${ConcreteTest});
      background-size: cover;
    `}

  ${props =>
    props.concreteStrengthTest &&
    css`
      background: url(${ConcreteStrengthTest});
      background-size: cover;
    `}

    ${props =>
      props.materialTest &&
      css`
        background: url(${MaterialTest});
        background-size: cover;
      `}


  &:hover {
    position: static;
    animation-name: cardUp;
    /* transform: translateY(-8px);
        transition: 10s; */
    animation-duration: 1s;
    z-index: 300;
    transform: translate3d(52px);
    transform: translateY(-2px);
    /* animation-iteration-count: infinite; */
    box-shadow: 8px 22px 30px 3px rgba(0, 0, 0, 0.6);
    -webkit-animation-name: cardUp; /* Safari 4.0 - 8.0 */
    -webkit-animation-duration: 1s; /* Safari 4.0 - 8.0 */
    -moz-animation-name: cardUp; /* Mozilla */
    -moz-animation-duration: 1s; /* Mozilla */
  }

  @keyframes cardUp {
    from {
      box-shadow: 4px 4px 6px 3px rgba(0, 0, 0, 0.5);
      transform: translate3d(2px);
      z-index: 20;
    }
    to {
      box-shadow: 8px 22px 30px 3px rgba(0, 0, 0, 0.6);
      z-index: 300;
      transform: translate3d(52px);
      transform: translateY(-2px);
    }
  }
  @media ${device.desktop} {
    height: 250px;
    width: 360px;
    margin: 20px;
  }
  @media ${device.tablet} {
    width: 8m;
    height: 9em;
    margin: 10px;
  }

  /* current device */
  @media ${device.laptopL} {
    height: 240px;
    width: 410px;
    margin: 15px;
  }
`;
