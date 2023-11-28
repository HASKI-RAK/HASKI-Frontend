import React from 'react'
import { act, render, screen } from '@testing-library/react'
import ProjectTeamCompetenciesCard from './ProjectTeamCompetenciesCard'
import '@testing-library/jest-dom'

jest.useFakeTimers()
jest.spyOn(global, 'setTimeout')

afterEach(() => {
  jest.clearAllTimers()
  jest.clearAllMocks()
})

describe('ProjectTeamCompetenciesCard Component', () => {
  const testId = 'projectTeamCompetenciesCard'
  const testProps = {
    header: 'header',
    children: <div data-testid="mockChild">Mock Child</div>
  }

  it('should render without errors', () => {
    render(<ProjectTeamCompetenciesCard {...testProps} />)
    expect(screen.getByTestId(testId)).toBeInTheDocument()
  })

  it('should display the correct header text when being scrolled', () => {
    const { getByText } = render(<ProjectTeamCompetenciesCard {...testProps} />)
    act(() => {
      window.dispatchEvent(new Event('scroll'))
      jest.runAllTimers()
    })
    expect(setTimeout).toHaveBeenCalledTimes(3)
    expect(getByText(testProps.header.slice(0, 1))).toBeInTheDocument()
  })

  it('should render the child element', () => {
    render(<ProjectTeamCompetenciesCard {...testProps} />)
    expect(screen.getByTestId('mockChild')).toBeInTheDocument()
  })
})
