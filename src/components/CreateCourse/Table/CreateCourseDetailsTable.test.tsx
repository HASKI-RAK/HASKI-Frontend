import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'
import dayjs, { Dayjs } from 'dayjs'
import { MemoryRouter } from 'react-router-dom'
import { CreateCourseDetailsTable } from '@components'
import { AuthContext } from '@services'

describe('CreateCourseDetailsTable', () => {
  const selectedCourse = {
    enddate: 1702166400,
    fullname: 'Kurs-1',
    id: 2,
    shortname: 'kurs',
    startdate: 1670630400,
    timecreated: 1670578503,
    timemodified: 1670578503
  }

  // Mock implementation for setDatePickerValue function
  const setDatePickerValueMock = jest.fn((value: Dayjs | null) => {
    // You can add any additional logic here if you want to check the value passed
    console.log('DatePicker value set to:', value ? value.format() : 'null')
  })

  it('renders the component', async () => {
    const { container, getByText, getAllByText } = render(
      <MemoryRouter>
        <AuthContext.Provider value={{ isAuth: true, setExpire: jest.fn(), logout: jest.fn() }}>
          <CreateCourseDetailsTable
            datePickerValue={dayjs(new Date())}
            remoteCourse={selectedCourse}
            setDatePickerValue={setDatePickerValueMock}
          />
        </AuthContext.Provider>
      </MemoryRouter>
    )

    await waitFor(() => {
      expect(container).toBeTruthy()
      expect(getByText('components.CreateCourseDetailsTable.courseName')).toBeInTheDocument()
      //Datetime-picker is twice in the document
      expect(getAllByText('components.CreateCourseDetailsTable.startDate')).toHaveLength(2)
    })
  })
})
