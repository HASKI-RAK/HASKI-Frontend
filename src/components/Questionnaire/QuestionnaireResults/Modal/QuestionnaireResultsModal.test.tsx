import '@testing-library/jest-dom'
import { QuestionnaireResultsModal } from '@components'
import { fireEvent, render, waitFor } from '@testing-library/react'
import * as React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { mockServices } from 'jest.setup'

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        //changeLanguage: () => new Promise(() => {}),
        getFixedT: () => (str: string) => {
          if (str === 'components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced') return 'balanced'
          else return str
        }
        // You can include here any property your component may use
      }
    }
  }
}))

describe('Test ResultDescriptionListK with all Methods', () => {
  test('Modal does not open with optional props', async () => {
    const { queryByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal />
      </MemoryRouter>
    )

    const modal = queryByTestId('ILS and ListK Modal')
    expect(modal).not.toBeInTheDocument()
  })

  test('Modal opens', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    expect(getByTestId('ILS and ListK Modal')).toBeInTheDocument()
  })

  test('Modal without ILS data', async () => {
    const { getByText } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    expect(
      getByText(
        'components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSShort.Part1' +
          ' ' +
          'components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSShort.Part2'
      )
    ).toBeInTheDocument()
    expect(
      getByText(
        'components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSLong.Part1' +
          ' ' +
          'components.Questionnaire.QuestionnaireResults.Modal.NoData.Part2'
      )
    ).toBeInTheDocument()
  })

  test('Modal without ListK data', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('nextButton'))

    expect(
      getByText(
        'components.Questionnaire.QuestionnaireResults.Modal.NoData.ListK' +
          ' ' +
          'components.Questionnaire.QuestionnaireResults.Modal.NoData.Part2'
      )
    ).toBeInTheDocument()
  })

  test('Active Step ILS is shown, when ils data is given', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByTestId('ActiveStepILS')).toBeInTheDocument()
    })
  })

  test('Active Step List-K is shown, when listk data is given', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByTestId('nextButton'))
      expect(getByTestId('ActiveStepListK')).toBeInTheDocument()
    })
  })

  test('Active Step ILS is shown', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.Questionnaire.QuestionnaireResults.Text.ResultDescriptionILS.ILSResults'))
      expect(getByTestId('ActiveStepILS')).toBeInTheDocument()
    })
  })

  test('Active Step List-K is shown', async () => {
    const { getByTestId, getByText } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.Questionnaire.QuestionnaireResults.Text.ResultDescriptionILS.ListKResults'))
      expect(getByTestId('ActiveStepListK')).toBeInTheDocument()
    })
  })

  test('Next and Back button work', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByTestId('nextButton'))
      expect(getByTestId('ActiveStepListK')).toBeInTheDocument()
      //cant click twice
      fireEvent.click(getByTestId('nextButton'))
      expect(getByTestId('ActiveStepListK')).toBeInTheDocument()

      fireEvent.click(getByTestId('backButton'))
      expect(getByTestId('ActiveStepILS')).toBeInTheDocument()
      //cant click twice
      fireEvent.click(getByTestId('backButton'))
      expect(getByTestId('ActiveStepILS')).toBeInTheDocument()
    })
  })

  test('close button works', async () => {
    const handleClose = jest.fn()

    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByTestId('ActiveStepILS')).toBeInTheDocument()
      const closeButton = getByTestId('QuestionnaireResultsCloseButton')
      fireEvent.click(closeButton)

      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  test('fetching ils data returns error', async () => {
    const handleClose = jest.fn()
    mockServices.getILS.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByText } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} />
      </MemoryRouter>
    )

    expect(
      getByText(
        'components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSShort.Part1' +
          ' ' +
          'components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSShort.Part2'
      )
    ).toBeInTheDocument()
    expect(
      getByText(
        'components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSLong.Part1' +
          ' ' +
          'components.Questionnaire.QuestionnaireResults.Modal.NoData.Part2'
      )
    ).toBeInTheDocument()
  })

  test('fetching listk data returns error', async () => {
    const handleClose = jest.fn()
    mockServices.getListK.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByText } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.Questionnaire.QuestionnaireResults.Text.ResultDescriptionILS.ListKResults'))
      expect(
        getByText(
          'components.Questionnaire.QuestionnaireResults.Modal.NoData.ListK' +
            ' ' +
            'components.Questionnaire.QuestionnaireResults.Modal.NoData.Part2'
        )
      ).toBeInTheDocument()
    })
  })

  it('renders null for activeStep 3', () => {
    const handleClose = jest.fn()
    mockServices.getListK.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    const { container } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} activeStepForTesting={3} />
      </MemoryRouter>
    )
    expect(container.innerHTML).toContain('')
  })
})
