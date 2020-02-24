import React from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";

export const TestTrialTableTitles = title => {
  return (
    <FlexContainer style={{ height: "30px" }}>
      <h4 style={{ width: "100%" }}>{title}</h4>
    </FlexContainer>
  );
};
