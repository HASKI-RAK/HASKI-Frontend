import { memo } from 'react'
import { Box } from '@common/components'
import PieChart from './PieChart'
import DatePickerForChart from './DatePickerForChart'
import AnzahlVersucheBarChart from './AnzahlVersucheBarChart'

const ExampleGraphs = () => {
  return (
    <Box sx={{ ml: 10, mr: 10, mt: 5 }}>
      <Box sx={{ height: '500px', width: '50%', position: 'relative' }}>
        <PieChart />
        <DatePickerForChart />
        <AnzahlVersucheBarChart />
      </Box>
    </Box>
  )
}

export default memo(ExampleGraphs)
