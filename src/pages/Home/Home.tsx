import {Dashboard,DropdownLanguage,Text} from "@components";
import log from "loglevel";



export const Home = () => {
    log.setLevel("error")
    return (
        <div className="main">
            <Dashboard/>
            <DropdownLanguage/>
            <Text/>
        </div>
    )
};

export default Home;