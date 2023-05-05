import "@testing-library/jest-dom";
import { useNetworkStatus } from "./useNetworkStatus";
import { renderHook, act } from "@testing-library/react";

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

describe("Test useNetworkStatus", () => {
  test("test", async () => {
    const { result } = renderHook(() => useNetworkStatus());
    expect(result.current).toEqual(true);

    mockInternetConnection("offline");
    expect(result.current).toEqual(false);
  });
});
