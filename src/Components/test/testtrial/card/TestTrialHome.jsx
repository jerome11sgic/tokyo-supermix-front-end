import React, { Component } from "react";
import { FlexContainer } from "../../../styledcomponents/container/FlexGrid";
import {
  TrialCard,
  TestTrialCardText,
  TestTrialCardDetails
} from "../../../styledcomponents/card/TrialCard";
import { NavigationLink } from "../../../styledcomponents/Link/NavLink";

export default class TestTrialHome extends Component {
  render() {
    return (
      <FlexContainer style={{ justifyContent: "space-around" }}>
        <NavigationLink to="/concretetest">
          <TrialCard concreteTest>
            <TestTrialCardText>Concrete Test</TestTrialCardText>
            <TestTrialCardDetails>Total Tests: 10</TestTrialCardDetails>
          </TrialCard>
        </NavigationLink>
        <NavigationLink to="/strengthtest">
          <TrialCard concreteStrengthTest>
            <TestTrialCardText>Concrete Strength Test</TestTrialCardText>
            <TestTrialCardDetails>Total Tests: 8</TestTrialCardDetails>
          </TrialCard>
        </NavigationLink>
        <NavigationLink to="/testtype">
          <TrialCard materialTest>
            <TestTrialCardText>Material Test</TestTrialCardText>
            <TestTrialCardDetails>Total Tests: 15</TestTrialCardDetails>
          </TrialCard>
        </NavigationLink>
      </FlexContainer>
    );
  }
}
