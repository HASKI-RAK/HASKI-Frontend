import {DropdownLanguage,Text, QuestionnaireResultsModal} from "@components";



export const Home = () => {
    return (
        <div className="main">
            <QuestionnaireResultsModal/>
            <DropdownLanguage/>
            <Text/>
        </div>
    )
};

export default Home;