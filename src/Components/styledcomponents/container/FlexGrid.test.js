import React from "react";
import renderer from "react-test-renderer";
import { FlexContainer } from "./FlexGrid";

test("it works", () => {
  const tree = renderer.create(<FlexContainer />).toJSON();
  //   expect(tree).toHaveStyleRule("display", "flex");
  expect(tree).toMatchSnapshot();
  //   expect(tree).toHaveStyleRule("flex-wrap", "wrap", {
  //     media: "(max-width: 640px)",
  //     modifier: ":hover"
  //   });
});
