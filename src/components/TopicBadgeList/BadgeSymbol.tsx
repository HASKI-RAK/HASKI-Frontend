import { memo, ReactElement } from 'react'
import { useTranslation } from 'react-i18next'
import { Grid, Tooltip } from '@common/components'
import { CalendarMonth, Done, DoneAll, Hiking, LocalLibrary } from '@common/icons'
import { BadgeVariant } from '@core'

type BadgeSymbolProps = {
  variant: BadgeVariant
  achieved: boolean
}

const badgeIcons: Record<BadgeVariant, ReactElement> = {
  perfect_one_exercise: <Done sx={{ color: 'background.default' }} />,
  complete_exercises: <DoneAll sx={{ color: 'background.default' }} />,
  perfect_self_evaluation: <LocalLibrary sx={{ color: 'background.default' }} />,
  revisit_topic: <CalendarMonth sx={{ color: 'background.default' }} />,
  half_exercises: <Hiking sx={{ color: 'background.default' }} />
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
          borderColor: 'text.primary',
          borderStyle: 'dotted',
          padding: '0.1rem'
        }}>
        <Grid
          bgcolor={'text.primary'}
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
