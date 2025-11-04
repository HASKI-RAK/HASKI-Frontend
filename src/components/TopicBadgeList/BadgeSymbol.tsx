import { memo, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Tooltip } from '@common/components'
import { CalendarMonth, Done, DoneAll, Quiz, StarHalf } from '@common/icons'
import { BadgeVariant } from '@core'

type BadgeSymbolProps = {
  variant: BadgeVariant
  achieved: boolean
}

const badgeIcons: Record<BadgeVariant, ReactElement> = {
  perfect_one_exercise: <Done sx={{ color: 'white' }} />,
  complete_exercises: <DoneAll sx={{ color: 'white' }} />,
  perfect_self_evaluation: <Quiz sx={{ color: 'white' }} />,
  revisit_topic: <CalendarMonth sx={{ color: 'white' }} />,
  half_exercises: <StarHalf sx={{ color: 'white' }} />
}

const BadgeSymbol = ({ variant, achieved }: BadgeSymbolProps) => {
  const { t } = useTranslation()

  return (
    <Tooltip title={t(`components.BadgeSymbol.${variant}`)}>
      <Grid
        item
        sx={{
          opacity: achieved ? 1 : 0.3,
          borderRadius: '5rem',
          borderColor: 'darkgrey',
          borderStyle: 'dotted',
          padding: '0.1rem'
        }}>
        <Grid
          bgcolor={'darkgrey'}
          sx={{
            borderRadius: '10rem',
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1
          }}>
          {badgeIcons[variant]}
        </Grid>
      </Grid>
    </Tooltip>
  )
}

export default memo(BadgeSymbol)
