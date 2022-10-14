import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";
import { useUserStore } from "./zustand/zustand";

describe("Test the demo component", () => {
  const userUserStore = renderHook(() => useUserStore((state) => state.user));
  const userIdStore = renderHook(() =>
    useUserStore((state) => state.increaseUserId)
  );
  const userSetUserStore = renderHook(() =>
    useUserStore((state) => state.setUser)
  );
  // Change User ID
  test("Change User ID", () => {
    expect(userUserStore.result.current.id).toBe(1);
    act(() => userIdStore.result.current?.());
    expect(userUserStore.result.current.id).toBe(2);
  });
  test("Inital User State is undefined", () => {
    expect(userUserStore.result.current.firstName).toBeUndefined();
    expect(userUserStore.result.current.surName).toBeUndefined();
  });
  test("Setting new user", () => {
    act(() => {
      userSetUserStore.result.current?.({
        id: 3,
        firstName: "Peter",
        surName: "Schmidt",
      });
    });
    // TODO Expect doesnt work yet
    //   userUserStore.rerender();
    //   expect(userUserStore.result.current.id).toBe(3);
    //   expect(userUserStore.result.current.firstName).toBe("Peter");
    //   expect(userUserStore.result.current.surName).toBe("Schmidt");
  });
});
