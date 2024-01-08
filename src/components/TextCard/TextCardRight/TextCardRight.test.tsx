import { act, render } from '@testing-library/react'
import TextCardRight from './TextCardRight'
import '@testing-library/jest-dom'

const mockProps = {
  body: 'body',
  header: 'header'
}

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('TextCardRight tests', () => {
  it('renders without input', () => {
    const { getByTestId } = render(<TextCardRight />)
    expect(getByTestId('textCardRight')).toBeInTheDocument()
  })

  it('can be scrolled without input', () => {
    const { getByTestId } = render(<TextCardRight />)
    window.dispatchEvent(new Event('scroll'))
    expect(getByTestId('textCardRight')).toBeInTheDocument()
  })

  it('renders with input', () => {
    const { getByTestId } = render(
      <TextCardRight body={mockProps.body} header={mockProps.header}>
        Text
      </TextCardRight>
    )
    expect(getByTestId('textCardRight')).toBeInTheDocument()
  })

  it('can be scrolled with input', () => {
    const { getByText } = render(
      <TextCardRight body={mockProps.body} header={mockProps.header}>
        Text
      </TextCardRight>
    )
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(getByText(mockProps.body)).toBeInTheDocument()
    expect(getByText(mockProps.header.slice(0, 1))).toBeInTheDocument()
  })
})
