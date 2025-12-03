import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext } from '@services'
import LearnerCharacteristics from '../LearnerCharacteristics/LearnerCharacteristics'

describe('[HASKI-REQ-0087] LearnerCharacteristics', () => {
  it('it renders correctly and buttons can be pressed', () => {
    const { getAllByRole } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <LearnerCharacteristics />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    const buttons = getAllByRole('button')
    expect(buttons).toHaveLength(5)
  })

  it('has working "more information" button', () => {
    const { getByTestId } = render(
      <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
        <MemoryRouter>
          <LearnerCharacteristics />
        </MemoryRouter>
      </AuthContext.Provider>
    )

    expect(getByTestId('MoreInformationQuestionnaireLink')).toBeInTheDocument()
    fireEvent.click(getByTestId('MoreInformationQuestionnaireLink'))
  })

  it('sets Loading false if student did not fill out ListK-questionnaire', async () => {
    mockServices.fetchListK.mockImplementationOnce(() => {
      return Promise.resolve({
        att: 0,
        characteristic_id: 0,
        cogn_str: 0,
        con: 0,
        crit_rev: 0,
        eff: 0,
        elab: 0,
        ext_res_mng_str: 0,
        goal_plan: 0,
        id: 0,
        int_res_mng_str: 0,
        lit_res: 0,
        lrn_env: 0,
        lrn_w_cls: 0,
        metacogn_str: 0,
        org: 0,
        reg: 0,
        rep: 0,
        time: 0
      })
    })

    const { getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
      </MemoryRouter>
    )
    await waitFor(async () => {
      fireEvent.click(getByTestId('nextButton'))
      expect(getByTestId('ActiveStepListKNoData')).toBeInTheDocument()
    })
  })

  it('sets Loading false if student did not fill out ILS-questionnaire', async () => {
    mockServices.fetchILS.mockImplementationOnce(() => {
      return Promise.resolve({
        characteristic_id: 1,
        id: 1,
        input_dimension: 'test',
        input_value: 0,
        perception_dimension: 'test',
        perception_value: 0,
        processing_dimension: 'test',
        processing_value: 0,
        understanding_dimension: 'test',
        understanding_value: 0
      })
    })

    const { getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
      </MemoryRouter>
    )
    await waitFor(async () => {
      expect(getByTestId('ActiveStepILSNoData')).toBeInTheDocument()
    })
  })

  test('More Information link can be opened', async () => {
    const openSpy = jest.spyOn(window, 'open')

    const { getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
      </MemoryRouter>
    )

    expect(getByTestId('MoreInformationQuestionnaireLink')).toBeInTheDocument()
    fireEvent.click(getByTestId('MoreInformationQuestionnaireLink'))
    expect(openSpy).toHaveBeenCalledWith('/files/Informationsdokument_ILS_ListK_HASKI.pdf', '_blank')
  })

  test('Modal without ILS data', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
      </MemoryRouter>
    )

    expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
  })

  test('Modal without ListK data', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
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
        <LearnerCharacteristics />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByTestId('ActiveStepILS')).toBeInTheDocument()
    })
  })

  test('Active Step List-K is shown, when listk data is given', async () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
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
        <LearnerCharacteristics />
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
        <LearnerCharacteristics />
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
        <LearnerCharacteristics />
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

  test('fetching ils data returns error', async () => {
    mockServices.fetchILS.mockImplementationOnce(() => {
      throw new Error('Backend down')
    })

    jest.spyOn(console, 'error').mockImplementation(() => {
      return
    })

    const { getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
      </MemoryRouter>
    )

    expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
  })

  test('fetching ils data failed returns snackbar', async () => {
    mockServices.fetchILS.mockImplementationOnce(async () => {
      throw new Error('id not found')
    })

    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics activeStepForTesting={1} />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.ResultDescriptionILS.ilsResults'))
      expect(queryByTestId('SkeletonList Element-0')).toBeFalsy()
    })
  })

  test('fetching ils data failed to fetch, returns loading', async () => {
    mockServices.fetchILS.mockImplementationOnce(async () => {
      throw new Error('Failed to fetch')
    })

    const { getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
      </MemoryRouter>
    )

    expect(getByTestId('SkeletonList Element-0')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-1')).toBeInTheDocument()
    expect(getByTestId('SkeletonList Element-2')).toBeInTheDocument()
  })

  test('fetching user on ListK step failed to fetch, returns loading', async () => {
    mockServices.fetchListK.mockImplementationOnce(() => {
      throw new Error('Failed to fetch')
    })

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
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
    mockServices.fetchListK.mockImplementationOnce(async () => {
      throw new Error('id not found')
    })

    const { getByText, queryByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
      </MemoryRouter>
    )

    await waitFor(() => {
      fireEvent.click(getByText('components.ResultDescriptionILS.listKResults'))
      expect(queryByTestId('SkeletonList Element-0')).toBeFalsy()
    })
  })

  test('fetching listk data failed to fetch, returns loading', async () => {
    mockServices.fetchListK.mockImplementationOnce(async () => {
      throw new Error('Failed to fetch')
    })

    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <LearnerCharacteristics />
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
    mockServices.fetchListK.mockImplementationOnce(() => {
      throw new Error('Error')
    })

    const { container } = render(
      <MemoryRouter>
        <LearnerCharacteristics activeStepForTesting={3} />
      </MemoryRouter>
    )
    expect(container.innerHTML).toContain('')
  })
})
