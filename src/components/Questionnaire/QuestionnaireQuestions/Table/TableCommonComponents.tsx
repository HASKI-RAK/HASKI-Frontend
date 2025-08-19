import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { Button, CircularProgress, MobileStepper, Stack, TableCell, TableRow, Typography } from '@common/components'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@common/icons'

type ButtonStackProps = {
  activeStep: number
  handleNext: () => void
  handleBack: () => void
  steps: number
  idType: string
  disabled: boolean
}

type SendButtonProps = {
  t: (key: string) => string
  handleSend: () => void
  isNextDisabled: boolean
  isValid: boolean
  idType: string
  isSending: boolean
  sendSuccess: boolean
}

/**
 * @param question - The question to be displayed in this row
 */
export const MemoTableRowQuestion = memo(({ question }: { question: string }) => {
  return (
    <TableRow>
      <TableCell
        align="left"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.dark
        }}>
        <Typography variant={'h5'} color={(theme) => theme.palette.secondary.contrastText}>
          {question}
        </Typography>
      </TableCell>
    </TableRow>
  )
})
// eslint-disable-next-line immutable/no-mutation
MemoTableRowQuestion.displayName = 'MemoTableRowQuestion'

/**
 * @param activeStep - The current active step
 * @param handleNext - The function to handle the next step
 * @param handleBack - The function to handle the previous step
 * @param steps - The number of steps
 * @param idType - The id of the questionnaire for testing purposes
 * @param disabled - Whether the next button should be disabled
 */
export const ButtonStack = memo(({ activeStep, handleNext, handleBack, steps, idType, disabled }: ButtonStackProps) => {
  const { t } = useTranslation()
  return (
    <Stack direction="row" justifyContent="space-around" alignItems="center">
      <MobileStepper
        variant="progress"
        steps={steps}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: '50%', flexGrow: 1, align: 'center' }}
        nextButton={
          <Button
            id="next-button"
            sx={{
              '&.Mui-disabled': {
                border: (theme) => theme.palette.primary.main
              }
            }}
            variant="contained"
            color="primary"
            onClick={handleNext}
            data-testid={`nextButton${idType}Questionnaire`}
            disabled={disabled}>
            {t('appGlobal.next')}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            id="back-button"
            sx={{
              '&.Mui-disabled': {
                border: (theme) => theme.palette.primary.main
              }
            }}
            variant="contained"
            color="primary"
            onClick={handleBack}
            data-testid={`backButton${idType}Questionnaire`}
            disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            {t('appGlobal.back')}
          </Button>
        }
      />
    </Stack>
  )
})
// eslint-disable-next-line immutable/no-mutation
ButtonStack.displayName = 'MemoButtonStack'

/**
 * @param t - The translation function
 * @param handleSend - The function to handle the send button
 * @param isNextDisabled - Whether the next button is disabled (should be disabled to enable send button)
 * @param isValid - Whether the current step is valid for sending
 * @param idType - The id of the questionnaire for testing purposes
 * @param isSending - Whether the function is currently sending the data
 * @param sendSuccess - Whether the function has successfully sent the data
 */
export const SendButton = memo(
  ({ handleSend, isNextDisabled, t, isValid, idType, isSending, sendSuccess }: SendButtonProps) => {
    return (
      <Button
        id="questionnaire-send-button"
        data-testid={`sendButton${idType}Questionnaire`}
        variant="contained"
        color="primary"
        onClick={handleSend}
        disabled={isNextDisabled || !isValid || isSending || sendSuccess}
        sx={{
          m: 2,
          '&.Mui-disabled': {
            border: (theme) => theme.palette.primary.main
          }
        }}>
        {isSending ? <CircularProgress size={24} /> : t('appGlobal.send')}
      </Button>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
SendButton.displayName = 'MemoSendButton'

export const StartButton = memo(({ handleNext }: { handleNext: () => void }) => {
  return (
    <Button
      data-testid={`StartButtonQuestionnaire`}
      variant="contained"
      color="primary"
      onClick={handleNext}
      sx={{ mb: '2rem', width: '20rem' }}>
      {'Start'}
    </Button>
  )
})
// eslint-disable-next-line immutable/no-mutation
StartButton.displayName = 'MemoStartButton'
