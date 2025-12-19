import DashboardTable from 'src/components/Dashboards/DashboardTable/DashboardTable'
import { DashboardLayout } from '@components'

const Scoreboard = () => {
  return <DashboardLayout left={<DashboardTable />} />
}

export default Scoreboard
