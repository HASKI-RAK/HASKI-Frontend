import { act, render, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import TextStepper from './TextStepper'
import '@testing-library/jest-dom'

const mockProps = {
  body: [
    <div key={'body1'} data-testid="body1">
      body1
    </div>,
    <div key={'body2'} data-testid="body2">
      body2
    </div>,
    <div key={'body3'} data-testid="body3">
      body3
    </div>
  ],
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
        <TextStepper header={mockProps.header}>{mockProps.body}</TextStepper>
      </MemoryRouter>
    )
    expect(getByTestId('textStepper')).toBeInTheDocument()
  })

  it('can be scrolled with input', () => {
    const { getByText, getByTestId } = render(
      <MemoryRouter>
        <TextStepper header={mockProps.header}>{mockProps.body}</TextStepper>
      </MemoryRouter>
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(getByTestId('body1')).toBeInTheDocument()
    expect(getByText(mockProps.header.slice(0, 1))).toBeInTheDocument()
  })

  test('Step through all texts', () => {
    const { getByText, getAllByRole, getByTestId } = render(
      <MemoryRouter>
        <TextStepper header={mockProps.header}>{mockProps.body}</TextStepper>
      </MemoryRouter>
    )

    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(getByTestId('body1')).toBeInTheDocument()
    expect(getByText(mockProps.header.slice(0, 1))).toBeInTheDocument()

    // Steps to the right
    const buttons = getAllByRole('button')
    fireEvent.click(buttons[1])
    expect(getByTestId('body2')).toBeInTheDocument()
    fireEvent.click(buttons[1])
    expect(getByTestId('body3')).toBeInTheDocument()
    fireEvent.click(buttons[1])
    expect(getByTestId('body3')).toBeInTheDocument()

    // Steps to the left
    fireEvent.click(buttons[0])
    expect(getByTestId('body2')).toBeInTheDocument()
    fireEvent.click(buttons[0])
    expect(getByTestId('body1')).toBeInTheDocument()
  })
})
