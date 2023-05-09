import "@testing-library/jest-dom";
import {
    act,
    fireEvent,
    render
} from "@testing-library/react";
import SnackbarContainer from "./SnackbarContainer";
import {
    SnackbarContext,
    SnackbarContextType
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
