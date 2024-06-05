import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import Fraction from './Fraction'

describe('Fraction Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Fraction numerator={3} denominator={4} />)
    const numeratorElement = getByText('3')
    const divider = getByText('/')
    const denominatorElement = getByText('4')

    expect(numeratorElement).toBeInTheDocument()
    expect(divider).toBeInTheDocument()
    expect(denominatorElement).toBeInTheDocument()
  })
})
