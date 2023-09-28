import React, { memo } from 'react'
import { Stack, Typography, MobileStepper, Button, TableRow, TableCell, CircularProgress } from '@common/components'
import { KeyboardArrowLeft, KeyboardArrowRight } from '@common/icons'
import { useTranslation } from 'react-i18next'

/**
 * # TableCommonComponents
 *
 * @description
 * This is a collection of common components of ILS (Long and Short) and ListK questionnaires.
 */

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

export const MemoTableRowQuestion = memo(({ question }: { question: string }) => {
  return (
    <TableRow>
      <TableCell
        align="left"
        sx={{
          backgroundColor: (theme) => theme.palette.primary.dark,
          color: (theme) => theme.palette.secondary.main
        }}>
        <Typography variant={'h5'}>{question}</Typography>
      </TableCell>
    </TableRow>
  )
})
// eslint-disable-next-line immutable/no-mutation
MemoTableRowQuestion.displayName = 'MemoTableRowQuestion'

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
            variant="contained"
            color="primary"
            onClick={handleNext}
            data-testid={`nextButton${idType}Questionnaire`}
            disabled={disabled}>
            {t('Next')}
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button
            variant="contained"
            color="primary"
            onClick={handleBack}
            data-testid={`backButton${idType}Questionnaire`}
            disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            {t('Back')}
          </Button>
        }
      />
    </Stack>
  )
})
// eslint-disable-next-line immutable/no-mutation
ButtonStack.displayName = 'MemoButtonStack'

export const SendButton = memo(
  ({ handleSend, isNextDisabled, t, isValid, idType, isSending, sendSuccess }: SendButtonProps) => {
    return (
      <Button
        data-testid={`sendButton${idType}Questionnaire`}
        variant="contained"
        color="primary"
        onClick={handleSend}
        disabled={isNextDisabled || !isValid || isSending || sendSuccess}
        sx={{ m: 2 }}>
        {isSending ? <CircularProgress size={24} /> : t('send')}
      </Button>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
SendButton.displayName = 'MemoSendButton'
