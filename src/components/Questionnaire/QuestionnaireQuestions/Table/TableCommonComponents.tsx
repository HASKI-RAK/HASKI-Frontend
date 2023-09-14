import React, { memo } from 'react'
import {
  Stack,
  Typography,
  MobileStepper,
  Button
} from '@common/components'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import PropTypes from 'prop-types'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import { CircularProgress } from '@mui/material'

/**
 * # TableCommonComponents
 *
 * @description
 * This is a collection of common components of ILS (Long and Short) and ListK questionnaires.
 */

// region memo props interfaces
interface MemoTableRowQuestionProps {
  question: string
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
  isSending: boolean
  sendSuccess: boolean
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
  ({ handleSend, isNextDisabled, t, isValid, idType, isSending, sendSuccess }) => {
    return (
      <div>
        <Button
          data-testid={`sendButton${idType}Questionnaire`}
          variant="contained"
          color="primary"
          onClick={handleSend}
          disabled={isNextDisabled || !isValid || isSending || sendSuccess}
          sx={{ m: 2 }}>
          {isSending ? <CircularProgress size={24} /> : t('send')}
        </Button>
      </div>
    )
  }
)
//endregion

// region memo required propTypes
MemoTableRowQuestion.displayName = 'MemoTableRowQuestion'
MemoTableRowQuestion.propTypes = {
  question: PropTypes.string.isRequired
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

MemoSendButton.displayName = 'MemoSendButton'
MemoSendButton.propTypes = {
  t: PropTypes.func.isRequired,
  handleSend: PropTypes.func.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
  isValid: PropTypes.bool.isRequired,
  idType: PropTypes.string.isRequired,
  isSending: PropTypes.bool.isRequired,
  sendSuccess: PropTypes.bool.isRequired
}
// endregion
