import {
  Box,
  Divider,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography
} from '@common/components'
import { useTranslation } from 'react-i18next'
import React, { memo, useCallback, useContext, useMemo, useState } from 'react'
import { SnackbarContext } from '@services'
import { ButtonStack, MemoTableRowQuestion, SendButton } from './TableCommonComponents'
import useHandleSend from './Questions.hooks'

/**
 * @description
 * This component is used to display the questionnaire questions for the ListK questionnaire.
 */

type TableRowAnswersProps = {
  t: (key: string) => string
  activeStep: number
  answerIndex: number
  radioButtonGroup: string
  handleRadioChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    listkStep: {
      question: string
      questionLabel: string
      answer1: string
      answer2: string
      answer3: string
      answer4: string
      answer5: string
    }
  ) => void
  setRadioButtonGroup: (value: ((prevState: string) => string) | string) => void
  stepsListK: {
    question: string
    questionLabel: string
    answer1: string
    answer2: string
    answer3: string
    answer4: string
    answer5: string
  }[][]
}

const TableRowAnswers = memo(
  ({
    activeStep,
    handleRadioChange,
    t,
    radioButtonGroup,
    setRadioButtonGroup,
    answerIndex,
    stepsListK
  }: TableRowAnswersProps) => {
    const answerValues = [
      stepsListK[activeStep][answerIndex].answer1,
      stepsListK[activeStep][answerIndex].answer2,
      stepsListK[activeStep][answerIndex].answer3,
      stepsListK[activeStep][answerIndex].answer4,
      stepsListK[activeStep][answerIndex].answer5
    ]
    return (
      <TableRow>
        <TableCell>
          <RadioGroup
            value={radioButtonGroup}
            data-testid={`ListKQuestionnaireButtonGroup${answerIndex + 1}`}
            onChange={(e) => {
              setRadioButtonGroup(e.target.value)
              handleRadioChange(e, stepsListK[activeStep][answerIndex])
            }}>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              spacing={1}
              divider={<Divider orientation="vertical" flexItem />}>
              {answerValues.map((answer) => (
                <React.Fragment key={'QuestionnaireListK Answer: ' + answer}>
                  <FormControlLabel
                    value={answer}
                    control={<Radio />}
                    label={<Typography variant={'h6'}>{t(answer)}</Typography>}
                  />
                </React.Fragment>
              ))}
            </Stack>
          </RadioGroup>
        </TableCell>
      </TableRow>
    )
  }
)
// eslint-disable-next-line immutable/no-mutation
TableRowAnswers.displayName = 'TableRowAnswers'

type TableListKQuestionsProps = {
  successSend: boolean
  setSuccessSend: React.Dispatch<React.SetStateAction<boolean>>
}

