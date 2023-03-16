import {DropdownLanguage, Text, QuestionnaireResultsModal} from "@components";
import log from "loglevel";

export const Home = () => {
    log.setLevel("error")
    return (
        <div className="main">
            <QuestionnaireResultsModal/>
            <DropdownLanguage/>
            <Text/>
        </div>
    )
};

export default Home;