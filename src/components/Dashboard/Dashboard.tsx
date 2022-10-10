import { ButtonUnstyled } from "@mui/base"
import { useUserState } from "src/common/services/UserStore/hooks"

export const Dashboard = () => {
    const user = useUserState((state) => state.user)
    const increaseId = useUserState((state) => state.increaseId)
    return <>
    <div>Hello {user?.firstName}, {user?.id}</div>
    <ButtonUnstyled onClick={increaseId}>one up</ButtonUnstyled>
    </>
}
