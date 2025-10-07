import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CoverSheet from './CoverSheet'

describe('CoverSheet Component', () => {
  const defaultProps = {
    header: 'Welcome to HASKI',
    body: 'Empowering adaptive learning through AI.',
    imagePath: '/images/logo.png'
  }

  it('renders the header text correctly', () => {
    render(<CoverSheet {...defaultProps} />)
    expect(screen.getByText(defaultProps.header)).toBeInTheDocument()
  })

  it('renders the body text inside the Fade component', () => {
    render(<CoverSheet {...defaultProps} />)
    expect(screen.getByText(defaultProps.body)).toBeInTheDocument()
  })

  it('renders the Avatar with correct image source', () => {
    render(<CoverSheet {...defaultProps} />)
    const avatar = screen.getByRole('img')
    expect(avatar).toBeInTheDocument()
    expect(avatar).toHaveAttribute('src', '/images/logo.png')
  })

  it('does not render Fade when body is empty', () => {
    render(<CoverSheet {...defaultProps} body="" />)
    expect(screen.queryByText(defaultProps.body)).not.toBeInTheDocument()
  })
})
