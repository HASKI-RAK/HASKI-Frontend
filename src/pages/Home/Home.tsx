import {Dashboard,DropdownLanguage,Text, QuestionnaireResultsButton} from "@components";



export const Home = () => {
    return (
        <div className="main">
            <Dashboard/>
            <QuestionnaireResultsButton/>
            <DropdownLanguage/>
            <Text/>
        </div>
    )
};

export default Home;