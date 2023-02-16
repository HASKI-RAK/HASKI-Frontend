import React from "react";
import { Contact } from "@pages";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

//in case a skeleton component should be needed for the contact page
  /*describe("Test Contact", () => {
    test("Skeleton state not loading", () => {
      const l=false;
      const tree = renderer.create(<Contact ld={l} />).toJSON();
      expect(tree).toMatchSnapshot(); 
    });
    test("Skeleton state loading", () => {
      const l=true;
      const {queryByRole} = render(<Contact ld={l} />);
      expect(queryByRole("skeleton")).toBeNull();
    });
  })*/
  test("renders correctly and matches snapshot", () => {
    
    const tree = renderer.create(<Contact />).toJSON();
    expect(tree).toMatchSnapshot();
  })
