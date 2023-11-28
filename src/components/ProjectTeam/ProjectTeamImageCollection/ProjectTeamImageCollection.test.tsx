import React from 'react'
import { render, screen } from '@testing-library/react'
import ImageCollection from './ProjectTeamImageCollection'

describe('ImageCollection Component', () => {
  const testImages = {
    img1Url: 'https://picsum.photos/600',
    img2Url: 'https://picsum.photos/600',
    img3Url: 'https://picsum.photos/600'
  }

  it('should not render without input', () => {
    const { getAllByTestId } = render(<ImageCollection />)
    expect(getAllByTestId('NoImageCollection').length).toBe(1)
  })

  it('should render without errors', () => {
    const { getAllByTestId } = render(<ImageCollection {...testImages} />)
    expect(getAllByTestId('ImageCollection').length).toBe(1)
  })

  it('should contain three images', () => {
    render(<ImageCollection {...testImages} />)
    const images = screen.getAllByRole('img')
    expect(images).toHaveLength(3)
  })

  it('should have 2 dividers', () => {
    const { getAllByTestId } = render(<ImageCollection {...testImages} />)
    expect(getAllByTestId('divider1').length).toBe(1)
    expect(getAllByTestId('divider2').length).toBe(1)
  })
})
