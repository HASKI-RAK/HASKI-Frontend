import React, { memo } from 'react'
import IconButton from '@mui/material/IconButton'
import { styleButtonClose } from './QuestionnaireQuestionsTableStyle'
import CloseIcon from '@mui/icons-material/Close'
import { Stack, Typography } from '@mui/material'
import MobileStepper from '@mui/material/MobileStepper'
import { DefaultButton as Button } from '@common/components'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import SendIcon from '@mui/icons-material/Send'
import PropTypes from 'prop-types'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'

/**
 * @description
 * This is a collection of common components of ILS (Long and Short) and ListK questionnaires.
 */

// region memo props interfaces
interface MemoTableRowQuestionProps {
  question: string
}

interface MemoIconButtonProps {
  onClickClose: () => void
}

interface MemoButtonStackProps {
  activeStep: number
  handleNext: () => void
  handleBack: () => void
  steps: number
  idType: string
  disabled: boolean
}

interface MemoSendButtonProps {
  t: (key: string) => string
  handleSend: () => void
  isNextDisabled: boolean
  isValid: boolean
  idType: string
}
// endregion

// region memo react elements
export const MemoTableRowQuestion: React.FC<MemoTableRowQuestionProps> = memo(({ question }) => {
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

export const MemoIconButton: React.FC<MemoIconButtonProps> = memo(({ onClickClose }) => {
  return (
    <IconButton
      id={'QuestionnaireAnswersCloseButton'}
      color="primary"
      sx={styleButtonClose}
      onClick={onClickClose}
      data-testid={'QuestionnaireAnswersCloseButton'}>
      <CloseIcon />
    </IconButton>
  )
})

export const MemoButtonStack: React.FC<MemoButtonStackProps> = memo(
  ({ activeStep, handleNext, handleBack, steps, idType, disabled }) => {
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
              Next
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
              Back
            </Button>
          }
        />
      </Stack>
    )
  }
)

export const MemoSendButton: React.FC<MemoSendButtonProps> = memo(
  ({ handleSend, isNextDisabled, t, isValid, idType }) => {
    return (
      <>
        <Stack direction="column" justifyContent="flex-end" alignItems="center">
          {isValid ? (
            <div data-testid={'ActiveStepILS'}>
              <Button
                variant="contained"
                endIcon={<SendIcon />}
                color="primary"
                data-testid={`sendButton${idType}Questionnaire`}
                onClick={handleSend}
                disabled={isNextDisabled}
                sx={{ m: 2 }}>
                {t('Send')}
              </Button>
            </div>
          ) : undefined}
        </Stack>
      </>
    )
  }
)
//endregion

// region memo required propTypes
MemoTableRowQuestion.displayName = 'MemoTableRowQuestion'
MemoTableRowQuestion.propTypes = {
  question: PropTypes.string.isRequired
}

MemoIconButton.displayName = 'MemoIconButton'
MemoIconButton.propTypes = {
  onClickClose: PropTypes.func.isRequired
}

MemoButtonStack.displayName = 'MemoButtonStack'
MemoButtonStack.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  steps: PropTypes.number.isRequired,
  idType: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
}

MemoSendButton.displayName = 'MemoTableRow'
MemoSendButton.propTypes = {
  t: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  idType: PropTypes.string.isRequired
}
// endregion
