import '@testing-library/jest-dom'
import { act, render } from '@testing-library/react'
import TextCardRight from './TextCardRight'

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

describe('[HASKI-REQ-0083] TextCardLeft tests', () => {
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
    const { getByTestId } = render(<TextCardRight {...mockProps}>Text</TextCardRight>)
    expect(getByTestId('textCardRight')).toBeInTheDocument()
  })

  it('can be scrolled with input', () => {
    const { getByText } = render(<TextCardRight {...mockProps}>Text</TextCardRight>)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })

    expect(setTimeout).toHaveBeenCalled()
    expect(getByText(mockProps.body)).toBeInTheDocument()
    expect(getByText(mockProps.header.slice(0, 1))).toBeInTheDocument()
  })
})
