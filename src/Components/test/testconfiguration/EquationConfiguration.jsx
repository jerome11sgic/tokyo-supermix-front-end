import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import TestParameterTable from "./tables/TestParameterTable";
import EquipmentParameterTable from "./tables/EquipmentParameterTable";
import AdditionalParameterTable from "./tables/AdditionalParameters";
import "./styleEquationConfiguration.css";
import { MiniCard } from "../../styledcomponents/card/MiniCard";
import Paragraph from "antd/lib/typography/Paragraph";
import TextArea from "antd/lib/input/TextArea";
import { PrimaryButton } from "../../styledcomponents/button/button";

export default class EquationConfiguration extends Component {
  render() {
    return (
      <FlexContainer column>
        <div style={{ height: "20px" }}></div>
        <FlexContainer normal>
          <TestParameterTable />
          <EquipmentParameterTable />
          <AdditionalParameterTable />
        </FlexContainer>
        <div style={{ height: "25px" }}></div>
        <FlexContainer normal className='equation_wrapper'>
          <TextArea className='equation_playground'>
            <Paragraph style={{ fontSize: "20px", opacity: 0.9 }}>
              A-B
            </Paragraph>
          </TextArea>
          <div className='calculators'>
            <MiniCard equal></MiniCard>

            <MiniCard>
              <Paragraph className='backImg'>+</Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph className='backImg'>-</Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph className='backImg'>*</Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph className='backImg'>/</Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph className='backImg'>.</Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph className='backImg'>(</Paragraph>
            </MiniCard>

            <MiniCard>
              <Paragraph className='backImg'>)</Paragraph>
            </MiniCard>

            <MiniCard squareroot></MiniCard>

            <MiniCard pie></MiniCard>

            <MiniCard greaterthan></MiniCard>

            <MiniCard lowerthan></MiniCard>

            <MiniCard square></MiniCard>
          </div>
          <PrimaryButton
            style={{
              background: "#001328",
              color: "white",
              marginTop: "100px",
              marginLeft: "10px"
            }}
          >
            Submit
          </PrimaryButton>
        </FlexContainer>
      </FlexContainer>
    );
  }
}
