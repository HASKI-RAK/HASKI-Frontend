import { render } from '@testing-library/react'
import DashboardInfoDrawer from './DashboardInfoDrawer'

describe('DashboardInfoDrawer tests', () => {
  test('DashboardInfoDrawer open when student selected', () => {
    const dashboardInfoDrawer = render(<DashboardInfoDrawer isOpen={true} selectedDashboard="student" />)
    expect(dashboardInfoDrawer).toBeTruthy()
  })

  test('DashboardInfoDrawer open when student no selected', () => {
    const dashboardInfoDrawer = render(<DashboardInfoDrawer isOpen={true} selectedDashboard="tutor" />)
    expect(dashboardInfoDrawer).toBeTruthy()
  })

  test('DashboardInfoDrawer not open', () => {
    const dashboardInfoDrawer = render(<DashboardInfoDrawer isOpen={false} selectedDashboard="student" />)
    expect(dashboardInfoDrawer).toBeTruthy()
  })
})
