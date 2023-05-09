import "@testing-library/jest-dom";
import {
  act,
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
import SnackbarContainer from "./SnackbarContainer";
import {
  SnackbarContext,
  SnackbarContextType,
  } from "@services";

const mockContext = {
  snackbarsErrorWarning: [
    {
      severity: "error",
      message: "test",
      autoHideDuration: undefined,
    },
  ],
  snackbarsSuccessInfo: [
    {
      severity: "success",
      message: "test",
      autoHideDuration: undefined,
    },
  ],
  setSnackbarsErrorWarning: jest.fn(),
  setSnackbarsSuccessInfo: jest.fn(),
  addSnackbar: jest.fn(),
  updateSnackbar: jest.fn(),
  removeSnackbar: jest.fn(),
} as SnackbarContextType;

const mockInternetConnection = (status: string) => {
  const events = {};
  jest.spyOn(window, "addEventListener").mockImplementation((event, handle) => {
    // @ts-ignore
    events[event] = handle;
  });
  const changeStatus = new window.Event(status);
  act(() => {
    window.dispatchEvent(changeStatus);
  });
};

const mockUseNetworkStatus = jest.fn().mockReturnValue(true);

describe("Test SnackbarContainer", () => {
  window.addEventListener("offline", (e) => {
    console.log("offline");
  });

  window.addEventListener("online", (e) => {
    console.log("online");
  });

  test("SnackbarContainer renders on its own", () => {
    const { getByTestId } = render(<SnackbarContainer />);
    const snackbarContainer = getByTestId("snackbarContainer");
    expect(snackbarContainer).toBeInTheDocument();
  });

  test("Lose and retrieve internet connection", () => {
    const { rerender, getByText } = render(
      <SnackbarContext.Provider value={mockContext}>
        <SnackbarContainer />
      </SnackbarContext.Provider>
    );
    const internetConnection = jest.spyOn(window, "addEventListener");
    mockInternetConnection("offline");

    rerender(
      <SnackbarContext.Provider value={mockContext}>
        <SnackbarContainer />
      </SnackbarContext.Provider>
    );
    mockInternetConnection("online");

    window.dispatchEvent(new Event("online"));
    screen.debug();

    expect(internetConnection).toHaveBeenCalledTimes(2); // Wird zweimal aufgerufen!
  });
});

describe("Test AnotherSnackbarContainer", () => {
  test("Lose and retrieve internet connection - 2", () => {
    const { getByText, queryByText } = render(
        <SnackbarContext.Provider value={mockContext}>
          <SnackbarContainer />
        </SnackbarContext.Provider>
    );

    // Simulate loss of internet connection
    act(() => {
      mockUseNetworkStatus.mockReturnValue(false);
      fireEvent(window, new Event("offline"));
    });

    //expect(getByText("Offline")).toBeInTheDocument();

    // Simulate retrieval of internet connection
    act(() => {
      mockUseNetworkStatus.mockReturnValue(true);
      fireEvent(window, new Event("online"));
    });

    //expect(queryByText("Offline")).toBeNull();
    //expect(getByText("Back online")).toBeInTheDocument();
  });
});
