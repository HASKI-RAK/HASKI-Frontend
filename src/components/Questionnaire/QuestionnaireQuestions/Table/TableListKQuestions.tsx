import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'
import { Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import React, { memo, useCallback, useMemo, useState } from 'react'
import { useQuestionnaireAnswersListKStore } from '@services'
import PropTypes from 'prop-types'
import { MemoButtonStack, MemoSendButton, MemoTableRowQuestion } from './TableCommonComponents'

/**
 * @description
 * This component is used to display the questionnaire questions for the ListK questionnaire.
 */

const stepsListK = [
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-1',
      questionLabel: 'Org1_F1',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-2',
      questionLabel: 'Org2_F2',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-3',
      questionLabel: 'Org3_F3',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-4',
      questionLabel: 'Ela1_F4',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-5',
      questionLabel: 'Ela2_F5',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-6',
      questionLabel: 'Ela3_F6',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-7',
      questionLabel: 'krP1_F7',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-8',
      questionLabel: 'krP2_F8',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-9',
      questionLabel: 'krP3_F9',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-10',
      questionLabel: 'Wie1_F10',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-11',
      questionLabel: 'Wie2_F11',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-12',
      questionLabel: 'Wie3_F12',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-13',
      questionLabel: 'ZP1_F13',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-14',
      questionLabel: 'ZP2_F14',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-15',
      questionLabel: 'ZP3_F15',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-16',
      questionLabel: 'Kon1_F16',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-17',
      questionLabel: 'Kon2_F17',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-18',
      questionLabel: 'Kon3_F18',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-19',
      questionLabel: 'Reg1_F19',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-20',
      questionLabel: 'Reg2_F20',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-21',
      questionLabel: 'Reg3_F21',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-22',
      questionLabel: 'Auf1r_F22',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-23',
      questionLabel: 'Auf2r_F23',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-24',
      questionLabel: 'Auf3r_F24',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-25',
      questionLabel: 'Ans1_F25',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-26',
      questionLabel: 'Ans2_F26',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-27',
      questionLabel: 'Ans3_F27',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-28',
      questionLabel: 'Zei1_F28',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-29',
      questionLabel: 'Zei2_F29',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-30',
      questionLabel: 'Zei3_F30',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-31',
      questionLabel: 'LmS1_F31',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-32',
      questionLabel: 'LmS2_F32',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-33',
      questionLabel: 'LmS3_F33',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-34',
      questionLabel: 'Lit1_F34',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-35',
      questionLabel: 'Lit2_F35',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    }
  ],
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-36',
      questionLabel: 'Lit3_F36',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-37',
      questionLabel: 'LU1_F37',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-38',
      questionLabel: 'LU2_F38',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-39',
      questionLabel: 'LU3_F39',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    }
  ]
]

// region Memoized Elements
interface MemoTableRowAnswersProps {
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
}

