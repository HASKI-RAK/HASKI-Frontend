import { Button } from "@common/components";
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
    <Button onClick={userState.increaseUserId}>one up</Button>
  </>
);
interface DashboardProps {
  userState?: UserState;
}
