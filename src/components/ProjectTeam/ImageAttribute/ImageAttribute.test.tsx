import ImageAttribute from './ImageAttribute'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

describe('Test ImageAttribute Component', () => {
  const testId = 'ImageAttribute'
  const mockImageAttributes = [
    { text: 'Image 1', url: 'https://picsum.photos/200' },
    { text: 'Image 2', url: '' }
  ]

  it('should render without errors', () => {
    const { getByTestId } = render(<ImageAttribute />)
    const imageAttribute = getByTestId(testId)
    expect(imageAttribute).toBeInTheDocument()
  })

  it('should display correct text content', () => {
    render(<ImageAttribute imageAttributes={mockImageAttributes} />)

    mockImageAttributes.forEach(({ text }) => {
      expect(screen.getByText(text)).toBeInTheDocument()
    })
  })

  it('should make links clickable or not if no valid url is provided', () => {
    render(<ImageAttribute imageAttributes={mockImageAttributes} />)

    const [link1, link2] = mockImageAttributes.map(({ text, url }) => {
      const link = screen.getByText(text)
      expect(link).toBeInTheDocument()
      return { link, url }
    })

    // Test that the first link is clickable
    expect(link1.link).toHaveAttribute('href', link1.url)
    fireEvent.click(link1.link)

    // Test that the second link is not clickable since its URL is empty
    expect(link2.link).not.toHaveAttribute('href')
  })
})
