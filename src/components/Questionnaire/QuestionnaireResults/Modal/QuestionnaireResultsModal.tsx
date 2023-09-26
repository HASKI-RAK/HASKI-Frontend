import {useContext, useEffect, useState} from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useTranslation } from 'react-i18next'
import { Box, Button, Modal, Stepper, Step, StepButton, IconButton, Stack, Typography } from '@common/components'
import { ListItem } from '@mui/material'
import { usePersistedStore, useStore } from '@store'
import { ILS, ListK } from '@core'
import log from 'loglevel'

//Can not shorten import, tests fail to recognize i18n.use...
import GraphListK from '../Graph/GraphListK'
import TableListK from '../Table/TableListK'
import ResultDescriptionILS from '../Text/ResultDescriptionILS'
import ResultDescriptionListK from '../Text/ResultDescriptionListK'
import GraphILS from '../Graph/GraphILS'
import TableILS from '../Table/TableILS'
import {SnackbarContext} from "@services";

const styleButtonClose = {
  position: 'sticky',
  left: '99%',
  top: '0%',
  p: 2
}

type QuestionnaireResultsModalProps = {
  open?: boolean
  handleClose?: () => void
  activeStepForTesting?: number
}

const QuestionnaireResultsModal = ({
  open = false,
  handleClose,
  activeStepForTesting = 0
}: QuestionnaireResultsModalProps) => {
  const { t } = useTranslation()
  const fetchUser = usePersistedStore((state) => state.fetchUser)
  const fetchILS = useStore((state) => state.fetchILS)
  const fetchListK = useStore((state) => state.fetchListK)
  const { addSnackbar } = useContext(SnackbarContext)

  const steps = [
    t('components.Questionnaire.QuestionnaireResults.Text.ResultDescriptionILS.ILSResults'),
    t('components.Questionnaire.QuestionnaireResults.Text.ResultDescriptionILS.ListKResults')
  ]

  const [activeStep, setActiveStep] = useState(activeStepForTesting)
  const [ilsData, setILSData] = useState<ILS | undefined>(undefined) // Initialize with null
  const [listkData, setListKData] = useState<ListK | undefined>(undefined) // Initialize with null

  useEffect(() => {
    fetchUser()
      .then((user) => {
        fetchILS(user.settings.user_id, user.lms_user_id, user.id)
          .then((data) => {
            setILSData(data)
          })
          .catch((error) => {
            log.error(error)
          addSnackbar({
            message: t('ILS fetching error'),
            severity: 'error'
          })
          })
        fetchListK(user.settings.user_id, user.lms_user_id, user.id)
          .then((data) => {
            setListKData(data)
          })
          .catch((error) => {
            log.error(error)
          addSnackbar({
            message: t('ListK fetching error'),
            severity: 'error'
          })
          })
      })
      .catch((error) => {
        log.error(error)
      addSnackbar({
        message: t('User fetching error'),
        severity: 'error'
      })
      })
  }, [])

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  return (
      <Modal data-testid={'ILS and ListK Modal'} open={open} onClose={handleClose}>
          <Box sx={{
            position: 'absolute',
            left: '8%',
            right: '8%',
            top: '10%',
            overflow: 'auto',
            maxHeight: '83%',
            bgcolor: 'background.paper',
            border: (theme) =>'2px solid'+ theme.palette.secondary.dark,
            boxShadow: 24,
            p: 1
            }}>
            <IconButton
              color="primary"
              sx={styleButtonClose}
              onClick={handleClose}
              data-testid={'QuestionnaireResultsCloseButton'}>
              <CloseIcon />
            </IconButton>
            <Stepper nonLinear activeStep={activeStep}>
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
                    <Stack direction="column" justifyContent="space-between" alignItems="stretch" m={2} data-testid={'ActiveStepILS'}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <GraphILS data={ilsData} />
                          <TableILS data={ilsData} />
                        </Stack>
                        <ResultDescriptionILS data={ilsData} />
                    </Stack>
                ) : activeStep === 1 && listkData ? (
                    <Stack direction="column" justifyContent="space-between" alignItems="stretch" m={2} data-testid={'ActiveStepListK'}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                          <GraphListK data={listkData} />
                          <TableListK data={listkData} />
                        </Stack>
                        <ResultDescriptionListK data={listkData} />
                    </Stack>
                ) : activeStep === 0 ? (
                  <Stack alignItems="center">
                      <Typography variant="body2" data-testid={'ActiveStepILSNoData'}>
                        {t('components.Questionnaire.QuestionnaireResults.Modal.NoData.Part1')}
                        <ListItem sx={{ display: 'list-item' }}>
                            {t('components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSShort.Part1')}
                            {' '}
                            {t('components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSShort.Part2')}
                        </ListItem>
                        <ListItem sx={{ display: 'list-item' }}>
                            {t('components.Questionnaire.QuestionnaireResults.Modal.NoData.ILSLong.Part1')}
                            {' '}
                            {t('components.Questionnaire.QuestionnaireResults.Modal.NoData.Part2')}
                        </ListItem>
                      </Typography>
                  </Stack>
                ) : activeStep === 1 ? (
                  <Stack alignItems="center">
                      <Typography variant="body2" data-testid={'ActiveStepListKNoData'}>
                        {t('components.Questionnaire.QuestionnaireResults.Modal.NoData.Part1')}
                        <ListItem sx={{ display: 'list-item' }}>
                            {t('components.Questionnaire.QuestionnaireResults.Modal.NoData.ListK')}
                            {' '}
                            {t('components.Questionnaire.QuestionnaireResults.Modal.NoData.Part2')}
                        </ListItem>
                      </Typography>
                  </Stack>
                ) : null}
                <Stack direction="row" justifyContent="space-between" alignItems="center" m={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleBack}
                    data-testid="backButton"
                    disabled={activeStep === 0}>
                    {t('Back')}
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    data-testid="nextButton"
                    disabled={activeStep === 1}>
                    {t('Next')}
                  </Button>
                </Stack>
            </Stack>
          </Box>
      </Modal>
  )
}

export default QuestionnaireResultsModal
