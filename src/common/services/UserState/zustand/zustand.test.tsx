/**
 * Has to be tsx in order to render a hook
 */

import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useUserStore, UserState } from "@services/UserStore";
import { Button } from "@common/components";

interface DivElementProps {
  userState?: UserState;
}

const DivElement = ({
  userState = {
    user: useUserStore((state) => state.user),
    increaseUserId: useUserStore((state) => state.increaseUserId),
    setUser: useUserStore((state) => state.setUser),
  },
}: DivElementProps) => (
  <>
    <div>
      Hello {userState.user?.firstName} {userState.user?.surName} with ID:{" "}
      {userState.user?.id}
    </div>
    <Button data-testid="increase" onClick={userState.increaseUserId} />
    <Button
      data-testid="setuser"
      onClick={() => {
        userState.setUser?.({ id: 3 });
      }}
    />
  </>
);

describe("zustand test", () => {
  test("click increaseUserId", () => {
    const divelement = render(<DivElement />);
    const button = divelement.getByTestId("increase");
    fireEvent.click(button);
  });

  test("click increaseUserId with no user in store", () => {
    const divelement = render(<DivElement />);
    const button = divelement.getByTestId("increase");
    fireEvent.click(button);
  });

  test("click set user", () => {
    const divelement = render(<DivElement />);
    const button = divelement.getByTestId("setuser");
    fireEvent.click(button);
  });
});
