import styled from "styled-components";

export const ColoredCard = styled.div`
  background: ${props =>
    props.blue
      ? "#2C365E"
      : props.green
      ? "#297373"
      : props.purple
      ? "#2B193D"
      : props.red
      ? "#610F7F"
      : ""};
  height: 170px;
  width: 180px;
  border-radius: 15px;
  color: white;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-evenly;
  box-shadow: 1.5px 4px 4px 3px rgba(0, 0, 0, 0.3);
  cursor: pointer;

  @media (min-width: 1920px) {
    height: 180px;
    width: 480px;
  }

  /* cursor: wait; */
`;

export const ColoredCardText = styled.h3`
  color: white;
  text-align: center;
  justify-content: center;
`;

export const ColoredCardDescription = styled.h4`
  color: white;
  text-align: center;
  width: 90%;
`;

export const ColoredCardImageArea = styled.div`
  width: auto;
  height: auto;
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 60px;
`;

export const ColoredCardImage = styled.img`
  width: 60px;
`;

export const ColoredCardTextArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
`;
