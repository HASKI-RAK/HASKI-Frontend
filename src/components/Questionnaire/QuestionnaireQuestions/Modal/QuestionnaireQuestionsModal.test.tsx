import { fireEvent, render } from '@testing-library/react'
import { MemoryHistory } from 'history'
import { MemoryRouter } from 'react-router-dom'
import { QuestionnaireQuestionsModal } from '@components'

const handleOpenILSShortModal = () => {
  return true
}

describe('[HASKI-REQ-0007] QuestionnaireQuestionsModal', () => {
  it('is open', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <QuestionnaireQuestionsModal open={true} handleClose={handleOpenILSShortModal}>
          <div>Some Content</div>
        </QuestionnaireQuestionsModal>
      </MemoryRouter>
    )

    // Assert that the container exists
    const contentElement = queryByText('Some Content')
    expect(contentElement).toBeInTheDocument
  })

  it('is not open', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <QuestionnaireQuestionsModal open={false} handleClose={handleOpenILSShortModal}>
          <div>Some Content</div>
        </QuestionnaireQuestionsModal>
      </MemoryRouter>
    )

    const contentElement = queryByText('Some Content')

    // Assert that the container exists
    expect(contentElement).toBeNull()
  })

  it('is not open, by default', () => {
    const { queryByText } = render(
      <MemoryRouter>
        <QuestionnaireQuestionsModal handleClose={handleOpenILSShortModal}>
          <div>Some Content</div>
        </QuestionnaireQuestionsModal>
      </MemoryRouter>
    )

    const contentElement = queryByText('Some Content')

    // Assert that the container exists
    expect(contentElement).toBeNull()
  })

  it('close button can be clicked', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireQuestionsModal open={true} handleClose={handleOpenILSShortModal}>
          <div></div>
        </QuestionnaireQuestionsModal>
      </MemoryRouter>
    )

    expect(getByTestId('QuestionnaireQuestionsModal-Close-Button')).toBeInTheDocument
    fireEvent.click(getByTestId('QuestionnaireQuestionsModal-Close-Button'))
  })
})
