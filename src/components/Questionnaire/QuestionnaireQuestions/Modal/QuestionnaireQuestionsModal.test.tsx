import { QuestionnaireQuestionsModal } from '@components';
import {fireEvent, render} from '@testing-library/react';

const handleOpenILSShortModal = () => {
    return true;
};

describe('QuestionnaireQuestionsModal', () => {
    it('is open', () => {
        const { queryByText } = render(
                <QuestionnaireQuestionsModal open={true} handleClose={handleOpenILSShortModal}>
                    <div>Some Content</div>
                </QuestionnaireQuestionsModal>
        );

        // Assert that the container exists
        const contentElement = queryByText('Some Content')
        expect(contentElement).toBeInTheDocument
    });

    it('is not open', () => {
        const { queryByText } = render(
            <QuestionnaireQuestionsModal open={false} handleClose={handleOpenILSShortModal}>
                <div>Some Content</div>
            </QuestionnaireQuestionsModal>
        );

        const contentElement = queryByText('Some Content')

        // Assert that the container exists
        expect(contentElement).toBeNull();
    });

    it('is not open, by default', () => {
        const { queryByText } = render(
            <QuestionnaireQuestionsModal handleClose={handleOpenILSShortModal}>
                <div>Some Content</div>
            </QuestionnaireQuestionsModal>
        );

        const contentElement = queryByText('Some Content')

        // Assert that the container exists
        expect(contentElement).toBeNull();
    });

    it('close button can be clicked', () => {
        const { getByTestId } = render(
            <QuestionnaireQuestionsModal open={true} handleClose={handleOpenILSShortModal}>
                <div></div>
            </QuestionnaireQuestionsModal>
        );

        expect(getByTestId('QuestionnaireQuestionsModal-Close-Button')).toBeInTheDocument
        fireEvent.click(getByTestId('QuestionnaireQuestionsModal-Close-Button'))
    });
});
