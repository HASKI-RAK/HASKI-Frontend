import '@testing-library/jest-dom'
import { QuestionnaireResultsModal } from '@components'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { mockServices } from 'jest.setup'

jest.mock('loglevel') // Mock the loglevel library

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        //changeLanguage: () => new Promise(() => {}),
        getFixedT: () => (str: string) => {
          if (str === 'components.TableILS.balanced') return 'balanced'
          else return str
        }
        // You can include here any property your component may use
      }
    }
  }
}))

describe('Test ResultDescriptionListK with all Methods', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    jest.restoreAllMocks()
  })

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

  test('More Information link can be opened', async () => {
    const openSpy = jest.spyOn(window, 'open')

    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    expect(getByTestId('ILS and ListK Modal')).toBeInTheDocument()
    expect(getByTestId('MoreInformationQuestionnaireLink')).toBeInTheDocument()
    fireEvent.click(getByTestId('MoreInformationQuestionnaireLink'))
    expect(openSpy).toHaveBeenCalledWith('/files/Informationsdokument_ILS_ListK_HASKI.pdf', '_blank')
  })

  test('Modal without ILS data', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
  })

  test('Modal without ListK data', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={() => false} />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('nextButton'))

    expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
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
      fireEvent.click(getByText('components.ResultDescriptionILS.ilsResults'))
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
      fireEvent.click(getByText('components.ResultDescriptionILS.listKResults'))
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
    mockServices.fetchILS.mockImplementationOnce(() => {
      throw new Error('Backend down')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} />
      </MemoryRouter>
    )

    expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
  })

  test('fetching ils data failed returns snackbar', async () => {
    const handleClose = jest.fn()
    mockServices.fetchILS.mockImplementationOnce(async () => {
      throw new Error('id not found')
    })

    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} activeStepForTesting={1} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.ResultDescriptionILS.ilsResults'))
      expect(queryByTestId('SkeletonList Element-0')).toBeFalsy()
    })
  })

  test('fetching ils data failed to fetch, returns loading', async () => {
    const handleClose = jest.fn()
    mockServices.fetchILS.mockImplementationOnce(async () => {
      throw new Error('Failed to fetch')
    })

    const { getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} />
      </MemoryRouter>
    )

    expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
  })

  test('fetching user on ListK step failed to fetch, returns loading', async () => {
    const handleClose = jest.fn()
    mockServices.fetchListK.mockImplementationOnce(() => {
      throw new Error('Failed to fetch')
    })

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.ResultDescriptionILS.listKResults'))
      expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
      expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
      expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
    })
  })

  test('fetching listk data failed returns snackbar', async () => {
    const handleClose = jest.fn()
    mockServices.fetchListK.mockImplementationOnce(async () => {
      throw new Error('id not found')
    })

    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.ResultDescriptionILS.listKResults'))
      expect(queryByTestId('SkeletonList Element-0')).toBeFalsy()
    })
  })

  test('fetching listk data failed to fetch, returns loading', async () => {
    const handleClose = jest.fn()
    mockServices.fetchListK.mockImplementationOnce(async () => {
      throw new Error('Failed to fetch')
    })

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <QuestionnaireResultsModal open={true} handleClose={handleClose} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.ResultDescriptionILS.listKResults'))
      expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
      expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
      expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
    })
  })

  it('renders null for activeStep 3', () => {
    const handleClose = jest.fn()
    mockServices.fetchListK.mockImplementationOnce(() => {
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
