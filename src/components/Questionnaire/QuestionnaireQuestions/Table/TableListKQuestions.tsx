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
import { ButtonStack, MemoTableRowQuestion, SendButton, StartButton, CoverSheet } from './TableCommonComponents'
import useHandleSend from './Questions.hooks'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

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
  setRadioButtonGroup: (newValue: string) => void
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

const MemoTableRowAnswers = memo(
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
MemoTableRowAnswers.displayName = 'TableRowAnswers'

type TableListKQuestionsProps = {
  successSend: boolean
  setSuccessSend: React.Dispatch<React.SetStateAction<boolean>>
  testUndefined?: boolean
}

/**
 * This component is used to display the questionnaire questions for the ListK questionnaire.
 */
export const TableListKQuestions = memo(({ successSend, setSuccessSend, testUndefined }: TableListKQuestionsProps) => {
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
    ...(t<string>(
      !testUndefined
        ? 'components.Questionnaire.QuestionnaireQuestions.Table.ListKQuestions'
        : 'components.Questionnaire.QuestionnaireQuestions.Table.ListKQuestions.Undefined',
      {
        returnObjects: true
      }
    ) as {
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
  const [radioButtonGroup, setRadioButtonGroup] = useState([
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' },
    { value: '' }
  ])

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
  const isNextDisabled = radioButtonGroup.some((radioButton) => radioButton.value === '')

  const setRadioButtonGroups = (newActiveStep: number) => {
    setRadioButtonGroup((prevState) => {
      return prevState.map((item, index) => {
        if (newActiveStep < 8 || index < 4) {
          return {
            ...item,
            value: setRadioButtonValue(stepsListK[newActiveStep][index])
          }
        } else return item
      })
    })
  }

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setRadioButtonGroups(activeStep + 1)
  }, [activeStep])

  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    setRadioButtonGroups(activeStep - 1)
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
        // Filter the questionnaireAnswers array to find all matching answers
        const matchingAnswers = questionnaireAnswers.filter((answer) => answer.question_id === listkStep.questionLabel)

        // If there are matching answers, return the answer from the last one; otherwise, return an empty string
        if (matchingAnswers.length > 0) {
          const lastMatchingAnswer = matchingAnswers[matchingAnswers.length - 1]
          return listkSteps[parseInt(lastMatchingAnswer.answer) - 1]
        }

        return ''
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

  const listKQuestionsJsx = (row: number): ReactJSXElement => {
    return (
      <>
        <MemoTableRowQuestion question={t(stepsListK[activeStep][row].question)} />
        <MemoTableRowAnswers
          radioButtonGroup={radioButtonGroup[row].value}
          handleRadioChange={handleRadioChange}
          setRadioButtonGroup={(newValue) => {
            setRadioButtonGroup((prevState) => {
              return prevState.map((item, index) => {
                if (index === row) {
                  return {
                    ...item,
                    value: newValue
                  }
                }
                return item
              })
            })
          }}
          answerIndex={row}
          t={t}
          activeStep={activeStep}
          stepsListK={stepsListK}
        />
      </>
    )
  }

  return (
    <Box>
      <>
        {activeStep == 0 ? (
          <CoverSheet
            header={t('components.Questionnaire.QuestionnaireResults.Modal.NoData.ListK')}
            body={t('components.Questionnaire.QuestionnaireQuestions.Table.ListKQuestions.Introduction')}
          />
        ) : (
          <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
            <ButtonStack
              activeStep={activeStep}
              handleNext={handleNext}
              handleBack={handleBack}
              steps={9}
              idType={'ListK'}
              disabled={activeStep === 8 || isNextDisabled}
            />
            <Stack direction="column" justifyContent="space-around" alignItems="center">
              <TableContainer component={Paper} style={{ maxWidth: '90%' }}>
                <Table style={{ minWidth: '300px' }}>
                  <TableBody key={'TableListK'}>
                    <>
                      {stepsListK[activeStep].map((page, row) => (
                        <React.Fragment key={'QuestionnareListK Question: ' + row}>
                          {activeStep < 8 ? listKQuestionsJsx(row) : row < 4 ? listKQuestionsJsx(row) : undefined}
                        </React.Fragment>
                      ))}
                    </>
                  </TableBody>
                </Table>
              </TableContainer>
              <SendButton
                t={t}
                handleSend={handleSendClick}
                isNextDisabled={isNextDisabled}
                isValid={activeStep === 8}
                idType={'ListK'}
                isSending={isSending}
                sendSuccess={successSend}
              />
            </Stack>
          </Stack>
        )}
      </>
      <>
        {activeStep == 0 && (
          <Stack direction="column" justifyContent="space-around" alignItems="center">
            <StartButton handleNext={handleNext} />
          </Stack>
        )}
      </>
    </Box>
  )
})
// eslint-disable-next-line immutable/no-mutation
TableListKQuestions.displayName = 'TableListKQuestions'
