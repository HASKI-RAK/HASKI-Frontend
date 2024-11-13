import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarContext } from '@services'
import AlgorithmSettingsModal from './AlgorithmSettingsModal'


describe('AlgorithmSettingsModal', () => {
  it('is displayed with all options', async () => {
    const open = true
    const teacherAlgorithm = 'default'
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal
          teacherAlgorithm={teacherAlgorithm}
          isOpen={open}
          handleClose={jest.fn()}
        />
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(getByTestId('algorithm-modal')).toBeInTheDocument()
      expect(getByLabelText('Fixed Order')).toBeInTheDocument()
      expect(getByLabelText('ACO')).toBeInTheDocument()
      expect(getByLabelText('Genetic Algorithm')).toBeInTheDocument()
      expect(getByTestId('teacher-icon')).toBeInTheDocument()
    })
  })

  test('if the radio buttons work', () => {
    const open = true
    const { getByLabelText } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal isOpen={open} handleClose={jest.fn()} topicId={0} />
      </MemoryRouter>
    )

    const button1 = getByLabelText('Fixed Order') as HTMLInputElement
    const button2 = getByLabelText('Graf') as HTMLInputElement

    expect(button1.checked).toBe(true)
    expect(button2.checked).toBe(false)

    fireEvent.click(button2)
    expect(button1.checked).toBe(false)
    expect(button2.checked).toBe(true)
  })

  test('if the close button works', () => {
    const open = true
    const handleClose = jest.fn()
    const { getByTestId } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal isOpen={open} handleClose={handleClose} topicId={0} />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('algorithm-modal-close-button'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  test('if the save button works', async () => {
    console.log = jest.fn()
    const handleClose = jest.fn()
    const open = true
    const { getByTestId } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal isOpen={open} handleClose={handleClose} topicId={0} />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('algorithm-save-button'))
    await waitFor(() => {
      expect(handleClose).toHaveBeenCalledTimes(1)
    })
  })

  it('shows a snackbar with an error message, when fetching the new learning path fails and user is a student', async () => {
    mockServices.fetchUser = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Sam Student',
        role: 'student',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    const addSnackbarMock = jest.fn()
    const mockfetchLearningPathElement = jest.fn(() => Promise.reject(new Error('fetchLearningPathElement failed')))
    mockServices.fetchLearningPathElement.mockImplementationOnce(mockfetchLearningPathElement)
    const my_context = {
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: (a: any[]) => a,
      setSnackbarsSuccessInfo: (a: any) => a,
      addSnackbar: (a: any) => {
        addSnackbarMock(a)
        return a
      },
      updateSnackbar: (a: any) => a,
      removeSnackbar: (a: any) => a
    }

    const open = true
    const { getByTestId } = render(
      <SnackbarContext.Provider value={my_context}>
        <MemoryRouter>
          <AlgorithmSettingsModal isOpen={open} handleClose={jest.fn()} topicId={0} />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    fireEvent.click(getByTestId('algorithm-save-button'))

    await waitFor(() => {
      expect(mockfetchLearningPathElement).toHaveBeenCalledTimes(1)
      expect(addSnackbarMock.mock.lastCall[0].severity).toEqual('error')
    })
  })

  it('shows a snackbar with an error message, when fetching the new learning path fails and user is a teacher', async () => {
    mockServices.fetchUser = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Tom Teacher',
        role: 'teacher',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    const mockfetchLearningPathElement = jest.fn(() => Promise.reject(new Error('fetchLearningPathElement failed')))
    mockServices.fetchLearningPathElement.mockImplementationOnce(mockfetchLearningPathElement)

    const addSnackbarMock = jest.fn()
    const my_context = {
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: (a: any[]) => a,
      setSnackbarsSuccessInfo: (a: any) => a,
      addSnackbar: (a: any) => {
        addSnackbarMock(a)
        return a
      },
      updateSnackbar: (a: any) => a,
      removeSnackbar: (a: any) => a
    }

    const open = true
    const { getByTestId } = render(
      <SnackbarContext.Provider value={my_context}>
        <MemoryRouter>
          <AlgorithmSettingsModal isOpen={open} handleClose={jest.fn()} topicId={0} />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    fireEvent.click(getByTestId('algorithm-save-button'))

    await waitFor(() => {
      expect(mockfetchLearningPathElement).toHaveBeenCalledTimes(1)
      expect(addSnackbarMock.mock.lastCall[0].severity).toEqual('error')
    })
  })

  it('should post the selected algorithm for students', async () => {
    const mockObserverFunction = jest.fn()

    mockServices.fetchUser = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Sam Student',
        role: 'student',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )
    const open = true
    const { getByTestId } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal
          isOpen={open}
          changeObserver={mockObserverFunction}
          handleClose={jest.fn()}
          topicId={0}
        />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('algorithm-save-button'))

    await waitFor(() => {
      expect(mockServices.postStudentLpLeAlg).toHaveBeenCalledTimes(1)
    })
  })

  it('should post the selected algorithm for teachers', async () => {
    const mockObserverFunction = jest.fn()

    mockServices.fetchUser = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Tom Teacher',
        role: 'teacher',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )
    const open = true
    const { getByTestId } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal
          isOpen={open}
          changeObserver={mockObserverFunction}
          handleClose={jest.fn()}
          topicId={0}
        />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('algorithm-save-button'))

    await waitFor(() => {
      expect(mockServices.postTeacherLpLeAlg).toHaveBeenCalledTimes(1)
    })
  })

  it('should show an error message if the teacher post request fails', async () => {
    mockServices.fetchUser = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Tom Teacher',
        role: 'teacher',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    mockServices.postStudentLpLeAlg = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Error')))
    const addSnackbarMock = jest.fn()
    const my_context = {
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: (a: any[]) => a,
      setSnackbarsSuccessInfo: (a: any) => a,
      addSnackbar: (a: any) => {
        addSnackbarMock(a)
        return a
      },
      updateSnackbar: (a: any) => a,
      removeSnackbar: (a: any) => a
    }

    mockServices.postTeacherLpLeAlg = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Error')))

    const open = true

    const { getByTestId } = render(
      <SnackbarContext.Provider value={my_context}>
        <MemoryRouter>
          <AlgorithmSettingsModal isOpen={open} handleClose={jest.fn()} topicId={0} />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    fireEvent.click(getByTestId('algorithm-save-button'))

    await waitFor(() => {
      expect(mockServices.postTeacherLpLeAlg).toHaveBeenCalledTimes(1)
      expect(addSnackbarMock.mock.lastCall[0].severity).toEqual('error')
    })
  })

  it('should show an error message if the student post request fails', async () => {
    mockServices.fetchUser = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        id: 1,
        lms_user_id: 1,
        name: 'Sam Student',
        role: 'student',
        role_id: 1,
        settings: {
          id: 1,
          user_id: 1,
          pswd: '1234',
          theme: 'test'
        },
        university: 'TH-AB'
      })
    )

    mockServices.postStudentLpLeAlg = jest.fn().mockImplementationOnce(() => Promise.reject(new Error('Error')))
    const addSnackbarMock = jest.fn()
    const my_context = {
      snackbarsErrorWarning: [],
      snackbarsSuccessInfo: [],
      setSnackbarsErrorWarning: (a: any[]) => a,
      setSnackbarsSuccessInfo: (a: any) => a,
      addSnackbar: (a: any) => {
        addSnackbarMock(a)
        return a
      },
      updateSnackbar: (a: any) => a,
      removeSnackbar: (a: any) => a
    }

    const open = true
    const { getByTestId } = render(
      <SnackbarContext.Provider value={my_context}>
        <MemoryRouter>
          <AlgorithmSettingsModal isOpen={open} handleClose={jest.fn()} topicId={0} />
        </MemoryRouter>
      </SnackbarContext.Provider>
    )

    fireEvent.click(getByTestId('algorithm-save-button'))

    await waitFor(() => {
      expect(mockServices.postStudentLpLeAlg).toHaveBeenCalledTimes(1)
      expect(addSnackbarMock.mock.lastCall[0].severity).toEqual('error')
    })
  })
})
