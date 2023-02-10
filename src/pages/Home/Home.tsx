import {Dashboard,DropdownLanguage,Text, QuestionnaireResultsModal} from "@components";



export const Home = () => {
    return (
        <div className="main">
            <Dashboard/>
            <QuestionnaireResultsModal/>
            <DropdownLanguage/>
            <Text/>
        </div>
    )
};

export default Home;