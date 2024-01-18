import { act, render } from '@testing-library/react'
import TextCardLeft from './TextCardLeft'
import '@testing-library/jest-dom'

const mockProps = {
  body: 'body',
  header: 'header',
  backgroundImageURL: 'backgroundImageURL'
}

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('TextCardRight tests', () => {
  it('renders without input', () => {
    const { getByTestId } = render(<TextCardLeft />)
    expect(getByTestId('textCardLeft')).toBeInTheDocument()
  })

  it('can be scrolled without input', () => {
    const { getByTestId } = render(<TextCardLeft />)
    window.dispatchEvent(new Event('scroll'))
    expect(getByTestId('textCardLeft')).toBeInTheDocument()
  })

  it('renders with input', () => {
    const { getByTestId } = render(<TextCardLeft {...mockProps}>Text</TextCardLeft>)
    expect(getByTestId('textCardLeft')).toBeInTheDocument()
  })

  it('can be scrolled with input', () => {
    const { getByText } = render(<TextCardLeft {...mockProps}>Text</TextCardLeft>)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(getByText(mockProps.body)).toBeInTheDocument()
    expect(getByText(mockProps.header.slice(0, 1))).toBeInTheDocument()
  })
})
