import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'
import { Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import React, {memo, useCallback, useContext, useMemo, useState} from 'react'
import {SnackbarContext, useQuestionnaireAnswersILSStore} from '@services'
import PropTypes from 'prop-types'
import { MemoButtonStack, MemoSendButton, MemoTableRowQuestion } from './TableCommonComponents'
import useHandleSend from './TableILSQuestions.hooks'
import SendStatusModal from './TableCommonQuestionsSendStatusModal'

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

// region Memoized Elements
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
}

const MemoTableRowAnswers: React.FC<MemoTableRowAnswersProps> = memo(
  ({ activeStep, handleRadioChange, t, radioButtonGroup, setRadioButtonGroup, answerIndex, isIlsLong }) => {
    const ilsArray = isIlsLong ? stepsLongILS : stepsShortILS
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

MemoTableRowAnswers.displayName = 'MemoTableRowAnswers'
MemoTableRowAnswers.propTypes = {
  t: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
  answerIndex: PropTypes.number.isRequired,
  radioButtonGroup: PropTypes.string.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  setRadioButtonGroup: PropTypes.func.isRequired,
  isIlsLong: PropTypes.bool.isRequired
}
// endregion

// region TableILSQuestions
type TableILSQuestionsProps = {
  ilsLong: boolean
}

export const TableILSQuestions = memo(({ ilsLong }: TableILSQuestionsProps) => {
  TableILSQuestions.displayName = 'TableILSQuestions'
  const { sendAnswers, isSending } = useHandleSend()
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [sendSuccess, setSendSuccess] = useState(false)
  const { addSnackbar } = useContext(SnackbarContext)

  const { t } = useTranslation()

  const [activeStep, setActiveStep] = useState(0)
  const [radioButtonGroup1, setRadioButtonGroup1] = useState('')
  const [radioButtonGroup2, setRadioButtonGroup2] = useState('')
  const [radioButtonGroup3, setRadioButtonGroup3] = useState('')
  const [radioButtonGroup4, setRadioButtonGroup4] = useState('')

  //if all radio buttons are selected, the next button is enabled
  // (They are reset to their previous Value when the user goes back)
  const isNextDisabled = !radioButtonGroup1 || !radioButtonGroup2 || !radioButtonGroup3 || !radioButtonGroup4

  const { questionnaireAnswers, setQuestionnaireAnswers } = useQuestionnaireAnswersILSStore()

  // Before reload or close window ask the user if he is sure
  window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
    // Cancel the event
    e.preventDefault()
    // Chrome requires returnValue to be set
    e.returnValue = ''
  })

  const setRadioButtonGroups = (newActiveStep: number) => {
    const stepsILS = ilsLong ? stepsLongILS : stepsShortILS

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

  const handleSendClick = async () => {
    setSendSuccess(await sendAnswers())

    setShowStatusModal(true)

    addSnackbar({
      message: 'Hello',
      severity: 'error',
      autoHideDuration: 5000
    })
  }

  const handleModalClose = () => {
    setShowStatusModal(false)
    setSendSuccess(false)
  }

  const setRadioButtonValue = useMemo(
    () =>
      (ilsStep: { question: string; questionLabel: string; answer1: string; answer2: string }): string => {
        //if the question is already answered, the answer is set to the value of the radio button, else radio button is not set
        const answerType = questionnaireAnswers[ilsStep.questionLabel as keyof typeof questionnaireAnswers]
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

      setQuestionnaireAnswers(ilsStep.questionLabel, selectedAnswer.toString())
    },
    [setQuestionnaireAnswers]
  )

  const ilsArray = ilsLong ? stepsLongILS : stepsShortILS

  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
        <MemoButtonStack
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={ilsLong ? 11 : 5}
          idType={'ILS'}
          disabled={ilsLong ? activeStep === 10 || isNextDisabled : activeStep === 4 || isNextDisabled}
        />
        <Stack direction="column" justifyContent="space-around" alignItems="center">
          <TableContainer component={Paper} style={{ maxWidth: '51%' }}>
            <Table style={{ minWidth: '300px' }}>
              <TableBody key={'TableILSBody'}>
                <MemoTableRowQuestion question={t(ilsArray[activeStep][0].question)} />
                <MemoTableRowAnswers
                  radioButtonGroup={radioButtonGroup1}
                  handleRadioChange={handleRadioChange}
                  setRadioButtonGroup={setRadioButtonGroup1}
                  answerIndex={0}
                  isIlsLong={ilsLong}
                  t={t}
                  activeStep={activeStep}
                />
                <MemoTableRowQuestion question={t(ilsArray[activeStep][1].question)} />
                <MemoTableRowAnswers
                  radioButtonGroup={radioButtonGroup2}
                  handleRadioChange={handleRadioChange}
                  setRadioButtonGroup={setRadioButtonGroup2}
                  answerIndex={1}
                  isIlsLong={ilsLong}
                  t={t}
                  activeStep={activeStep}
                />
                <MemoTableRowQuestion question={t(ilsArray[activeStep][2].question)} />
                <MemoTableRowAnswers
                  radioButtonGroup={radioButtonGroup3}
                  handleRadioChange={handleRadioChange}
                  setRadioButtonGroup={setRadioButtonGroup3}
                  answerIndex={2}
                  isIlsLong={ilsLong}
                  t={t}
                  activeStep={activeStep}
                />
                <MemoTableRowQuestion question={t(ilsArray[activeStep][3].question)} />
                <MemoTableRowAnswers
                  radioButtonGroup={radioButtonGroup4}
                  handleRadioChange={handleRadioChange}
                  setRadioButtonGroup={setRadioButtonGroup4}
                  answerIndex={3}
                  isIlsLong={ilsLong}
                  t={t}
                  activeStep={activeStep}
                />
              </TableBody>
            </Table>
          </TableContainer>
          <MemoSendButton
            t={t}
            handleSend={handleSendClick}
            isNextDisabled={isNextDisabled}
            isValid={ilsLong ? activeStep === 10 : activeStep === 4}
            idType={'ILS'}
            isSending={isSending}
          />
          <SendStatusModal open={showStatusModal} onClose={handleModalClose} isSuccess={sendSuccess} />
        </Stack>
      </Stack>
    </Box>
  )
})
// endregion
