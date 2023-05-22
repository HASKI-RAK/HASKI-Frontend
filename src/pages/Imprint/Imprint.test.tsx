import { render } from '@testing-library/react'
import { Imprint } from '@pages'

describe('MainFrame', () => {
  it('should render the MainFrame', () => {
    const result = render(<Imprint />)
    expect(result).toBeTruthy()
  })
})
