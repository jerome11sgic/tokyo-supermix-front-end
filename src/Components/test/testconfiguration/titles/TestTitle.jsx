import React from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

import { ParagraphTitle } from "../../../styledcomponents/typography/ParagraphTitle";

export const TestTitle = title => {
  return (
    <FlexContainer>
      <ParagraphTitle>{title}</ParagraphTitle>
    </FlexContainer>
  );
};
