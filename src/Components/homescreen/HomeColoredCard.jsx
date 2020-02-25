import React, { useState } from "react";
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

import { ToggleDisplayWindow } from "./ToggleDisplayWindow";

const alt = "sorry no image";

export const HomeColoredCard = (colorprop, text, totalSamples) => {
  if (colorprop === "blue") {
    return (
      <ColoredCard
        blue
        // onClick={() => new ToggleDisplayWindow("FineAggregate")}
      >
        <ColoredCardImageArea>
          <ColoredCardImage src={FineAggregate} alt={alt} />
        </ColoredCardImageArea>
        <ColoredCardTextArea>
          <ColoredCardText>{text}</ColoredCardText>
          <ColoredCardDescription>
            Total Samples Arrived Today is: &nbsp;<em>{totalSamples}</em>
          </ColoredCardDescription>
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
          <ColoredCardDescription>
            Total Samples Arrived Today is: &nbsp;<em>{totalSamples}</em>
          </ColoredCardDescription>
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
          <ColoredCardDescription>
            Total Samples Arrived Today is: &nbsp;<em>{totalSamples}</em>
          </ColoredCardDescription>
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
          <ColoredCardDescription>
            Total Samples Arrived Today is: &nbsp;<em>{totalSamples}</em>
          </ColoredCardDescription>
        </ColoredCardTextArea>
      </ColoredCard>
    );
  }
};
