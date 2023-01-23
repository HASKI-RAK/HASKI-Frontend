import {TableILS, TableListK, GraphILS, GraphListK, ResultDescriptionILS} from "@components";


export const QuestionnaireResults = () => {
    return (
        <div>
            <GraphILS/>
            <TableILS />
            {ResultDescriptionILS(1,1,7,7)}
            <GraphListK/>
            <TableListK />
        </div>
    )
};

export default QuestionnaireResults;