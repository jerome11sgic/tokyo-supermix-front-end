import React from "react";
import { Progress } from "antd";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import Paragraph from "antd/lib/skeleton/Paragraph";

export const CircularRadialBar = (heading, percentage) => {
  return (
    <FlexContainer column>
      <Paragraph>{heading}</Paragraph>
      <Progress type='dashboard' percent={percentage} />
    </FlexContainer>
  );
};
