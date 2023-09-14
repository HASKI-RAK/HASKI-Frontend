import { useQuestionnaireAnswersILSStore } from '@services'
import { Button } from '@common/components'
import { fireEvent, render } from '@testing-library/react'

const DivElement = () => {
  const question_id = useQuestionnaireAnswersILSStore((state) => state.questionnaireAnswers)
  const setAnswer = useQuestionnaireAnswersILSStore((state) => state.setQuestionnaireAnswers)
  return (
    <>
      <div>The Question ID: {question_id?.AR_1_F1}</div>
      <Button
        data-testid="set Answer"
        onClick={() => {
          setAnswer?.('AR_1_F1', 'a')
        }}
      />
    </>
  )
}

describe('zustand test', () => {
  test('click set Question Answer', () => {
    const divelement = render(<DivElement />)
    const button = divelement.getByTestId('set Answer')
    fireEvent.click(button)

    expect(divelement.getByText('The Question ID: a')).toBeTruthy()
  })
})
