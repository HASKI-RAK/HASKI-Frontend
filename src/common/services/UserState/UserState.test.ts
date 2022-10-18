import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { useUserStore } from "./zustand/zustand";

describe("Test the demo component", () => {
  // Change User ID
  test("Change User ID initally with undefined", () => {
    const userUserStore = renderHook(() => useUserStore((state) => state.user));
    const userIdStore = renderHook(() =>
      useUserStore((state) => state.increaseUserId)
    );
    expect(userUserStore.result.current?.id).toBe(undefined);
    act(() => userIdStore.result.current?.());
    expect(userUserStore.result.current?.id).toBe(0);
  });
  test("Change User ID with already set", () => {
    const userUserStore = renderHook(() => useUserStore((state) => state.user));
    const userIdStore = renderHook(() =>
      useUserStore((state) => state.increaseUserId)
    );
    const userSetUserStore = renderHook(() =>
      useUserStore((state) => state.setUser)
    );

    act(() => {
      userSetUserStore.result.current?.({
        id: 3,
        firstName: "Peter",
        surName: "Schmidt",
      });
    });
    expect(userUserStore.result.current?.id).toBe(3);
    act(() => userIdStore.result.current?.());
    expect(userUserStore.result.current?.id).toBe(4);
  });
  test("Inital User State is undefined", () => {
    const userUserStore = renderHook(() => useUserStore((state) => state.user));

    expect(userUserStore.result.current?.firstName).toBeUndefined();
    expect(userUserStore.result.current?.surName).toBeUndefined();
  });
  test("Setting new user", () => {
    const userSetUserStore = renderHook(() =>
      useUserStore((state) => state.setUser)
    );

    act(() => {
      userSetUserStore.result.current?.({
        id: 3,
        firstName: "Peter",
        surName: "Schmidt",
      });
    });
  });
});
