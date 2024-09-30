import '@testing-library/jest-dom'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { mockServices } from 'jest.setup'
import { MemoryRouter } from 'react-router-dom'
import { SnackbarContext } from '@services'
import AlgorithmSettingsModal from './AlgorithmSettingsModal'

const mockOptions = [
  { name: 'option1', description: 'description1', key: 'key1' },
  { name: 'option2', description: 'description2', key: 'key2' },
  { name: 'option3', description: 'description3', key: 'key3' }
]

const handleSave = jest.fn().mockName('handleSave')

describe('AlgorithmSettingsModal', () => {
  it('is displayed with all options', () => {
    const open = true
    const teacherAlgorithm = 'key1'
    const studentAlgorithm = 'key2'
    const { getByTestId, getByLabelText } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal
          teacherAlgorithm={teacherAlgorithm}
          studentAlgorithm={studentAlgorithm}
          isOpen={open}
          handleClose={jest.fn()}
          getIDs={{ courseID: 1, topicID: 0 }}
          options={mockOptions}
        />
      </MemoryRouter>
    )

    expect(getByTestId('algorithm-modal')).toBeInTheDocument()
    expect(getByLabelText('option1')).toBeInTheDocument()
    expect(getByLabelText('option2')).toBeInTheDocument()
    expect(getByLabelText('option3')).toBeInTheDocument()
    expect(getByTestId('teacher-icon')).toBeInTheDocument()
  })

  test('if the radio buttons work', () => {
    const open = true
    const { getByLabelText } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal
          isOpen={open}
          handleClose={jest.fn()}
          getIDs={{ courseID: 1, topicID: 0 }}
          options={mockOptions}
        />
      </MemoryRouter>
    )

    const button1 = getByLabelText('option1') as HTMLInputElement
    const button2 = getByLabelText('option2') as HTMLInputElement

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
        <AlgorithmSettingsModal isOpen={open} handleClose={handleClose} getIDs={{ courseID: 1, topicID: 0 }} />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('algorithm-modal-close-button'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  test('if the save button works', () => {
    console.log = jest.fn()
    const handleClose = jest.fn()
    const open = true
    const { getByTestId } = render(
      <MemoryRouter>
        <AlgorithmSettingsModal
          isOpen={open}
          handleClose={handleClose}
          getIDs={{ courseID: 1, topicID: 0 }}
          options={mockOptions}
        />
      </MemoryRouter>
    )

    fireEvent.click(getByTestId('algorithm-save-button'))

    expect(handleClose).toHaveBeenCalledTimes(1)
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
          getIDs={{ courseID: 1, topicID: 0 }}
          options={mockOptions}
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
          getIDs={{ courseID: 1, topicID: 0 }}
          options={mockOptions}
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
          <AlgorithmSettingsModal
            isOpen={open}
            handleClose={jest.fn()}
            getIDs={{ courseID: 1, topicID: 0 }}
            options={mockOptions}
          />
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
          <AlgorithmSettingsModal
            isOpen={open}
            handleClose={jest.fn()}
            getIDs={{ courseID: 1, topicID: 0 }}
            options={mockOptions}
          />
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
