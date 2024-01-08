import { act, render, fireEvent } from '@testing-library/react'
import TextStepper from './TextStepper'
import { MemoryRouter } from 'react-router-dom'
import '@testing-library/jest-dom'

const mockProps = {
  body: ['body1', 'body2', 'body3'],
  header: 'header'
}

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('TextStepper tests', () => {
  it('renders without input', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <TextStepper />
      </MemoryRouter>
    )
    expect(getByTestId('textStepper')).toBeInTheDocument()
  })

  it('can be scrolled without input', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <TextStepper />
      </MemoryRouter>
    )
    window.dispatchEvent(new Event('scroll'))
    expect(getByTestId('textStepper')).toBeInTheDocument()
  })

  it('renders with input', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <TextStepper body={mockProps.body} header={mockProps.header} />
      </MemoryRouter>
    )
    expect(getByTestId('textStepper')).toBeInTheDocument()
  })

  it('can be scrolled with input', () => {
    const { getByText } = render(
      <MemoryRouter>
        <TextStepper body={mockProps.body} header={mockProps.header} />
      </MemoryRouter>
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(getByText(mockProps.body[0])).toBeInTheDocument()
    expect(getByText(mockProps.header.slice(0, 1))).toBeInTheDocument()
  })

  test('Step through all texts', () => {
    const { getByText, getAllByRole } = render(
      <MemoryRouter>
        <TextStepper body={mockProps.body} header={mockProps.header} />
      </MemoryRouter>
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(getByText(mockProps.body[0])).toBeInTheDocument()
    expect(getByText(mockProps.header.slice(0, 1))).toBeInTheDocument()

    // Steps to the right
    const buttons = getAllByRole('button')
    fireEvent.click(buttons[1])
    expect(getByText(mockProps.body[1])).toBeInTheDocument()
    fireEvent.click(buttons[1])
    expect(getByText(mockProps.body[2])).toBeInTheDocument()
    fireEvent.click(buttons[1])
    expect(getByText(mockProps.body[2])).toBeInTheDocument()

    // Steps to the left
    fireEvent.click(buttons[0])
    expect(getByText(mockProps.body[1])).toBeInTheDocument()
    fireEvent.click(buttons[0])
    expect(getByText(mockProps.body[0])).toBeInTheDocument()
  })
})
