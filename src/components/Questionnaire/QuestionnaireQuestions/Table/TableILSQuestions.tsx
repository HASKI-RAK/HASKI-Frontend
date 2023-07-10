import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import SendIcon from '@mui/icons-material/Send'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'
import MobileStepper from '@mui/material/MobileStepper'
import { Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import { DefaultButton as Button } from '@common/components'
import React, { useState } from 'react'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import { useNavigate } from 'react-router-dom'
import { useQuestionnaireAnswersILSStore } from '@services'
import { styleButtonClose } from './QuestionnaireQuestionsTableStyle'

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
const stepsShortILS = [
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-9',
      questionLabel: 'AR_3_F9',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-9.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-9.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-2',
      questionLabel: 'SI_1_F2',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-2.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-2.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-7',
      questionLabel: 'VV_2_F7',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-7.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-7.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-4',
      questionLabel: 'SG_1_F4',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-4.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-4.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-13',
      questionLabel: 'AR_4_F13',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-13.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-13.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-14',
      questionLabel: 'SI_4_F14',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-14.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-14.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-19',
      questionLabel: 'VV_5_F19',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-19.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-19.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-8',
      questionLabel: 'SG_2_F8',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-8.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-8.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-21',
      questionLabel: 'AR_6_F21',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-21.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-21.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-26',
      questionLabel: 'SI_7_F26',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-26.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-26.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-27',
      questionLabel: 'VV_7_F27',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-27.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-27.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-16',
      questionLabel: 'SG_4_F16',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-16.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-16.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-25',
      questionLabel: 'AR_7_F25',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-25.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-25.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-38',
      questionLabel: 'SI_10_F38',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-38.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-38.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-39',
      questionLabel: 'VV_10_F39',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-39.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-39.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-40',
      questionLabel: 'SG_10_F40',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-40.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-40.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-29',
      questionLabel: 'AR_8_F29',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-29.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-29.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-42',
      questionLabel: 'SI_11_F42',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-42.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-42.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-43',
      questionLabel: 'VV_11_F43',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-43.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-43.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-44',
      questionLabel: 'SG_11_F44',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-44.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-44.2'
    }
  ]
]

const stepsLongILS = [
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-1',
      questionLabel: 'AR_1_F1',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-1.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-1.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-2',
      questionLabel: 'SI_1_F2',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-2.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-2.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-3',
      questionLabel: 'VV_1_F3',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-3.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-3.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-4',
      questionLabel: 'SG_1_F4',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-4.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-4.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-5',
      questionLabel: 'AR_2_F5',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-5.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-5.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-6',
      questionLabel: 'SI_2_F6',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-6.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-6.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-7',
      questionLabel: 'VV_2_F7',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-7.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-7.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-8',
      questionLabel: 'SG_2_F8',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-8.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-8.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-9',
      questionLabel: 'AR_3_F9',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-9.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-9.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-10',
      questionLabel: 'SI_3_F10',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-10.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-10.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-11',
      questionLabel: 'VV_3_F11',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-11.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-11.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-12',
      questionLabel: 'SG_3_F12',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-12.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-12.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-13',
      questionLabel: 'AR_4_F13',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-13.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-13.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-14',
      questionLabel: 'SI_4_F14',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-14.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-14.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-15',
      questionLabel: 'VV_4_F15',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-15.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-15.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-16',
      questionLabel: 'SG_4_F16',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-16.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-16.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-17',
      questionLabel: 'AR_5_F17',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-17.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-17.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-18',
      questionLabel: 'SI_5_F18',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-18.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-18.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-19',
      questionLabel: 'VV_5_F19',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-19.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-19.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-20',
      questionLabel: 'SG_5_F20',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-20.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-20.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-21',
      questionLabel: 'AR_6_F21',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-21.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-21.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-22',
      questionLabel: 'SI_6_F22',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-22.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-22.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-23',
      questionLabel: 'VV_6_F23',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-23.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-23.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-24',
      questionLabel: 'SG_6_F24',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-24.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-24.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-25',
      questionLabel: 'AR_7_F25',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-25.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-25.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-26',
      questionLabel: 'SI_7_F26',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-26.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-26.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-27',
      questionLabel: 'VV_7_F27',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-27.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-27.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-28',
      questionLabel: 'SG_7_F28',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-28.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-28.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-29',
      questionLabel: 'AR_8_F29',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-29.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-29.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-30',
      questionLabel: 'SI_8_F30',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-30.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-30.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-31',
      questionLabel: 'VV_8_F31',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-31.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-31.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-32',
      questionLabel: 'SG_8_F32',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-32.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-32.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-33',
      questionLabel: 'AR_9_F33',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-33.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-33.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-34',
      questionLabel: 'SI_9_F34',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-34.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-34.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-35',
      questionLabel: 'VV_9_F35',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-35.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-35.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-36',
      questionLabel: 'SG_9_F36',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-36.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-36.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-37',
      questionLabel: 'AR_10_F37',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-37.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-37.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-38',
      questionLabel: 'SI_10_F38',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-38.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-38.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-39',
      questionLabel: 'VV_10_F39',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-39.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-39.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-40',
      questionLabel: 'SG_10_F40',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-40.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-40.2'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-41',
      questionLabel: 'AR_11_F41',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-41.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-41.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-42',
      questionLabel: 'SI_11_F42',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-42.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-42.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-43',
      questionLabel: 'VV_11_F43',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-43.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-43.2'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Question-44',
      questionLabel: 'SG_11_F44',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-44.1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableILSQuestions.Answer-44.2'
    }
  ]
]

