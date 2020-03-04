import styled, { css } from "styled-components";

//images
// import Material from "../../../assets/material2.jpg";
// import Mixer from "../../../assets/concretemixer.jpg";
// import Lab from "../../../assets/labtesting.jpg";
// import MasterSupplier from "../../../assets/master.jpg";
// import RawMaterial from "../../../assets/cementbag.jpg";
// import FinalProduct from "../../../assets/finalproduct2.jpg";
// import Settings from "../../../assets/settings.png";
// import Reports from "../../../assets/reports.png";
// import ImportFromExcel from "../../../assets/excelimport.png";
// import Accounts from "../../../assets/accounts.png";

// images alt
import Material from "../../../assets/homescreen/materialedited.png";
import Mixer from "../../../assets/concretemixer.jpg";
import Lab from "../../../assets/labtesting.jpg";
import MasterSupplier from "../../../assets/master.jpg";
import MasterSupplier1 from "../../../assets/master1.png";
import RawMaterial from "../../../assets/cementbag.jpg";
import FinalProduct from "../../../assets/finalproduct2.jpg";
import Settings from "../../../assets/settings.png";
import Reports from "../../../assets/reports.png";
import ImportFromExcel from "../../../assets/excelimport.png";
import Accounts from "../../../assets/accounts.png";
import Configuration from "../../../assets/homescreen/configurationedited.png";
import TestTrial from "../../../assets/homescreen/testtrial.png";
import MixDesign from "../../../assets/homescreen/mixdesign.png";

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

export const ImageCard = styled.div`
    height: 120px;
    width: 200px;
    text-shadow: 1px 6px 7px none;
    border: none;
    position: static;
    z-index: 20;
    border-radius: 0.35em;
    transform: translate3d(2px);
    background-size: cover; 
    box-shadow: 4px 4px 6px 3px rgba(0,0,0,0.5);
    cursor: pointer;

    ${props =>
      props.material &&
      css`
        background: url(${Material});
        background-size: cover;
      `}

    ${props =>
      props.samples &&
      css`
        background: url(${Mixer});
        background-size: cover;
      `}

    ${props =>
      props.testing &&
      css`
        background: url(${Lab});
        background-size: cover;
      `}
    
    ${props =>
      props.testTrial &&
      css`
        background: url(${TestTrial});
        background-size: cover;
      `}

    
    ${props =>
      props.master &&
      css`
        background: url(${MasterSupplier});
        background-size: cover;
      `}
      ${props =>
        props.master &&
        css`
          background: url(${MasterSupplier1});
          background-size: cover;
        `}

    ${props =>
      props.reports &&
      css`
        background: url(${Reports});
        background-size: cover;
      `}

    ${props =>
      props.settings &&
      css`
        background: url(${Settings});
        background-size: cover;
      `}
    
    ${props =>
      props.mixDesign &&
      css`
        background: url(${MixDesign});
        background-size: cover;
      `}

    ${props =>
      props.importexcel &&
      css`
        background: url(${ImportFromExcel});
        background-size: cover;
      `}

    ${props =>
      props.accounts &&
      css`
        background: url(${Accounts});
        background-size: cover;
      `}
      


    ${props =>
      props.rawmaterial &&
      css`
        background: url(${RawMaterial});
        background-size: cover;
        width: 10em;
        height: 13em;
      `}

    ${props =>
      props.finalproduct &&
      css`
        background: url(${FinalProduct});
        background-size: cover;
        width: 10em;
        height: 13em;
        margin-left: 1.7em;
      `}
  ${props =>
    props.configuration &&
    css`
      background: url(${Configuration});
      background-size: cover;
      width: 10em;
      height: 13em;
      margin-left: 1.7em;
    `};





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
        box-shadow: 8px 22px 30px 3px rgba(0,0,0,0.6);
        -webkit-animation-name: cardUp; /* Safari 4.0 - 8.0 */
        -webkit-animation-duration: 1s; /* Safari 4.0 - 8.0 */
        -moz-animation-name: cardUp; /* Mozilla */
        -moz-animation-duration: 1s; /* Mozilla */
    }

    
    @keyframes cardUp {
      from {
        box-shadow: 4px 4px 6px 3px rgba(0,0,0,0.5);
        transform: translate3d(2px);
        z-index: 20;
      }
      to {
        box-shadow: 8px 22px 30px 3px rgba(0,0,0,0.6);
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
        height: 145px;
        width: 230px;  
       margin: 15px;
    }







   
    

   
    
`;
