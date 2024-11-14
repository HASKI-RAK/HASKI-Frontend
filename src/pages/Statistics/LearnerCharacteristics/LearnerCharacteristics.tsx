import log from 'loglevel'
import { memo, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Button, Link, ListItem, Stack, Step, StepButton, Stepper, Typography } from '@common/components'
import {
  GraphILS,
  GraphListK,
  ResultDescriptionILS,
  ResultDescriptionListK,
  SkeletonList,
  TableILS,
  TableListK
} from '@components'
import { ILS, ListK } from '@core'
import { SnackbarContext, fetchILS, fetchListK } from '@services'
import { usePersistedStore } from '@store'

type QuestionnaireResultsILSLoadingProps = {
  t: (key: string) => string
  ilsLoading: boolean
}

type QuestionnaireResultsListKLoadingProps = {
  t: (key: string) => string
  listkLoading: boolean
}

type LearnerCharacteristicsProps = {
  open?: boolean
  handleClose?: () => void
  activeStepForTesting?: number
}

const QuestionnaireResultsListKLoading = memo(({ t, listkLoading }: QuestionnaireResultsListKLoadingProps) => {
  return (
    <>
      {listkLoading ? (
        <Box>
          <Stack spacing={1}>
            <SkeletonList />
          </Stack>
        </Box>
      ) : (
        <Stack alignItems="center">
          <Typography variant="body2" data-testid={'ActiveStepListKNoData'}>
            {t('components.LearnerCharacteristics.noData-1')}
            <ListItem sx={{ display: 'list-item' }}>
              {t('components.LearnerCharacteristics.listKNoData')} {t('components.LearnerCharacteristics.noData-2')}
            </ListItem>
          </Typography>
        </Stack>
      )}
    </>
  )
})
// eslint-disable-next-line immutable/no-mutation
QuestionnaireResultsListKLoading.displayName = 'QuestionnaireResultsListKLoading'

const QuestionnaireResultsILSLoading = memo(({ t, ilsLoading }: QuestionnaireResultsILSLoadingProps) => {
  return (
    <>
      {ilsLoading ? (
        <Box>
          <Stack spacing={1}>
            <SkeletonList />
          </Stack>
        </Box>
      ) : (
        <Stack alignItems="center">
          <Typography variant="body2" data-testid={'ActiveStepILSNoData'}>
            {t('components.LearnerCharacteristics.noData-1')}
            <ListItem sx={{ display: 'list-item' }}>
              {t('components.LearnerCharacteristics.ilsLongNoData-1')} {t('components.LearnerCharacteristics.noData-2')}
            </ListItem>
          </Typography>
        </Stack>
      )}
    </>
  )
})
// eslint-disable-next-line immutable/no-mutation
QuestionnaireResultsILSLoading.displayName = 'QuestionnaireResultsILSLoading'

const LearnerCharacteristics = memo(({ open = true, activeStepForTesting = 0 }: LearnerCharacteristicsProps) => {
  const { t } = useTranslation()
  const getUser = usePersistedStore((state) => state.getUser)
  const { addSnackbar } = useContext(SnackbarContext)
  const [ilsLoading, setILSLoading] = useState(true)
  const [listkLoading, setListKLoading] = useState(true)

  const steps = [t('components.ResultDescriptionILS.ilsResults'), t('components.ResultDescriptionILS.listKResults')]

  const [activeStep, setActiveStep] = useState(activeStepForTesting)
  const [ilsData, setILSData] = useState<ILS | undefined>(undefined) // Initialize with null
  const [listkData, setListKData] = useState<ListK | undefined>(undefined) // Initialize with null

  useEffect(() => {
    if (activeStep === 1 && open === true) {
      getUser()
        .then((user) => {
          return fetchListK(user.settings.user_id, user.lms_user_id, user.id)
            .then((data) => {
              if (data?.cogn_str == 0) return setListKLoading(false)
              setListKData(data)
            })
            .catch((error) => {
              log.error(t('error.fetchListK') + ' ' + error)
              if (error.message !== 'Failed to fetch') {
                setListKLoading(false)
              } else {
                addSnackbar({
                  message: t('error.fetchListK'),
                  severity: 'error'
                })
              }
            })
        })
        .catch((error) => {
          addSnackbar({
            message: t('error.getUser'),
            severity: 'error'
          })
          log.error(t('error.getUser') + ' ' + error)
        })
    }
  }, [activeStep, open])

  useEffect(() => {
    if (activeStep === 0 && open === true) {
      getUser()
        .then((user) => {
          return fetchILS(user.settings.user_id, user.lms_user_id, user.id)
            .then((data) => {
              if (data?.perception_value == 0) return setILSLoading(false)
              setILSData(data)
            })
            .catch((error) => {
              log.error(t('error.fetchILS') + ' ' + error)
              if (error.message !== 'Failed to fetch') {
                setILSLoading(false)
              } else {
                addSnackbar({
                  message: t('error.fetchILS'),
                  severity: 'error'
                })
              }
            })
        })
        .catch((error) => {
          log.error(t('error.getUser') + ' ' + error)
          addSnackbar({
            message: t('error.getUser'),
            severity: 'error'
          })
        })
    }
  }, [activeStep, open])

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  return (
    <Box
      sx={{
        mt: 5,
        p: 1
      }}>
      <Stepper nonLinear activeStep={activeStep} sx={{ pt: '1rem' }}>
        {steps.map((label, index) => (
          <Step key={label} data-testid={'StepperButton'}>
            <StepButton
              color="inherit"
              onClick={() => {
                setActiveStep(index)
              }}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Stack direction="column" justifyContent="space-between" alignItems="stretch">
        {activeStep === 0 && ilsData ? (
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            m={2}
            data-testid={'ActiveStepILS'}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <GraphILS data={ilsData} />
              <TableILS data={ilsData} />
            </Stack>
            <ResultDescriptionILS data={ilsData} />
          </Stack>
        ) : activeStep === 1 && listkData ? (
          <Stack
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            m={2}
            data-testid={'ActiveStepListK'}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <GraphListK data={listkData} />
              <TableListK data={listkData} />
            </Stack>
            <ResultDescriptionListK data={listkData} />
          </Stack>
        ) : activeStep === 0 ? (
          <QuestionnaireResultsILSLoading t={t} ilsLoading={ilsLoading} />
        ) : activeStep === 1 ? (
          <QuestionnaireResultsListKLoading t={t} listkLoading={listkLoading} />
        ) : null}
        <Stack direction="row" justifyContent="flex-start" m={2}>
          <br />
          <Link
            component="button"
            variant="inherit"
            data-testid={'MoreInformationQuestionnaireLink'}
            onClick={() => {
              window.open('/files/Informationsdokument_ILS_ListK_HASKI.pdf', '_blank')
            }}>
            <Typography variant="body2" gutterBottom>
              {t('components.LearnerCharacteristics.moreInformation')}
            </Typography>
          </Link>
        </Stack>
        <Stack direction="row" justifyContent="space-between" alignItems="center" m={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
            data-testid="backButton"
            disabled={activeStep === 0}>
            {t('appGlobal.back')}
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            data-testid="nextButton"
            disabled={activeStep === 1}>
            {t('appGlobal.next')}
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
})
// eslint-disable-next-line immutable/no-mutation
LearnerCharacteristics.displayName = 'LearnerCharacteristics'

export default LearnerCharacteristics
