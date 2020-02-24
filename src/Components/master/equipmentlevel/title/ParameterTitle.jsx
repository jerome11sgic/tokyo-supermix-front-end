import React, { Component } from 'react';
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import Paragraph from "antd/lib/typography/Paragraph";
import "./styleTitle.css";

export default class ParameterTitle extends Component {
    render() {
        return (
            <FlexContainer className="title_wrapper">
            <Paragraph className="title_text">Equipment Parameter Master</Paragraph>
          </FlexContainer>
        )
    }
}
