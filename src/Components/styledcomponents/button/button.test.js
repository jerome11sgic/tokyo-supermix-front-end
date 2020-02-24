import React from "react";
import renderer from "react-test-renderer";
import { PrimaryButton } from "./button";

test("it works", () => {
  const tree = renderer.create(<PrimaryButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
