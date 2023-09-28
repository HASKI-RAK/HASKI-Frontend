import { Table, TableBody, TableContainer, TableRow, Paper, Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography, TableCell } from '@common/components'
import { useTranslation } from 'react-i18next'
import React, { memo, useCallback, useContext, useMemo, useState } from 'react'
import { SnackbarContext } from '@services'
import { ButtonStack, SendButton, MemoTableRowQuestion } from './TableCommonComponents'
import useHandleSend from './Questions.hooks'

/**
 * @description
 * This component is used to display the questionnaire questions for the ILS questionnaire.
 * The questions are displayed in a table with two columns.
 * The first column contains the question and the second column contains the two possible answers.
 * The answers are displayed as radio buttons.
 * The user can select one of the two answers.
 * The user can navigate between the questions using the stepper at the bottom of the page.
 * The user can submit the answers at the end of the Questionnaire.
 *
 * if boolean ilsLong is true, the long version of the questionnaire is displayed, else the short version is displayed.
 * The long version contains 44, and the short version contains 20 questions.
 */

interface MemoTableRowAnswersProps {
  t: (key: string) => string
  activeStep: number
  answerIndex: number
  isIlsLong: boolean
  radioButtonGroup: string
  handleRadioChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    ilsStep: { question: string; questionLabel: string; answer1: string; answer2: string }
  ) => void
  setRadioButtonGroup: (value: ((prevState: string) => string) | string) => void
  stepsILSData: { question: string; questionLabel: string; answer1: string; answer2: string }[][]
}

