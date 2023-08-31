import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useTranslation } from 'react-i18next'
import { Box, Divider, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material'
import TableCell from '@mui/material/TableCell'
import React, {memo, useCallback, useContext, useMemo, useState} from 'react'
import {SnackbarContext, useQuestionnaireAnswersListKStore} from '@services'
import PropTypes from 'prop-types'
import { MemoButtonStack, MemoSendButton, MemoTableRowQuestion } from './TableCommonComponents'
import useHandleSend from './TableListKQuestions.hooks'

/**
 * @description
 * This component is used to display the questionnaire questions for the ListK questionnaire.
 */

const stepsListK = [
  [
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-1',
      questionLabel: 'org1_f1',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-2',
      questionLabel: 'org2_f2',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-3',
      questionLabel: 'org3_f3',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-4',
      questionLabel: 'elab1_f4',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-5',
      questionLabel: 'elab2_f5',
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
      questionLabel: 'elab3_f6',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-7',
      questionLabel: 'crit_rev1_f7',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-8',
      questionLabel: 'crit_rev2_f8',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-9',
      questionLabel: 'crit_rev3_f9',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-10',
      questionLabel: 'rep1_f10',
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
      questionLabel: 'rep2_f11',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-12',
      questionLabel: 'rep3_f12',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-13',
      questionLabel: 'goal_plan1_f13',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-14',
      questionLabel: 'goal_plan2_f14',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-15',
      questionLabel: 'goal_plan3_f15',
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
      questionLabel: 'con1_f16',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-17',
      questionLabel: 'con2_f17',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-18',
      questionLabel: 'con3_f18',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-19',
      questionLabel: 'reg1_f19',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-20',
      questionLabel: 'reg2_f20',
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
      questionLabel: 'reg3_f21',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-22',
      questionLabel: 'att1_f22',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-23',
      questionLabel: 'att2_f23',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-24',
      questionLabel: 'att3_f24',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-25',
      questionLabel: 'eff1_f25',
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
      questionLabel: 'eff2_f26',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-27',
      questionLabel: 'eff3_f27',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-28',
      questionLabel: 'time1_f28',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-29',
      questionLabel: 'time2_f29',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-30',
      questionLabel: 'time3_f30',
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
      questionLabel: 'lrn_w_cls1_f31',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-32',
      questionLabel: 'lrn_w_cls2_f32',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-33',
      questionLabel: 'lrn_w_cls3_f33',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-34',
      questionLabel: 'lit_res1_f34',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-35',
      questionLabel: 'lit_res2_f35',
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
      questionLabel: 'lit_res3_f36',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-37',
      questionLabel: 'lrn_env1_f37',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-38',
      questionLabel: 'lrn_env2_f38',
      answer1: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-1',
      answer2: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-2',
      answer3: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-3',
      answer4: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-4',
      answer5: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Answer-5'
    },
    {
      question: 'components.Questionnaire.QuestionnaireQuestions.Table.TableListKQuestions.Question-39',
      questionLabel: 'lrn_env3_f39',
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
  const { sendAnswers, isSending } = useHandleSend()
  const { addSnackbar } = useContext(SnackbarContext)

  const { t } = useTranslation()

  const [activeStep, setActiveStep] = useState(0)
  const [radioButtonGroup1, setRadioButtonGroup1] = useState('')
  const [radioButtonGroup2, setRadioButtonGroup2] = useState('')
  const [radioButtonGroup3, setRadioButtonGroup3] = useState('')
  const [radioButtonGroup4, setRadioButtonGroup4] = useState('')
  const [radioButtonGroup5, setRadioButtonGroup5] = useState('')

  const handleSendClick = async () => {
    await sendAnswers().then((res) => {
          if(res){
            addSnackbar({
              message: 'Data send successfully',
              severity: 'success',
              autoHideDuration: 5000
            })
          }
          else{
            addSnackbar({
              message: 'Data could not be sent',
              severity: 'error',
              autoHideDuration: 5000
            })
          }
        }
    )

  }

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
      const selectedAnswer = radioButtonOptions.indexOf(event.target.value) + 1
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
            handleSend={handleSendClick}
            isNextDisabled={isNextDisabled}
            isValid={activeStep === 7}
            idType={'ListK'}
            isSending={isSending}
          />
        </Stack>
      </Stack>
    </Box>
  )
})
// endregion
