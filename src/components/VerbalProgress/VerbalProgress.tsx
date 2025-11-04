import { memo, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Node } from 'reactflow'
import { Grid, Typography } from '@common/components'

type VerbalProgressProps = {
  learningPathElements?: Node[]
  numberOfLearningPathElements: number
}

const VerbalProgress = ({
  learningPathElements: learningPathElementStatus,
  numberOfLearningPathElements
}: VerbalProgressProps) => {
  const [elementsDone, setElementsDone] = useState<number>(0)
  const { t } = useTranslation()

  useEffect(() => {
    if (!learningPathElementStatus) {
      setElementsDone(0)
      return
    }

    const doneCount = learningPathElementStatus.filter((status) => status.data.isDone === true).length
    setElementsDone(doneCount)
  }, [learningPathElementStatus])

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent={'center'}
      spacing={'1rem'}
      sx={{ position: 'relative', mt: '2rem', mb: '1rem' }}>
      <Typography variant="h6">
        {`${elementsDone} ${t('components.verbalProgress.outOf')} ${numberOfLearningPathElements}`}
      </Typography>
      <Typography variant="h6">{t('components.verbalProgress.completed')}</Typography>
    </Grid>
  )
}

export default memo(VerbalProgress)
