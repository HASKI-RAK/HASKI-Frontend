import { fireEvent, render, waitFor } from '@testing-library/react'
import BorderedPaper from './BorderedPaper'
import '@testing-library/jest-dom'

describe('BorderedPaper', () => {
  it('renders correctly without props', () => {
    const borderedPaper = render(<BorderedPaper />)
    expect(borderedPaper).toBeTruthy()
  })

  it('renders correctly with props', async () => {
    const { getByText } = render(<BorderedPaper color='black' isAnimated={true} tooltip='tooltip'>{'children'}</BorderedPaper>)
    expect(getByText('children')).toBeInTheDocument()

    fireEvent.mouseOver(getByText('children'))
    await waitFor(() => {
      expect(getByText('tooltip')).toBeInTheDocument()
    })
  })
})
