import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import SendIcon from '@mui/icons-material/Send'
import Paper from '@mui/material/Paper'
import {useTranslation} from 'react-i18next'
import MobileStepper from '@mui/material/MobileStepper'
import {Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography} from '@mui/material'
import TableCell from '@mui/material/TableCell'
import {DefaultButton as Button} from '@common/components'
import React, {memo, useCallback, useMemo, useState} from 'react'
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight'
import CloseIcon from '@mui/icons-material/Close'
import IconButton from '@mui/material/IconButton'
import {useNavigate} from 'react-router-dom'
import {useQuestionnaireAnswersListKStore} from '@services'
import {styleButtonClose} from './QuestionnaireQuestionsTableStyle'
import PropTypes from 'prop-types';

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
// region memo props interfaces
interface CommonProps {
  t: (key: string) => string;
  activeStep: number;
}

interface CustomTableRowProps extends CustomTableRowSpacerProps{
  radioButtonGroup: string;
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>,
                      listkStep: {question: string, questionLabel: string, answer1: string,
                        answer2: string, answer3: string, answer4: string, answer5: string}) => void;
  setRadioButtonGroup: (value: (((prevState: string) => string) | string)) => void;
}

interface CustomTableRowSpacerProps extends CommonProps{
  answerIndex: number;
}

interface CustomIcButtonProps {
  onClickClose: () => void;
}

interface CustomButtonStackProps {
  activeStep: number;
  handleNext: () => void;
  handleBack: () => void;
  isNextDisabled: boolean;
}

interface CustomSendButtonProps extends CommonProps{
  handleSend: () => void;
  isNextDisabled: boolean;
}
// endregion

// region memo react elements
const CustomTableRow: React.FC<CustomTableRowProps> = memo((
    { activeStep, handleRadioChange, t, radioButtonGroup, setRadioButtonGroup, answerIndex}) => {

  return (
      <TableRow>
        <TableCell>
          <RadioGroup
              value={radioButtonGroup}
              data-testid={`ListKQuestionnaireButtonGroup${(answerIndex + 1)}`}
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
  );
});

const CustomTableRowSpacer: React.FC<CustomTableRowSpacerProps> = memo(({t, activeStep, answerIndex}) => {
  return (
      <TableRow>
        <TableCell
            align="left"
            sx={{
              backgroundColor: (theme) => theme.palette.primary.dark,
              color: (theme) => theme.palette.secondary.main
            }}>
          <Typography variant={'h5'}>{t(stepsListK[activeStep][answerIndex].question)}</Typography>
        </TableCell>
      </TableRow>
  );
});

const CustomIcButton: React.FC<CustomIcButtonProps> = memo(({onClickClose}) => {
  return (
      <IconButton
          id={'QuestionnaireAnswersCloseButton'}
          color="primary"
          sx={styleButtonClose}
          onClick={onClickClose}
          data-testid={'QuestionnaireAnswersCloseButton'}>
        <CloseIcon />
      </IconButton>
  );
});

const CustomButtonStack: React.FC<CustomButtonStackProps> = memo((
    {activeStep, handleNext, isNextDisabled, handleBack}) => {
  return (
      <Stack direction="row" justifyContent="space-around" alignItems="center">
        <MobileStepper
            variant="progress"
            steps={8}
            position="static"
            activeStep={activeStep}
            sx={{ maxWidth: '50%', flexGrow: 1, align: 'center' }}
            nextButton={
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  data-testid="nextButtonListKQuestionnaire"
                  disabled={activeStep === 7 || isNextDisabled}>
                Next
                <KeyboardArrowRight />
              </Button>
            }
            backButton={
              <Button
                  variant="contained"
                  color="primary"
                  onClick={handleBack}
                  data-testid="backButtonListKQuestionnaire"
                  disabled={activeStep === 0}>
                <KeyboardArrowLeft />
                Back
              </Button>
            }
        />
      </Stack>
  );
});

