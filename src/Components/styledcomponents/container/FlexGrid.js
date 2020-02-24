import styled, { css } from "styled-components";

export const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${props => (props.column ? "column" : "row")};
  height: ${props => (props.titles ? "40px" : props.steps ? "150px" : "")};
  justify-content: ${props =>
    props.home
      ? "flex-start"
      : props.normal
      ? "space-evenly"
      : "space-between"};

  ${props =>
    props.leveltitles &&
    css`
      @media (min-width: 1900px) {
        justify-content: space-between;
        width: calc(100% - 10px);
      }
    `}
  ${props =>
    props.leveltileareafixed &&
    css`
      margin-top: -15px;
      justify-content: flex-start;
    `}
  ${props =>
    props.stepsarea &&
    css`
      justify-content: space-evenly;
      margin-top: 15px;
    `}

  ${props =>
    props.borderRadiused &&
    css`
      border-bottom-right-radius: 15px;
      border-bottom-left-radius: 15px;
      background: white;
      padding: 10px;
    `}

  ${props =>
    props.homecard1 &&
    css`
            display: flex;
            flex-direction: column
            justify-content: space-evenly;
            height: auto;
            width: 300px;
            background: rgba(252, 252, 252, 0.85);

            padding: 20px;
            border-radius: 15px;
            box-shadow: 2px 4px 3px 2px rgba(0,0,0,0.4);
            -ms-border-radius: 15px;
            -o-border-radius: 15px;
            -moz-border-radius: 15px;
            -webkit-border-radius: 15px;
            border-radius: 15px;
            -ms-box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.41);
            -o-box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.41);
            -webkit-box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.41);
            -moz-box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.41);
            box-shadow: 0px 3px 5px 1px rgba(0, 0, 0, 0.41); */
            
  `}

  ${props =>
    props.resCardArea &&
    css`
      width: 790px;
      background: white;
      padding: 10px;
      border-radius: 15px;

      @media (min-width: 1920px) {
        width: 1200px;
      }
    `}
    
`;
