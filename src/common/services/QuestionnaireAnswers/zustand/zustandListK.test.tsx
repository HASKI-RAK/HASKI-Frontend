import {useQuestionnaireAnswersListKStore} from "@services";
import {DefaultButton as Button} from "@common/components";
import {fireEvent, render} from "@testing-library/react";

const DivElement = () => {
    const question_id = useQuestionnaireAnswersListKStore((state) => state.questionnaireAnswers)
    const setAnswer = useQuestionnaireAnswersListKStore((state) => state.setQuestionnaireAnswers)
    return (
        <>
            <div>
                The Question ID: {" "} {question_id?.Org1_F1}

            </div>
            <Button
                data-testid="set Answer"
                onClick={() => {
                    setAnswer?.("Org1_F1", "1");
                }}
            />
        </>
    )
}

describe("zustand test", () => {
    test("click set Question Answer", () => {

        const divelement = render(<DivElement/>);
        const button = divelement.getByTestId("set Answer");
        fireEvent.click(button);

        expect(divelement.getByText("The Question ID: 1")).toBeTruthy();
    });
});