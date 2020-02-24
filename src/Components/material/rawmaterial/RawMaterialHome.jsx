import React, { Component } from "react";
import { FlexContainer } from "../../styledcomponents/container/FlexGrid";
import BasicCard from "../../styledcomponents/card/BasicCard";
import { Heading } from "../../styledcomponents/typography/typography";
import Material from "../../../assets/lab-microscope.svg";
import FineAggregate from "../../../assets/sand.svg";
import Cement from "../../../assets/cement.svg";
import CoarseAggregate from "../../../assets/landslide.svg";
import Admixture from "../../../assets/test-tube.svg";
import "./style.css";
import styled from "styled-components";
import Paragraph from "antd/lib/typography/Paragraph";
import { PrimaryButton } from "../../styledcomponents/button/button";

export const Image = styled.img`
  height: 70px;
  width: 90px;
`;

const alt = "sorry no image";

export default class RawMaterialHome extends Component {
  render() {
    return (
      <FlexContainer>
        <BasicCard>
          <div className="header">
            <Heading level={4} card>
              Material Test Results
            </Heading>
            <Image src={Material} alt={alt} />
          </div>
          <div className="header-gap"></div>
          <div className="content">
            <Paragraph style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ fontSize: "50px" }}>0</div>
              <div
                style={{ marginTop: "35px", padding: "6px", fontWeight: "600" }}
              >
                material tests
              </div>
            </Paragraph>
          </div>
        </BasicCard>
        <BasicCard>
          <div className="header">
            <Heading level={4} card>
              Fine Aggregate
            </Heading>
            <Image src={FineAggregate} alt={alt} />
          </div>
          <div className="header-gap"></div>
          <div className="content">
            <Paragraph style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ fontSize: "50px" }}>0</div>
              <div
                style={{ marginTop: "35px", padding: "6px", fontWeight: "600" }}
              >
                material tests
              </div>
            </Paragraph>
            <Paragraph style={{ display: "flex", flexWrap: "wrap" }}>
              <div
                style={{
                  marginTop: "10px",
                  fontSize: "30px"
                }}
              >
                0
              </div>
              <div
                style={{ marginTop: "21px", padding: "6px", fontWeight: "600" }}
              >
                Samples
              </div>
            </Paragraph>
          </div>
          <div className="button-area">
            <PrimaryButton primary icon="plus">
              Add Fine Aggregate
            </PrimaryButton>
          </div>
        </BasicCard>
        <BasicCard>
          <div className="header">
            <Heading level={4} card>
              Cement
            </Heading>
            <Image src={Cement} alt={alt} />
          </div>
          <div className="header-gap"></div>
          <div className="content">
            <Paragraph style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ fontSize: "50px" }}>0</div>
              <div
                style={{ marginTop: "35px", padding: "6px", fontWeight: "600" }}
              >
                material tests
              </div>
            </Paragraph>
          </div>
          <div className="button-area">
            <PrimaryButton icon="plus">Add Cement</PrimaryButton>
          </div>
        </BasicCard>
        <BasicCard>
          <div className="header">
            <Heading level={4} card>
              Coarse Aggregate
            </Heading>
            <Image src={CoarseAggregate} alt={alt} />
          </div>
          <div className="header-gap"></div>
          <div className="content">
            <Paragraph style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ fontSize: "50px" }}>0</div>
              <div
                style={{ marginTop: "35px", padding: "6px", fontWeight: "600" }}
              >
                material tests
              </div>
            </Paragraph>
          </div>
          <div className="button-area">
            <PrimaryButton icon="plus">Add Coarse Aggregate</PrimaryButton>
          </div>
        </BasicCard>
        <BasicCard>
          <div className="header">
            <Heading level={4} card>
              Admixture
            </Heading>
            <Image src={Admixture} alt={alt} />
          </div>
          <div className="header-gap"></div>
          <div className="content">
            <Paragraph style={{ display: "flex", flexWrap: "wrap" }}>
              <div style={{ fontSize: "50px" }}>0</div>
              <div
                style={{ marginTop: "35px", padding: "6px", fontWeight: "600" }}
              >
                material tests
              </div>
            </Paragraph>
          </div>
          <div className="button-area">
            <PrimaryButton icon="plus">Add Admixture</PrimaryButton>
          </div>
        </BasicCard>
      </FlexContainer>
    );
  }
}
