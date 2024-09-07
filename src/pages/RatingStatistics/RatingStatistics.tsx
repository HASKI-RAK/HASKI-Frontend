import { MouseEvent, memo, useCallback, useContext, useState } from 'react'
import { Grid, ToggleButton, ToggleButtonGroup } from '@common/components'
import { LearningElementRatingDashboard, StudentRatingDashboard } from '@components'
import { AuthContext } from '@services'

const RatingStatistics = () => {
  const [selected, setSelected] = useState<string>('student')
  const { isAuth } = useContext(AuthContext)

  const handleChange = useCallback(
    (_: MouseEvent<HTMLElement>, newSelection: string | null) => {
      if (newSelection) setSelected(newSelection)
    },
    [setSelected]
  )

  return (
    <>
      {isAuth && (
        <Grid container direction="column" alignItems="center" mt={5}>
          <Grid item>
            <ToggleButtonGroup value={selected} onChange={handleChange} exclusive>
              <ToggleButton value="student">Student Rating</ToggleButton>
              <ToggleButton value="learningElement">Learning Element Rating</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid sx={{ mt: 5 }}>
            {selected === 'student' && <StudentRatingDashboard />}
            {selected === 'learningElement' && <LearningElementRatingDashboard />}
          </Grid>
        </Grid>
      )}
    </>
  )
}

export default memo(RatingStatistics)
