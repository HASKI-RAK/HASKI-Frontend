import {TableILS, TableListK, GraphILS, GraphListK, ResultDescriptionILS} from "@components";


export const QuestionnaireResults = () => {
    return (
        <div>
            <GraphILS/>
            <TableILS />
            {ResultDescriptionILS(1,11,-1,7)}
            <GraphListK/>
            <TableListK />
        </div>
    )
};

export default QuestionnaireResults;