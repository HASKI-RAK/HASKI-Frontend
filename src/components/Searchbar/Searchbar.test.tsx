import "@testing-library/jest-dom";
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import { TestSearchbarProps, TestSearchbar } from "./Searchbar";
jest.useFakeTimers();
jest.spyOn(global, 'clearTimeout')

describe("Searchbar test", () => {
  const mockPropsNorm: TestSearchbarProps = {
    label: "testLabel",
    setSearchQuery: jest.fn(),
    timeout: 1000,
  };

  test("renders without crashing", () => {
    const { getByTestId,getAllByText } = render(<TestSearchbar {...mockPropsNorm} />);
    const searchbar = getByTestId("searchbar");
    const label: string = mockPropsNorm.label! + mockPropsNorm.label! + 1;

    expect(getAllByText(mockPropsNorm.label!).length).toEqual(2) ; 
  });

  test("handleChange", async () => {
    const {  } = render(<TestSearchbar {...mockPropsNorm} />);

    const searchbarInput = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(searchbarInput, { target: { value: "testValue" } });
    expect(mockPropsNorm.setSearchQuery).toHaveBeenCalledTimes(0);
    jest.advanceTimersByTime(mockPropsNorm.timeout!);

    expect(mockPropsNorm.setSearchQuery).toHaveBeenCalledTimes(1);
    expect(mockPropsNorm.setSearchQuery).toHaveBeenCalledWith("testValue");
  });

});
