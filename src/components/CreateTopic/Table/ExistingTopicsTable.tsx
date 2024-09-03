import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, Typography } from '@common/components'
import { LearningPathTopic } from '@core'

type ExistingTopicsTableProps = {
  existingTopics: LearningPathTopic
}

const ExistingTopicsTable = memo(({ existingTopics }: ExistingTopicsTableProps) => {
  const { t } = useTranslation()
  return (
    <Grid container direction="column" alignItems="center" spacing={3}>
      <Grid item>
        <Typography variant="h6" sx={{ mt: '1rem' }}>
          {t('components.ExistingTopicsTable.title')}
        </Typography>
      </Grid>
      <Grid item container>
        <Paper sx={{ padding: '1rem', width: '95%' }}>
          <FormGroup>
            {existingTopics.topics.map((LmsTopic) => (
              <FormControlLabel
                control={<Checkbox disabled checked={true} />}
                label={<Typography>{LmsTopic.name}</Typography>}
                key={LmsTopic.name}
                id={'topic-modal-already-created-topics-' + LmsTopic.name}
              />
            ))}
          </FormGroup>
        </Paper>
      </Grid>
    </Grid>
  )
})
// eslint-disable-next-line immutable/no-mutation
ExistingTopicsTable.displayName = 'ExistingTopicsTable'
export default ExistingTopicsTable