type TableILSQuestionsProps = {
  ilsLong: boolean
}

export const TableILSQuestions = ({ ilsLong }: TableILSQuestionsProps) => {
  const { t } = useTranslation()

  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [radioButtonGroup1, setRadioButtonGroup1] = useState('')
  const [radioButtonGroup2, setRadioButtonGroup2] = useState('')
  const [radioButtonGroup3, setRadioButtonGroup3] = useState('')
  const [radioButtonGroup4, setRadioButtonGroup4] = useState('')

  //if all radio buttons are selected, the next button is enabled (They are reset to their previous Value when the user goes back)
  const isNextDisabled = !radioButtonGroup1 || !radioButtonGroup2 || !radioButtonGroup3 || !radioButtonGroup4

  const { questionnaireAnswers, setQuestionnaireAnswers } = useQuestionnaireAnswersILSStore()

  // Before reload or close window ask the user if he is sure
  window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
    // Cancel the event
    e.preventDefault()

    // Chrome requires returnValue to be set
    e.returnValue = ''
  })

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    if (ilsLong) {
      setRadioButtonGroup1(setRadioButtonValue(stepsLongILS[activeStep + 1][0]))
      setRadioButtonGroup2(setRadioButtonValue(stepsLongILS[activeStep + 1][1]))
      setRadioButtonGroup3(setRadioButtonValue(stepsLongILS[activeStep + 1][2]))
      setRadioButtonGroup4(setRadioButtonValue(stepsLongILS[activeStep + 1][3]))
    } else {
      setRadioButtonGroup1(setRadioButtonValue(stepsShortILS[activeStep + 1][0]))
      setRadioButtonGroup2(setRadioButtonValue(stepsShortILS[activeStep + 1][1]))
      setRadioButtonGroup3(setRadioButtonValue(stepsShortILS[activeStep + 1][2]))
      setRadioButtonGroup4(setRadioButtonValue(stepsShortILS[activeStep + 1][3]))
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
    if (ilsLong) {
      setRadioButtonGroup1(setRadioButtonValue(stepsLongILS[activeStep - 1][0]))
      setRadioButtonGroup2(setRadioButtonValue(stepsLongILS[activeStep - 1][1]))
      setRadioButtonGroup3(setRadioButtonValue(stepsLongILS[activeStep - 1][2]))
      setRadioButtonGroup4(setRadioButtonValue(stepsLongILS[activeStep - 1][3]))
    } else {
      setRadioButtonGroup1(setRadioButtonValue(stepsShortILS[activeStep - 1][0]))
      setRadioButtonGroup2(setRadioButtonValue(stepsShortILS[activeStep - 1][1]))
      setRadioButtonGroup3(setRadioButtonValue(stepsShortILS[activeStep - 1][2]))
      setRadioButtonGroup4(setRadioButtonValue(stepsShortILS[activeStep - 1][3]))
    }
  }

  const handleSend = () => {
    const ILSarray = Object.entries(questionnaireAnswers).filter(([key]) => key !== '')
    const listKJson = {
      "list_k": [
        {}
      ]
    }
    const ils_result = ['ils', ILSarray]
    console.log(ils_result)
    const outputJson = JSON.stringify({
      ils: ILSarray.map((item: any) => ({
        question_id: item[0].toLowerCase(),
        answer: item[1]
      })),
      list_k: listKJson.list_k.map(() => [])
    });
    console.log(outputJson)
    //todo: send to server
  }

  const setRadioButtonValue = (ilsStep: {
    question: string
    questionLabel: string
    answer1: string
    answer2: string
  }): string => {
    //if the question is already answered, the answer is set to the value of the radio button/ else radio button is not set
    if (questionnaireAnswers[ilsStep.questionLabel as keyof typeof questionnaireAnswers] === 'a') {
      return ilsStep.answer1
    } else if (questionnaireAnswers[ilsStep.questionLabel as keyof typeof questionnaireAnswers] === 'b') {
      return ilsStep.answer2
    } else {
      return ''
    }
  }

  const handleRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    ilsStep: { question: string; questionLabel: string; answer1: string; answer2: string }
  ): void => {
    const radioButtonOptions = [ilsStep.answer1, ilsStep.answer2]
    let selectedAnswer
    if (radioButtonOptions.indexOf(event.target.value) === 0) {
      selectedAnswer = 'a'
    } else {
      selectedAnswer = 'b'
    }

    setQuestionnaireAnswers(ilsStep.questionLabel, selectedAnswer.toString())
  }

  const onClickClose = () => {
    if (window.confirm(t('CloseWebsite').toString())) {
      navigate('/')
    }
  }

  const LongIls = () => {
    return (
      <TableBody key={'TableILSBody'}>
        <TableRow>
          <TableCell
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.secondary.main
            }}
            align="left">
            <Typography variant={'h5'}>{t(stepsLongILS[activeStep][0].question)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <RadioGroup
              value={radioButtonGroup1}
              data-testid="ilsLongQuestionnaireILSButtonGroup1"
              onChange={(e) => {
                setRadioButtonGroup1(e.target.value)
                handleRadioChange(e, stepsLongILS[activeStep][0])
              }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                divider={<Divider orientation="horizontal" flexItem />}>
                <FormControlLabel
                  value={stepsLongILS[activeStep][0].answer1}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsLongILS[activeStep][0].answer1)}</Typography>}
                />
                <FormControlLabel
                  value={stepsLongILS[activeStep][0].answer2}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsLongILS[activeStep][0].answer2)}</Typography>}
                />
              </Stack>
            </RadioGroup>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            align="left"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.secondary.main
            }}>
            <Typography variant={'h5'}>{t(stepsLongILS[activeStep][1].question)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <RadioGroup
              value={radioButtonGroup2}
              data-testid="ilsLongQuestionnaireILSButtonGroup2"
              onChange={(e) => {
                setRadioButtonGroup2(e.target.value)
                handleRadioChange(e, stepsLongILS[activeStep][1])
              }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                divider={<Divider orientation="horizontal" flexItem />}>
                <FormControlLabel
                  value={stepsLongILS[activeStep][1].answer1}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsLongILS[activeStep][1].answer1)}</Typography>}
                />
                <FormControlLabel
                  value={stepsLongILS[activeStep][1].answer2}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsLongILS[activeStep][1].answer2)}</Typography>}
                />
              </Stack>
            </RadioGroup>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            align="left"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.secondary.main
            }}>
            <Typography variant={'h5'}>{t(stepsLongILS[activeStep][2].question)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <RadioGroup
              value={radioButtonGroup3}
              data-testid="ilsLongQuestionnaireILSButtonGroup3"
              onChange={(e) => {
                setRadioButtonGroup3(e.target.value)
                handleRadioChange(e, stepsLongILS[activeStep][2])
              }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                divider={<Divider orientation="horizontal" flexItem />}>
                <FormControlLabel
                  value={stepsLongILS[activeStep][2].answer1}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsLongILS[activeStep][2].answer1)}</Typography>}
                />
                <FormControlLabel
                  value={stepsLongILS[activeStep][2].answer2}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsLongILS[activeStep][2].answer2)}</Typography>}
                />
              </Stack>
            </RadioGroup>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            align="left"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.secondary.main
            }}>
            <Typography variant={'h5'}>{t(stepsLongILS[activeStep][3].question)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <RadioGroup
              value={radioButtonGroup4}
              data-testid="ilsLongQuestionnaireILSButtonGroup4"
              onChange={(e) => {
                setRadioButtonGroup4(e.target.value)
                handleRadioChange(e, stepsLongILS[activeStep][3])
              }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                divider={<Divider orientation="horizontal" flexItem />}>
                <FormControlLabel
                  value={stepsLongILS[activeStep][3].answer1}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsLongILS[activeStep][3].answer1)}</Typography>}
                />
                <FormControlLabel
                  value={stepsLongILS[activeStep][3].answer2}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsLongILS[activeStep][3].answer2)}</Typography>}
                />
              </Stack>
            </RadioGroup>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  const ShortIls = () => {
    return (
      <TableBody key={'TableILSBody'}>
        <TableRow>
          <TableCell
            align="left"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.secondary.main
            }}>
            <Typography variant={'h5'}>{t(stepsShortILS[activeStep][0].question)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <RadioGroup
              value={radioButtonGroup1}
              data-testid="ilsShortQuestionnaireILSButtonGroup1"
              onChange={(e) => {
                setRadioButtonGroup1(e.target.value)
                handleRadioChange(e, stepsShortILS[activeStep][0])
              }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                divider={<Divider orientation="horizontal" flexItem />}>
                <FormControlLabel
                  value={stepsShortILS[activeStep][0].answer1}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsShortILS[activeStep][0].answer1)}</Typography>}
                />
                <FormControlLabel
                  value={stepsShortILS[activeStep][0].answer2}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsShortILS[activeStep][0].answer2)}</Typography>}
                />
              </Stack>
            </RadioGroup>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            align="left"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.secondary.main
            }}>
            <Typography variant={'h5'}>{t(stepsShortILS[activeStep][1].question)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <RadioGroup
              value={radioButtonGroup2}
              data-testid="ilsShortQuestionnaireILSButtonGroup2"
              onChange={(e) => {
                setRadioButtonGroup2(e.target.value)
                handleRadioChange(e, stepsShortILS[activeStep][1])
              }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                divider={<Divider orientation="horizontal" flexItem />}>
                <FormControlLabel
                  value={stepsShortILS[activeStep][1].answer1}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsShortILS[activeStep][1].answer1)}</Typography>}
                />
                <FormControlLabel
                  value={stepsShortILS[activeStep][1].answer2}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsShortILS[activeStep][1].answer2)}</Typography>}
                />
              </Stack>
            </RadioGroup>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            align="left"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.secondary.main
            }}>
            <Typography variant={'h5'}>{t(stepsShortILS[activeStep][2].question)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <RadioGroup
              value={radioButtonGroup3}
              data-testid="ilsShortQuestionnaireILSButtonGroup3"
              onChange={(e) => {
                setRadioButtonGroup3(e.target.value)
                handleRadioChange(e, stepsShortILS[activeStep][2])
              }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                divider={<Divider orientation="horizontal" flexItem />}>
                <FormControlLabel
                  value={stepsShortILS[activeStep][2].answer1}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsShortILS[activeStep][2].answer1)}</Typography>}
                />
                <FormControlLabel
                  value={stepsShortILS[activeStep][2].answer2}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsShortILS[activeStep][2].answer2)}</Typography>}
                />
              </Stack>
            </RadioGroup>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell
            align="left"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.secondary.main
            }}>
            <Typography variant={'h5'}>{t(stepsShortILS[activeStep][3].question)}</Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <RadioGroup
              value={radioButtonGroup4}
              data-testid="ilsShortQuestionnaireILSButtonGroup4"
              onChange={(e) => {
                setRadioButtonGroup4(e.target.value)
                handleRadioChange(e, stepsShortILS[activeStep][3])
              }}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="flex-start"
                spacing={0}
                divider={<Divider orientation="horizontal" flexItem />}>
                <FormControlLabel
                  value={stepsShortILS[activeStep][3].answer1}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsShortILS[activeStep][3].answer1)}</Typography>}
                />
                <FormControlLabel
                  value={stepsShortILS[activeStep][3].answer2}
                  control={<Radio />}
                  label={<Typography variant={'h6'}>{t(stepsShortILS[activeStep][3].answer2)}</Typography>}
                />
              </Stack>
            </RadioGroup>
          </TableCell>
        </TableRow>
      </TableBody>
    )
  }

  return (
    <Box>
      <IconButton
        color="primary"
        sx={styleButtonClose}
        onClick={onClickClose}
        data-testid={'QuestionnaireAnswersCloseButton'}>
        <CloseIcon />
      </IconButton>
      <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
        <Stack direction="row" justifyContent="space-around" alignItems="center">
          <MobileStepper
            variant="progress"
            steps={ilsLong ? 11 : 5}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: '50%', flexGrow: 1, align: 'center' }}
            nextButton={
              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                data-testid="nextButtonILSQuestionnaire"
                disabled={ilsLong ? activeStep === 10 || isNextDisabled : activeStep === 4 || isNextDisabled}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                variant="contained"
                color="primary"
                onClick={handleBack}
                data-testid="backButtonILSQuestionnaire"
                disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
          />
        </Stack>
        <Stack direction="column" justifyContent="space-around" alignItems="center">
          <TableContainer component={Paper} style={{ maxWidth: '51%' }}>
            <Table style={{ minWidth: '300px' }}>{ilsLong ? LongIls() : ShortIls()}</Table>
          </TableContainer>
          <>
            <Stack direction="column" justifyContent="flex-end" alignItems="center">
              {(ilsLong ? activeStep === 10 : activeStep === 4) ? (
                <div data-testid={'ActiveStepILS'}>
                  <Button
                    variant="contained"
                    endIcon={<SendIcon />}
                    color="primary"
                    data-testid="sendButtonILSQuestionnaire"
                    disabled={isNextDisabled}
                    onClick={handleSend}
                    sx={{ m: 2 }}>
                    {t('Send')}
                  </Button>
                </div>
              ) : undefined}
            </Stack>
          </>
        </Stack>
      </Stack>
    </Box>
  )
}
