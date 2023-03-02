/**
 * Has to be tsx in order to render a hook
 */

import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useUserStore } from "@services";
import { DefaultButton as Button } from "@common/components";


const DivElement = () => {
  const user = useUserStore((state) => state.user)
  const increaseUserId = useUserStore((state) => state.increaseUserId)
  const setUser = useUserStore((state) => state.setUser)
  return (
    <>
      <div>
        Hello {user?.firstName} {user?.surName} with ID:{" "}
        {user?.id}
      </div>
      <Button data-testid="increase" onClick={increaseUserId} />
      <Button
        data-testid="setuser"
        onClick={() => {
          setUser?.({ id: 3 });
        }}
      />
    </>
  )
}

describe("zustand test", () => {
  test("click increaseUserId", () => {
    const divelement = render(<DivElement />);
    const button = divelement.getByTestId("increase");
    fireEvent.click(button);
    expect(divelement.getByText("Hello with ID: 0")).toBeInTheDocument();
  });

  test("click set user", () => {
    const divelement = render(<DivElement />);
    const button = divelement.getByTestId("setuser");
    fireEvent.click(button);
    expect(divelement.getByText("Hello with ID: 3")).toBeInTheDocument();
  });
});