const MemoTableRowAnswers = memo(
  ({
    activeStep,
    handleRadioChange,
    t,
    radioButtonGroup,
    setRadioButtonGroup,
    answerIndex,
    isIlsLong,
    stepsILSData
  }: MemoTableRowAnswersProps) => {
    const ilsArray = stepsILSData
    return (
      <TableRow>
        <TableCell>
          <RadioGroup
            value={radioButtonGroup}
            data-testid={`ils${isIlsLong ? 'Long' : 'Short'}QuestionnaireILSButtonGroup${answerIndex + 1}`}
            onChange={(e) => {
              setRadioButtonGroup(e.target.value)
              handleRadioChange(e, ilsArray[activeStep][answerIndex])
            }}>
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              spacing={0}
              divider={<Divider orientation="horizontal" flexItem />}>
              <FormControlLabel
                value={ilsArray[activeStep][answerIndex].answer1}
                control={<Radio />}
                label={<Typography variant={'h6'}>{t(ilsArray[activeStep][answerIndex].answer1)}</Typography>}
              />
              <FormControlLabel
                value={ilsArray[activeStep][answerIndex].answer2}
                control={<Radio />}
                label={<Typography variant={'h6'}>{t(ilsArray[activeStep][answerIndex].answer2)}</Typography>}
              />
            </Stack>
          </RadioGroup>
        </TableCell>
      </TableRow>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
MemoTableRowAnswers.displayName = 'MemoTableRowAnswers'

type TableILSQuestionsProps = {
  ilsLong: boolean
  successSend: boolean
  setSuccessSend: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableILSQuestions = memo(({ ilsLong, successSend, setSuccessSend }: TableILSQuestionsProps) => {
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState([{ question_id: '', answer: '' }])
  const { addSnackbar } = useContext(SnackbarContext)
  const { sendAnswers, isSending } = useHandleSend(questionnaireAnswers, true)

  const { t } = useTranslation()

  const stepsILSData = useMemo(() => {
    return [
      ...(t<string>(ilsLong ? 'components.Questionnaire.QuestionnaireQuestions.Table.ILSLongQuestions' : 'components.Questionnaire.QuestionnaireQuestions.Table.ILSShortQuestions', {
        returnObjects: true,
      }) as { question: string; questionLabel: string; answer1: string; answer2: string }[][]),
    ];
  }, []);

  const [activeStep, setActiveStep] = useState(0)
  const [radioButtonGroup1, setRadioButtonGroup1] = useState('')
  const [radioButtonGroup2, setRadioButtonGroup2] = useState('')
  const [radioButtonGroup3, setRadioButtonGroup3] = useState('')
  const [radioButtonGroup4, setRadioButtonGroup4] = useState('')

  const radioButtonGroupArray = [radioButtonGroup1, radioButtonGroup2, radioButtonGroup3, radioButtonGroup4]
  const setRadioButtonGroupArray = [
    setRadioButtonGroup1,
    setRadioButtonGroup2,
    setRadioButtonGroup3,
    setRadioButtonGroup4
  ]

  //if all radio buttons are selected, the next button is enabled
  // (They are reset to their previous Value when the user goes back)
  const isNextDisabled = !radioButtonGroup1 || !radioButtonGroup2 || !radioButtonGroup3 || !radioButtonGroup4

  const setRadioButtonGroups = (newActiveStep: number) => {
    const stepsILS = stepsILSData

    setRadioButtonGroup1(setRadioButtonValue(stepsILS[newActiveStep][0]))
    setRadioButtonGroup2(setRadioButtonValue(stepsILS[newActiveStep][1]))
    setRadioButtonGroup3(setRadioButtonValue(stepsILS[newActiveStep][2]))
    setRadioButtonGroup4(setRadioButtonValue(stepsILS[newActiveStep][3]))
  }

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setRadioButtonGroups(activeStep + 1)
  }, [activeStep])

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setRadioButtonGroups(activeStep - 1)
  }, [activeStep])

  const handleSendClick = () => {
    sendAnswers().then((res) => {
      if (res) {
        addSnackbar({
          message: t('Data send successfull'),
          severity: 'success',
          autoHideDuration: 5000
        })
        setSuccessSend(true)
      } else {
        addSnackbar({
          message: t('Data send unsuccessfull'),
          severity: 'error',
          autoHideDuration: 5000
        })
        setSuccessSend(false)
      }
    })
  }

  const setRadioButtonValue = useMemo(
    () =>
      (ilsStep: { question: string; questionLabel: string; answer1: string; answer2: string }): string => {
        // if the question is already answered, the answer is set to the value of the radio button, else radio button is not set
        const answerType = questionnaireAnswers.find((answer) => answer.question_id === ilsStep.questionLabel)?.answer
        return answerType === 'a' ? ilsStep.answer1 : answerType === 'b' ? ilsStep.answer2 : ''
      },
    [questionnaireAnswers]
  )

  const handleRadioChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      ilsStep: { question: string; questionLabel: string; answer1: string; answer2: string }
    ): void => {
      const radioButtonOptions = [ilsStep.answer1, ilsStep.answer2]
      const selectedAnswer = radioButtonOptions.indexOf(event.target.value) === 0 ? 'a' : 'b'

      setQuestionnaireAnswers((prevState) => [
        ...prevState,
        { question_id: ilsStep.questionLabel, answer: selectedAnswer.toString() }
      ])
    },
    [setQuestionnaireAnswers]
  )

  const ilsArray = stepsILSData

  return (
    <Box>
      <Stack direction="column" justifyContent="space-around" alignItems="center">
        <Typography variant="h6" component={Paper} sx={{ m: 2, p: 2}}>
          {ilsLong ? "ILS-Long Questionnaire" : "ILS-Short Questionnaire"}
        </Typography>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
        <ButtonStack
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={ilsLong ? 11 : 5}
          idType={'ILS'}
          disabled={ilsLong ? activeStep === 10 || isNextDisabled : activeStep === 4 || isNextDisabled}
        />
        <Stack direction="column" justifyContent="space-around" alignItems="center">
          <TableContainer component={Paper} style={{ maxWidth: '90%' }}>
            <Table style={{ minWidth: '300px' }}>
              <TableBody key={'TableILSBody'}>
                {radioButtonGroupArray.map((step, groupIndex) => (
                  <>
                    <MemoTableRowQuestion question={t(ilsArray[activeStep][groupIndex].question)} />
                    <MemoTableRowAnswers
                      radioButtonGroup={step}
                      handleRadioChange={handleRadioChange}
                      setRadioButtonGroup={setRadioButtonGroupArray[groupIndex]}
                      answerIndex={groupIndex}
                      isIlsLong={ilsLong}
                      t={t}
                      activeStep={activeStep}
                      stepsILSData={stepsILSData}
                    />
                  </>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <SendButton
            t={t}
            handleSend={handleSendClick}
            isNextDisabled={isNextDisabled}
            isValid={ilsLong ? activeStep === 10 : activeStep === 4}
            idType={'ILS'}
            isSending={isSending}
            sendSuccess={successSend}
          />
        </Stack>
      </Stack>
    </Box>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableILSQuestions.displayName = 'TableILSQuestions'