const CustomSendButton: React.FC<CustomSendButtonProps> = memo((
    {activeStep, handleSend, isNextDisabled, t})=> {
  return (
      <>
        <Stack direction="column" justifyContent="flex-end" alignItems="center">
          {activeStep === 7 ? (
              <div data-testid={'ActiveStepILS'}>
                <Button
                    variant="contained"
                    endIcon={<SendIcon/>}
                    color="primary"
                    data-testid="sendButtonListKQuestionnaire"
                    onClick={handleSend}
                    disabled={isNextDisabled}
                    sx={{m: 2}}>
                  {t('Send')}
                </Button>
              </div>
          ) : undefined}
        </Stack>
      </>
  );
});
//endregion

// region memo required propTypes
const commonPropTypes = {
  t: PropTypes.func.isRequired,
  activeStep: PropTypes.number.isRequired,
}

CustomTableRow.displayName = 'CustomTableRow';
CustomTableRow.propTypes = {
  ...commonPropTypes,
  answerIndex: PropTypes.number.isRequired,
  radioButtonGroup: PropTypes.string.isRequired,
  handleRadioChange: PropTypes.func.isRequired,
  setRadioButtonGroup: PropTypes.func.isRequired,
};

CustomTableRowSpacer.displayName = 'CustomTableRowSpacer';
CustomTableRowSpacer.propTypes = {
  ...commonPropTypes,
  answerIndex: PropTypes.number.isRequired,
}

CustomIcButton.displayName = 'CustomIconButton';
CustomIcButton.propTypes = {
  onClickClose: PropTypes.func.isRequired,
}

CustomButtonStack.displayName = 'CustomButtonStack';
CustomButtonStack.propTypes = {
  activeStep: PropTypes.number.isRequired,
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
}

CustomSendButton.displayName = 'CustomTableRow';
CustomSendButton.propTypes = {
  ...commonPropTypes,
  handleSend: PropTypes.func.isRequired,
  isNextDisabled: PropTypes.bool.isRequired,
};
// endregion
// endregion

