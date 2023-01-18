import { DefaultButton as Button } from "@common/components";

function openResults() {
    window.location.href = "/results";
}

export const QuestionnaireButton = () =>{
    return (
        <Button
            variant="contained"
            color="primary"
            onClick={ () => openResults()}
        >
            Click me</Button>
    )
}