export const TableListKQuestions = memo(({ successSend, setSuccessSend }: TableListKQuestionsProps) => {
  const { addSnackbar } = useContext(SnackbarContext)
  const [questionnaireAnswers, setQuestionnaireAnswers] = useState([{ question_id: '', answer: '' }])
  const { sendAnswers, isSending } = useHandleSend(questionnaireAnswers, false)

  const { t } = useTranslation()

  const stepsListK: {
    question: string
    questionLabel: string
    answer1: string
    answer2: string
    answer3: string
    answer4: string
    answer5: string
  }[][] = [
    ...(t<string>('components.Questionnaire.QuestionnaireQuestions.Table.ListKQuestions', {
      returnObjects: true
    }) as {
      question: string
      questionLabel: string
      answer1: string
      answer2: string
      answer3: string
      answer4: string
      answer5: string
    }[][])
  ]

  const [activeStep, setActiveStep] = useState(0)
  const [radioButtonGroup1, setRadioButtonGroup1] = useState('')
  const [radioButtonGroup2, setRadioButtonGroup2] = useState('')
  const [radioButtonGroup3, setRadioButtonGroup3] = useState('')
  const [radioButtonGroup4, setRadioButtonGroup4] = useState('')
  const [radioButtonGroup5, setRadioButtonGroup5] = useState('')

  const radioButtonGroupArray = [radioButtonGroup1, radioButtonGroup2, radioButtonGroup3, radioButtonGroup4]
  const setRadioButtonGroupArray = [
    setRadioButtonGroup1,
    setRadioButtonGroup2,
    setRadioButtonGroup3,
    setRadioButtonGroup4
  ]

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

  //if all radio buttons are selected, the next button is enabled
  // (They are reset to their previous Value when the user goes back)
  const isNextDisabled =
    !radioButtonGroup1 || !radioButtonGroup2 || !radioButtonGroup3 || !radioButtonGroup4 || !radioButtonGroup5

  const setRadioButtonGroups = (newActiveStep: number) => {
    setRadioButtonGroup1(setRadioButtonValue(stepsListK[newActiveStep][0]))
    setRadioButtonGroup2(setRadioButtonValue(stepsListK[newActiveStep][1]))
    setRadioButtonGroup3(setRadioButtonValue(stepsListK[newActiveStep][2]))
    setRadioButtonGroup4(setRadioButtonValue(stepsListK[newActiveStep][3]))
  }

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setRadioButtonGroups(activeStep + 1)
    //because the last step has only 4 questions
    if (activeStep < 6) {
      setRadioButtonGroup5(setRadioButtonValue(stepsListK[activeStep + 1][4]))
    }
  }, [activeStep])

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setRadioButtonGroups(activeStep - 1)
    setRadioButtonGroup5(setRadioButtonValue(stepsListK[activeStep - 1][4]))
  }, [activeStep])

  const setRadioButtonValue = useMemo(
    () =>
      (listkStep: {
        question: string
        questionLabel: string
        answer1: string
        answer2: string
        answer3: string
        answer4: string
        answer5: string
      }) => {
        //if the question is already answered, the answer is set to the value of the radio button/ else radio button is not set

        const listkSteps = [
          listkStep.answer1,
          listkStep.answer2,
          listkStep.answer3,
          listkStep.answer4,
          listkStep.answer5
        ]
        const selectedAnswer = questionnaireAnswers.find(
          (answer) => answer.question_id === listkStep.questionLabel
        )?.answer
        return selectedAnswer ? listkSteps[parseInt(selectedAnswer) - 1] : ''
      },
    [questionnaireAnswers]
  )

  const handleRadioChange = useCallback(
    (
      event: React.ChangeEvent<HTMLInputElement>,
      listkStep: {
        question: string
        questionLabel: string
        answer1: string
        answer2: string
        answer3: string
        answer4: string
        answer5: string
      }
    ) => {
      const radioButtonOptions = [
        listkStep.answer1,
        listkStep.answer2,
        listkStep.answer3,
        listkStep.answer4,
        listkStep.answer5
      ]
      const selectedAnswer = radioButtonOptions.indexOf(event.target.value) + 1
      setQuestionnaireAnswers((prevState) => [
        ...prevState,
        { question_id: listkStep.questionLabel, answer: selectedAnswer.toString() }
      ])
    },
    [setQuestionnaireAnswers]
  )

  return (
    <Box>
      <Stack direction="column" justifyContent="space-around" alignItems="center">
        <Typography variant="h6" component={Paper} sx={{ m: 2, p: 2 }}>
          List-K Questionnaire
        </Typography>
      </Stack>
      <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
        <ButtonStack
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={8}
          idType={'ListK'}
          disabled={activeStep === 7 || isNextDisabled}
        />
        <Stack direction="column" justifyContent="space-around" alignItems="center">
          <TableContainer component={Paper} style={{ maxWidth: '90%' }}>
            <Table style={{ minWidth: '300px' }}>
              <TableBody key={'TableListK'}>
                {radioButtonGroupArray.map((step, groupIndex) => (
                  <React.Fragment key={'QuestionnareListK Question: ' + groupIndex}>
                    <MemoTableRowQuestion question={t(stepsListK[activeStep][groupIndex].question)} />
                    <TableRowAnswers
                      activeStep={activeStep}
                      handleRadioChange={handleRadioChange}
                      radioButtonGroup={radioButtonGroupArray[groupIndex]}
                      setRadioButtonGroup={setRadioButtonGroupArray[groupIndex]}
                      t={t}
                      answerIndex={groupIndex}
                      stepsListK={stepsListK}
                    />
                    {activeStep < 7 && groupIndex == 3 ? (
                      <>
                        <MemoTableRowQuestion question={t(stepsListK[activeStep][4].question)} />
                        <TableRowAnswers
                          activeStep={activeStep}
                          handleRadioChange={handleRadioChange}
                          radioButtonGroup={radioButtonGroup5}
                          setRadioButtonGroup={setRadioButtonGroup5}
                          t={t}
                          answerIndex={4}
                          stepsListK={stepsListK}
                        />
                      </>
                    ) : undefined}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <SendButton
            t={t}
            handleSend={handleSendClick}
            isNextDisabled={isNextDisabled}
            isValid={activeStep === 7}
            idType={'ListK'}
            isSending={isSending}
            sendSuccess={successSend}
          />
        </Stack>
      </Stack>
    </Box>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableListKQuestions.displayName = 'TableListKQuestions'
