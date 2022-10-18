import { ButtonUnstyled } from "@mui/base";
import { UserState, useUserStore } from "@services/UserStore";

export const Dashboard = ({
  userState = {
    user: useUserStore((state) => state.user),
    increaseUserId: useUserStore((state) => state.increaseUserId),
  },
}: DashboardProps) => (
  <>
    <div>
      Hello {userState.user?.firstName} {userState.user?.surName} with ID:
      {userState.user?.id}
    </div>
    <ButtonUnstyled onClick={userState.increaseUserId}>one up</ButtonUnstyled>
  </>
);
interface DashboardProps {
  userState?: UserState;
}