// region TableListKQuestions
export const TableListKQuestions = memo(() => {
  TableListKQuestions.displayName = 'TableListKQuestions';

  const { t } = useTranslation()

  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [radioButtonGroup1, setRadioButtonGroup1] = useState('')
  const [radioButtonGroup2, setRadioButtonGroup2] = useState('')
  const [radioButtonGroup3, setRadioButtonGroup3] = useState('')
  const [radioButtonGroup4, setRadioButtonGroup4] = useState('')
  const [radioButtonGroup5, setRadioButtonGroup5] = useState('')

  //if all radio buttons are selected, the next button is enabled
  // (They are reset to their previous Value when the user goes back)
  const isNextDisabled = (
    !radioButtonGroup1 || !radioButtonGroup2 || !radioButtonGroup3 || !radioButtonGroup4 || !radioButtonGroup5)

  const { questionnaireAnswers, setQuestionnaireAnswers } = useQuestionnaireAnswersListKStore()

  // Before reload or close window ask the user if he is sure
  window.addEventListener('beforeunload', (e: BeforeUnloadEvent) => {
    // Cancel the event
    e.preventDefault()
    // Chrome requires returnValue to be set
    e.returnValue = ''
  })

  const setRadioButtonGroups = (newActiveStep: number) => {
    setRadioButtonGroup1(setRadioButtonValue(stepsListK[newActiveStep][0]));
    setRadioButtonGroup2(setRadioButtonValue(stepsListK[newActiveStep][1]));
    setRadioButtonGroup3(setRadioButtonValue(stepsListK[newActiveStep][2]));
    setRadioButtonGroup4(setRadioButtonValue(stepsListK[newActiveStep][3]));
  };

  const handleNext = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setRadioButtonGroups(activeStep + 1)
    //because the last step has only 4 questions
    if (activeStep < 6) {
      setRadioButtonGroup5(setRadioButtonValue(stepsListK[activeStep + 1][4]));
    }
  }, [activeStep]);


  const handleBack = useCallback(() => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setRadioButtonGroups(activeStep - 1)
  }, [activeStep]);


  const handleSend = useCallback(() => {
    const listkArray = Object.entries(questionnaireAnswers).filter(([key]) => key !== '');
    const listk_result = ['ils', listkArray];
    //todo: send to server
  }, [questionnaireAnswers]);

  const setRadioButtonValue = useMemo(
      () => (listkStep: {
        question: string;
        questionLabel: string;
        answer1: string;
        answer2: string;
        answer3: string;
        answer4: string;
        answer5: string;
      }) => {
        //if the question is already answered, the answer is set to the value of the radio button/ else radio button is not set
        switch (questionnaireAnswers[listkStep.questionLabel as keyof typeof questionnaireAnswers]) {
          case '1':
            return listkStep.answer1;
          case '2':
            return listkStep.answer2;
          case '3':
            return listkStep.answer3;
          case '4':
            return listkStep.answer4;
          case '5':
            return listkStep.answer5;
          default:
            return '';
        }
      },
      [questionnaireAnswers]
  );

  const handleRadioChange = useCallback(
      (
          event: React.ChangeEvent<HTMLInputElement>,
          listkStep: {
            question: string;
            questionLabel: string;
            answer1: string;
            answer2: string;
            answer3: string;
            answer4: string;
            answer5: string;
          }
      ) => {
        const radioButtonOptions = [
          listkStep.answer1,
          listkStep.answer2,
          listkStep.answer3,
          listkStep.answer4,
          listkStep.answer5,
        ];
        const selectedAnswer = (radioButtonOptions.indexOf(event.target.value) + 1) || '5';
        setQuestionnaireAnswers(listkStep.questionLabel, selectedAnswer.toString());
      },
      [setQuestionnaireAnswers]
  );


  const onClickClose = useCallback(() => {
    if (window.confirm(t('CloseWebsite').toString())) {
      navigate('/');
    }
  }, [t, navigate]);

  return (
    <Box>
      <CustomIcButton onClickClose={onClickClose}/>
      <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
        <CustomButtonStack
            activeStep={activeStep}
            handleNext={handleNext}
            handleBack={handleBack}
            isNextDisabled={isNextDisabled} />
        <Stack direction="column" justifyContent="space-around" alignItems="center">
          <TableContainer component={Paper} style={{ maxWidth: '71%' }}>
            <Table style={{ minWidth: '300px' }}>
              <TableBody key={'TableListK'}>
                <CustomTableRowSpacer t={t} activeStep={activeStep} answerIndex={0} />
                <CustomTableRow
                    activeStep={activeStep}
                    handleRadioChange={handleRadioChange}
                    radioButtonGroup={radioButtonGroup1}
                    setRadioButtonGroup={setRadioButtonGroup1}
                    t={t}
                    answerIndex={0} />
                <CustomTableRowSpacer t={t} activeStep={activeStep} answerIndex={1} />
                <CustomTableRow
                    activeStep={activeStep}
                    handleRadioChange={handleRadioChange}
                    radioButtonGroup={radioButtonGroup2}
                    setRadioButtonGroup={setRadioButtonGroup2}
                    t={t}
                    answerIndex={1} />
                <CustomTableRowSpacer t={t} activeStep={activeStep} answerIndex={2} />
                <CustomTableRow
                    activeStep={activeStep}
                    handleRadioChange={handleRadioChange}
                    radioButtonGroup={radioButtonGroup3}
                    setRadioButtonGroup={setRadioButtonGroup3}
                    t={t}
                    answerIndex={2} />
                <CustomTableRowSpacer t={t} activeStep={activeStep} answerIndex={3} />
                <CustomTableRow
                    activeStep={activeStep}
                    handleRadioChange={handleRadioChange}
                    radioButtonGroup={radioButtonGroup4}
                    setRadioButtonGroup={setRadioButtonGroup4}
                    t={t}
                    answerIndex={3} />
                {activeStep < 7 ? (
                  <>
                    <CustomTableRowSpacer t={t} activeStep={activeStep} answerIndex={4} />
                    <CustomTableRow
                        activeStep={activeStep}
                        handleRadioChange={handleRadioChange}
                        radioButtonGroup={radioButtonGroup5}
                        setRadioButtonGroup={setRadioButtonGroup5}
                        t={t}
                        answerIndex={4} />
                  </>
                ) : undefined}
              </TableBody>
            </Table>
          </TableContainer>
          <CustomSendButton
              activeStep={activeStep}
              handleSend={handleSend}
              isNextDisabled={isNextDisabled}
              t={t} />
        </Stack>
      </Stack>
    </Box>
  )
});
// endregion