const MemoTableRowAnswers: React.FC<MemoTableRowAnswersProps> = memo(
  ({ activeStep, handleRadioChange, t, radioButtonGroup, setRadioButtonGroup, answerIndex }) => {
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
              <FormControlLabel
                value={stepsListK[activeStep][answerIndex].answer1}
                control={<Radio />}
                label={<Typography variant={'h6'}>{t(stepsListK[activeStep][answerIndex].answer1)}</Typography>}
              />
              <FormControlLabel
                value={stepsListK[activeStep][answerIndex].answer2}
                control={<Radio />}
                label={<Typography variant={'h6'}>{t(stepsListK[activeStep][answerIndex].answer2)}</Typography>}
              />
              <FormControlLabel
                value={stepsListK[activeStep][answerIndex].answer3}
                control={<Radio />}
                label={<Typography variant={'h6'}>{t(stepsListK[activeStep][answerIndex].answer3)}</Typography>}
              />
              <FormControlLabel
                value={stepsListK[activeStep][answerIndex].answer4}
                control={<Radio />}
                label={<Typography variant={'h6'}>{t(stepsListK[activeStep][answerIndex].answer4)}</Typography>}
              />
              <FormControlLabel
                value={stepsListK[activeStep][answerIndex].answer5}
                control={<Radio />}
                label={<Typography variant={'h6'}>{t(stepsListK[activeStep][answerIndex].answer5)}</Typography>}
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
  setRadioButtonGroup: PropTypes.func.isRequired
}
// endregion

// region TableListKQuestions
export const TableListKQuestions = memo(() => {
  TableListKQuestions.displayName = 'TableListKQuestions'

  const { t } = useTranslation()

  const [activeStep, setActiveStep] = useState(0)
  const [radioButtonGroup1, setRadioButtonGroup1] = useState('')
  const [radioButtonGroup2, setRadioButtonGroup2] = useState('')
  const [radioButtonGroup3, setRadioButtonGroup3] = useState('')
  const [radioButtonGroup4, setRadioButtonGroup4] = useState('')
  const [radioButtonGroup5, setRadioButtonGroup5] = useState('')

  //if all radio buttons are selected, the next button is enabled
  // (They are reset to their previous Value when the user goes back)
  const isNextDisabled =
    !radioButtonGroup1 || !radioButtonGroup2 || !radioButtonGroup3 || !radioButtonGroup4 || !radioButtonGroup5

  const { questionnaireAnswers, setQuestionnaireAnswers } = useQuestionnaireAnswersListKStore()

  // Before reload or close window ask the user if he is sure
  window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
    // Cancel the event
    e.preventDefault()
    // Chrome requires returnValue to be set
    e.returnValue = ''
  })

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

  const handleSend = useCallback(() => {
    const listkArray = Object.entries(questionnaireAnswers).filter(([key]) => key !== '')
    const listk_result = ['listk', listkArray]
    console.log(listk_result)
    //todo: send to server
  }, [questionnaireAnswers])

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
        switch (questionnaireAnswers[listkStep.questionLabel as keyof typeof questionnaireAnswers]) {
          case '1':
            return listkStep.answer1
          case '2':
            return listkStep.answer2
          case '3':
            return listkStep.answer3
          case '4':
            return listkStep.answer4
          case '5':
            return listkStep.answer5
          default:
            return ''
        }
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
      const selectedAnswer = (radioButtonOptions.indexOf(event.target.value) + 1)
      setQuestionnaireAnswers(listkStep.questionLabel, selectedAnswer.toString())
    },
    [setQuestionnaireAnswers]
  )

  return (
    <Box>
      <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
        <MemoButtonStack
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          steps={8}
          idType={'ListK'}
          disabled={activeStep === 7 || isNextDisabled}
        />
        <Stack direction="column" justifyContent="space-around" alignItems="center">
          <TableContainer component={Paper} style={{ maxWidth: '71%' }}>
            <Table style={{ minWidth: '300px' }}>
              <TableBody key={'TableListK'}>
                <MemoTableRowQuestion question={t(stepsListK[activeStep][0].question)} />
                <MemoTableRowAnswers
                  activeStep={activeStep}
                  handleRadioChange={handleRadioChange}
                  radioButtonGroup={radioButtonGroup1}
                  setRadioButtonGroup={setRadioButtonGroup1}
                  t={t}
                  answerIndex={0}
                />
                <MemoTableRowQuestion question={t(stepsListK[activeStep][1].question)} />
                <MemoTableRowAnswers
                  activeStep={activeStep}
                  handleRadioChange={handleRadioChange}
                  radioButtonGroup={radioButtonGroup2}
                  setRadioButtonGroup={setRadioButtonGroup2}
                  t={t}
                  answerIndex={1}
                />
                <MemoTableRowQuestion question={t(stepsListK[activeStep][2].question)} />
                <MemoTableRowAnswers
                  activeStep={activeStep}
                  handleRadioChange={handleRadioChange}
                  radioButtonGroup={radioButtonGroup3}
                  setRadioButtonGroup={setRadioButtonGroup3}
                  t={t}
                  answerIndex={2}
                />
                <MemoTableRowQuestion question={t(stepsListK[activeStep][3].question)} />
                <MemoTableRowAnswers
                  activeStep={activeStep}
                  handleRadioChange={handleRadioChange}
                  radioButtonGroup={radioButtonGroup4}
                  setRadioButtonGroup={setRadioButtonGroup4}
                  t={t}
                  answerIndex={3}
                />
                {activeStep < 7 ? (
                  <>
                    <MemoTableRowQuestion question={t(stepsListK[activeStep][4].question)} />
                    <MemoTableRowAnswers
                      activeStep={activeStep}
                      handleRadioChange={handleRadioChange}
                      radioButtonGroup={radioButtonGroup5}
                      setRadioButtonGroup={setRadioButtonGroup5}
                      t={t}
                      answerIndex={4}
                    />
                  </>
                ) : undefined}
              </TableBody>
            </Table>
          </TableContainer>
          <MemoSendButton
            t={t}
            handleSend={handleSend}
            isNextDisabled={isNextDisabled}
            isValid={activeStep === 7}
            idType={'ListK'}
          />
        </Stack>
      </Stack>
    </Box>
  )
})
// endregion
