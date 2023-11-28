import React from 'react'
import { render } from '@testing-library/react'
import MapPin from './MapPin'

describe('Test MapPin Component', () => {
  it('should render without errors', () => {
    const { getAllByTestId } = render(<MapPin />)
    expect(getAllByTestId('MapPin').length).toBe(1)
  })

  it('should contain a Pin and animated Pulse', () => {
    const { getAllByTestId } = render(<MapPin />)
    expect(getAllByTestId('Pin').length).toBe(1)
    expect(getAllByTestId('Pulse').length).toBe(1)
  })
})
