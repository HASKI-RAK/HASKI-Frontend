import '@testing-library/jest-dom'
import { render, renderHook } from '@testing-library/react'
import { useContext } from 'react'
import { Typography } from '@common/components'
import RoleContext, { RoleContextType } from './RoleContext'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('[HASKI-REQ-0090] Test Rolecontext', () => {
  // render custom component
  const TestComponent = () => {
    const context = useContext(RoleContext)
    return (
      <>
        {context.isStudentRole ? (
          <Typography>Your are a student</Typography>
        ) : context.isCourseCreatorRole ? (
          <Typography>Your are a course creator</Typography>
        ) : (
          <Typography>You have no role</Typography>
        )}
      </>
    )
  }
  const studentContext = {
    isStudentRole: true,
    isCourseCreatorRole: false
  } as RoleContextType

  const courseCreatorContext = {
    isStudentRole: false,
    isCourseCreatorRole: true
  } as RoleContextType

  it('student role, should render text', () => {
    const renderResult = render(
      <RoleContext.Provider value={studentContext}>
        <TestComponent />
      </RoleContext.Provider>
    )
    expect(renderResult.getByText('Your are a student')).toBeInTheDocument()
  })

  it('course creator role, should render text', () => {
    const renderResult = render(
      <RoleContext.Provider value={courseCreatorContext}>
        <TestComponent />
      </RoleContext.Provider>
    )
    expect(renderResult.getByText('Your are a course creator')).toBeInTheDocument()
  })

  it('should return the default props of RoleContext', () => {
    const context = renderHook(() => useContext(RoleContext))
    expect(context.result.current).toMatchObject({
      isStudentRole: false,
      isCourseCreatorRole: false
    })
  })
})
