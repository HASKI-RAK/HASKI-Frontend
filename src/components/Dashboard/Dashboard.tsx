import { ButtonUnstyled } from "@mui/base"
import { useUserState } from "src/common/services/UserStore/hooks"

export const Dashboard = () => {
    const user = useUserState((state) => state.user)
    // const increasePopulation = useUserState((state) => state.setUser({firstName:"heyo"}))
    return <>
    <div>Hello {user?.firstName}</div>
    <ButtonUnstyled onClick={() => console.log("s")}>one up</ButtonUnstyled>
    </>
}
/* <ButtonUnstyled onClick={() => console.log("s")}>one up</ButtonUnstyled> */
