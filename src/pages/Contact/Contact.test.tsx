import React from "react";
import { render, screen } from "@testing-library/react";
import { Contact } from "@pages";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom";

  describe("Test Contact", () => {
    test("Skeleton state not loading", () => {
      const l=false;
      const tree = renderer.create(<Contact ld={l} />).toJSON();
      expect(tree).toMatchSnapshot(); 
    });
    test("Skeleton state loading", () => {
      const l=true;
      const content=<div>Some text</div>;
      const tree = render(<Contact ld={l} />);
      expect(tree.container(content)).not.toBeInTheDocument();
    });
  })
  test("renders correctly and matches snapshot", () => {
    
    const tree = renderer.create(<Contact />).toJSON();
    expect(tree).toMatchSnapshot();
  })
