import React from "react";
import {
  ColoredCard,
  ColoredCardText,
  ColoredCardImageArea,
  ColoredCardImage,
  ColoredCardTextArea,
  ColoredCardDescription
} from "../styledcomponents/card/ColoredCard";
import FineAggregate from "../../assets/sand.png";
import CoarseAggregate from "../../assets/rock.png";
import Cement from "../../assets/cement.png";
import Admixture from "../../assets/lab.png";

const alt = "sorry no image";

export const HomeColoredCard = (colorprop, text, description) => {
  if (colorprop === "blue") {
    return (
      <ColoredCard blue>
        <ColoredCardImageArea>
          <ColoredCardImage src={FineAggregate} alt={alt} />
        </ColoredCardImageArea>
        <ColoredCardTextArea>
          <ColoredCardText>{text}</ColoredCardText>
          <ColoredCardDescription>{description}</ColoredCardDescription>
        </ColoredCardTextArea>
      </ColoredCard>
    );
  }
  if (colorprop === "green") {
    return (
      <ColoredCard green>
        <ColoredCardImageArea>
          <ColoredCardImage src={Cement} alt={alt} />
        </ColoredCardImageArea>
        <ColoredCardTextArea>
          <ColoredCardText>{text}</ColoredCardText>
          <ColoredCardDescription>{description}</ColoredCardDescription>
        </ColoredCardTextArea>
      </ColoredCard>
    );
  }
  if (colorprop === "purple") {
    return (
      <ColoredCard purple>
        <ColoredCardImageArea>
          <ColoredCardImage src={Admixture} alt={alt} />
        </ColoredCardImageArea>
        <ColoredCardTextArea>
          <ColoredCardText>{text}</ColoredCardText>
          <ColoredCardDescription>{description}</ColoredCardDescription>
        </ColoredCardTextArea>
      </ColoredCard>
    );
  }
  if (colorprop === "red") {
    return (
      <ColoredCard red>
        <ColoredCardImageArea>
          <ColoredCardImage src={CoarseAggregate} alt={alt} />
        </ColoredCardImageArea>
        <ColoredCardTextArea>
          <ColoredCardText>{text}</ColoredCardText>
          <ColoredCardDescription>{description}</ColoredCardDescription>
        </ColoredCardTextArea>
      </ColoredCard>
    );
  }
};
