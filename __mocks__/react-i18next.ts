const reactI18Next: any = jest.createMockFromModule('react-i18next')

const useTranslation = () => {
  return {
    t: (str: string) => {
      switch (str) {
        case 'components.CreateLearningElementClassificationTable.classifications':
          return [
            {
              name: 'Select Classification',
              key: 'noKey',
              disabled: true
            },
            {
              name: 'LZ - Learning Objective',
              key: 'LZ',
              disabled: false
            },
            {
              name: 'KÜ - Overview',
              key: 'KÜ',
              disabled: false
            },
            {
              name: 'FO - Forum',
              key: 'FO',
              disabled: false
            },
            {
              name: 'EK - Explanation',
              key: 'EK',
              disabled: false
            },
            {
              name: 'AN - Animation',
              key: 'AN',
              disabled: false
            },
            {
              name: 'BE - Example',
              key: 'BE',
              disabled: false
            },
            {
              name: 'AB - Application Example',
              key: 'AB',
              disabled: false
            },
            {
              name: 'ÜB - Exercise',
              key: 'ÜB',
              disabled: false
            },
            {
              name: 'SE - Self-Assessment Test',
              key: 'SE',
              disabled: false
            },
            {
              name: 'ZL - Additional Literature',
              key: 'ZL',
              disabled: false
            },
            {
              name: 'ZF - Summary',
              key: 'ZF',
              disabled: false
            },
            {
              name: 'RQ - Reflective Quiz',
              key: 'RQ',
              disabled: false
            }
          ]
        case 'components.ContactForm.types':
          return [
            { value: '1', label: 'issue' },
            { value: '2', label: 'Something' }
          ]
        case 'components.ContactForm.topics':
          return [
            { value: '1', label: 'Learningelement' },
            { value: '2', label: 'idk' }
          ]
        case 'components.TableILSQuestions.ilsLong':
          return [
            [
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: ''
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-1',
                questionLabel: 'AR_1_F1',
                answer1: 'components.TableILSQuestions.answer-1-1',
                answer2: 'components.TableILSQuestions.answer-1-2'
              },
              {
                question: 'components.TableILSQuestions.question-2',
                questionLabel: 'SI_1_F2',
                answer1: 'components.TableILSQuestions.answer-2-1',
                answer2: 'components.TableILSQuestions.answer-2-2'
              },
              {
                question: 'components.TableILSQuestions.question-3',
                questionLabel: 'VV_1_F3',
                answer1: 'components.TableILSQuestions.answer-3-1',
                answer2: 'components.TableILSQuestions.answer-3-2'
              },
              {
                question: 'components.TableILSQuestions.question-4',
                questionLabel: 'SG_1_F4',
                answer1: 'components.TableILSQuestions.answer-4-1',
                answer2: 'components.TableILSQuestions.answer-4-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-5',
                questionLabel: 'AR_2_F5',
                answer1: 'components.TableILSQuestions.answer-5-1',
                answer2: 'components.TableILSQuestions.answer-5-2'
              },
              {
                question: 'components.TableILSQuestions.question-6',
                questionLabel: 'SI_2_F6',
                answer1: 'components.TableILSQuestions.answer-6-1',
                answer2: 'components.TableILSQuestions.answer-6-2'
              },
              {
                question: 'components.TableILSQuestions.question-7',
                questionLabel: 'VV_2_F7',
                answer1: 'components.TableILSQuestions.answer-7-1',
                answer2: 'components.TableILSQuestions.answer-7-2'
              },
              {
                question: 'components.TableILSQuestions.question-8',
                questionLabel: 'SG_2_F8',
                answer1: 'components.TableILSQuestions.answer-8-1',
                answer2: 'components.TableILSQuestions.answer-8-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-9',
                questionLabel: 'AR_3_F9',
                answer1: 'components.TableILSQuestions.answer-9-1',
                answer2: 'components.TableILSQuestions.answer-9-2'
              },
              {
                question: 'components.TableILSQuestions.question-10',
                questionLabel: 'SI_3_F10',
                answer1: 'components.TableILSQuestions.answer-10-1',
                answer2: 'components.TableILSQuestions.answer-10-2'
              },
              {
                question: 'components.TableILSQuestions.question-11',
                questionLabel: 'VV_3_F11',
                answer1: 'components.TableILSQuestions.answer-11-1',
                answer2: 'components.TableILSQuestions.answer-11-2'
              },
              {
                question: 'components.TableILSQuestions.question-12',
                questionLabel: 'SG_3_F12',
                answer1: 'components.TableILSQuestions.answer-12-1',
                answer2: 'components.TableILSQuestions.answer-12-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-13',
                questionLabel: 'AR_4_F13',
                answer1: 'components.TableILSQuestions.answer-13-1',
                answer2: 'components.TableILSQuestions.answer-13-2'
              },
              {
                question: 'components.TableILSQuestions.question-14',
                questionLabel: 'SI_4_F14',
                answer1: 'components.TableILSQuestions.answer-14-1',
                answer2: 'components.TableILSQuestions.answer-14-2'
              },
              {
                question: 'components.TableILSQuestions.question-15',
                questionLabel: 'VV_4_F15',
                answer1: 'components.TableILSQuestions.answer-15-1',
                answer2: 'components.TableILSQuestions.answer-15-2'
              },
              {
                question: 'components.TableILSQuestions.question-16',
                questionLabel: 'SG_4_F16',
                answer1: 'components.TableILSQuestions.answer-16-1',
                answer2: 'components.TableILSQuestions.answer-16-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-17',
                questionLabel: 'AR_5_F17',
                answer1: 'components.TableILSQuestions.answer-17-1',
                answer2: 'components.TableILSQuestions.answer-17-2'
              },
              {
                question: 'components.TableILSQuestions.question-18',
                questionLabel: 'SI_5_F18',
                answer1: 'components.TableILSQuestions.answer-18-1',
                answer2: 'components.TableILSQuestions.answer-18-2'
              },
              {
                question: 'components.TableILSQuestions.question-19',
                questionLabel: 'VV_5_F19',
                answer1: 'components.TableILSQuestions.answer-19-1',
                answer2: 'components.TableILSQuestions.answer-19-2'
              },
              {
                question: 'components.TableILSQuestions.question-20',
                questionLabel: 'SG_5_F20',
                answer1: 'components.TableILSQuestions.answer-20-1',
                answer2: 'components.TableILSQuestions.answer-20-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-21',
                questionLabel: 'AR_6_F21',
                answer1: 'components.TableILSQuestions.answer-21-1',
                answer2: 'components.TableILSQuestions.answer-21-2'
              },
              {
                question: 'components.TableILSQuestions.question-22',
                questionLabel: 'SI_6_F22',
                answer1: 'components.TableILSQuestions.answer-22-1',
                answer2: 'components.TableILSQuestions.answer-22-2'
              },
              {
                question: 'components.TableILSQuestions.question-23',
                questionLabel: 'VV_6_F23',
                answer1: 'components.TableILSQuestions.answer-23-1',
                answer2: 'components.TableILSQuestions.answer-23-2'
              },
              {
                question: 'components.TableILSQuestions.question-24',
                questionLabel: 'SG_6_F24',
                answer1: 'components.TableILSQuestions.answer-24-1',
                answer2: 'components.TableILSQuestions.answer-24-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-25',
                questionLabel: 'AR_7_F25',
                answer1: 'components.TableILSQuestions.answer-25-1',
                answer2: 'components.TableILSQuestions.answer-25-2'
              },
              {
                question: 'components.TableILSQuestions.question-26',
                questionLabel: 'SI_7_F26',
                answer1: 'components.TableILSQuestions.answer-26-1',
                answer2: 'components.TableILSQuestions.answer-26-2'
              },
              {
                question: 'components.TableILSQuestions.question-27',
                questionLabel: 'VV_7_F27',
                answer1: 'components.TableILSQuestions.answer-27-1',
                answer2: 'components.TableILSQuestions.answer-27-2'
              },
              {
                question: 'components.TableILSQuestions.question-28',
                questionLabel: 'SG_7_F28',
                answer1: 'components.TableILSQuestions.answer-28-1',
                answer2: 'components.TableILSQuestions.answer-28-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-29',
                questionLabel: 'AR_8_F29',
                answer1: 'components.TableILSQuestions.answer-29-1',
                answer2: 'components.TableILSQuestions.answer-29-2'
              },
              {
                question: 'components.TableILSQuestions.question-30',
                questionLabel: 'SI_8_F30',
                answer1: 'components.TableILSQuestions.answer-30-1',
                answer2: 'components.TableILSQuestions.answer-30-2'
              },
              {
                question: 'components.TableILSQuestions.question-31',
                questionLabel: 'VV_8_F31',
                answer1: 'components.TableILSQuestions.answer-31-1',
                answer2: 'components.TableILSQuestions.answer-31-2'
              },
              {
                question: 'components.TableILSQuestions.question-32',
                questionLabel: 'SG_8_F32',
                answer1: 'components.TableILSQuestions.answer-32-1',
                answer2: 'components.TableILSQuestions.answer-32-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-33',
                questionLabel: 'AR_9_F33',
                answer1: 'components.TableILSQuestions.answer-33-1',
                answer2: 'components.TableILSQuestions.answer-33-2'
              },
              {
                question: 'components.TableILSQuestions.question-34',
                questionLabel: 'SI_9_F34',
                answer1: 'components.TableILSQuestions.answer-34-1',
                answer2: 'components.TableILSQuestions.answer-34-2'
              },
              {
                question: 'components.TableILSQuestions.question-35',
                questionLabel: 'VV_9_F35',
                answer1: 'components.TableILSQuestions.answer-35-1',
                answer2: 'components.TableILSQuestions.answer-35-2'
              },
              {
                question: 'components.TableILSQuestions.question-36',
                questionLabel: 'SG_9_F36',
                answer1: 'components.TableILSQuestions.answer-36-1',
                answer2: 'components.TableILSQuestions.answer-36-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-37',
                questionLabel: 'AR_10_F37',
                answer1: 'components.TableILSQuestions.answer-37-1',
                answer2: 'components.TableILSQuestions.answer-37-2'
              },
              {
                question: 'components.TableILSQuestions.question-38',
                questionLabel: 'SI_10_F38',
                answer1: 'components.TableILSQuestions.answer-38-1',
                answer2: 'components.TableILSQuestions.answer-38-2'
              },
              {
                question: 'components.TableILSQuestions.question-39',
                questionLabel: 'VV_10_F39',
                answer1: 'components.TableILSQuestions.answer-39-1',
                answer2: 'components.TableILSQuestions.answer-39-2'
              },
              {
                question: 'components.TableILSQuestions.question-40',
                questionLabel: 'SG_10_F40',
                answer1: 'components.TableILSQuestions.answer-40-1',
                answer2: 'components.TableILSQuestions.answer-40-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-41',
                questionLabel: 'AR_11_F41',
                answer1: 'components.TableILSQuestions.answer-41-1',
                answer2: 'components.TableILSQuestions.answer-41-2'
              },
              {
                question: 'components.TableILSQuestions.question-42',
                questionLabel: 'SI_11_F42',
                answer1: 'components.TableILSQuestions.answer-42-1',
                answer2: 'components.TableILSQuestions.answer-42-2'
              },
              {
                question: 'components.TableILSQuestions.question-43',
                questionLabel: 'VV_11_F43',
                answer1: 'components.TableILSQuestions.answer-43-1',
                answer2: 'components.TableILSQuestions.answer-43-2'
              },
              {
                question: 'components.TableILSQuestions.question-44',
                questionLabel: 'SG_11_F44',
                answer1: 'components.TableILSQuestions.answer-44-1',
                answer2: 'components.TableILSQuestions.answer-44-2'
              }
            ]
          ]
        case 'components.TableILSQuestions.ilsShort':
          return [
            [
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: ''
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-9',
                questionLabel: 'AR_3_F9',
                answer1: 'components.TableILSQuestions.answer-9-1',
                answer2: 'components.TableILSQuestions.answer-9-2'
              },
              {
                question: 'components.TableILSQuestions.question-2',
                questionLabel: 'SI_1_F2',
                answer1: 'components.TableILSQuestions.answer-2-1',
                answer2: 'components.TableILSQuestions.answer-2-2'
              },
              {
                question: 'components.TableILSQuestions.question-7',
                questionLabel: 'VV_2_F7',
                answer1: 'components.TableILSQuestions.answer-7-1',
                answer2: 'components.TableILSQuestions.answer-7-2'
              },
              {
                question: 'components.TableILSQuestions.question-4',
                questionLabel: 'SG_1_F4',
                answer1: 'components.TableILSQuestions.answer-4-1',
                answer2: 'components.TableILSQuestions.answer-4-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-13',
                questionLabel: 'AR_4_F13',
                answer1: 'components.TableILSQuestions.answer-13-1',
                answer2: 'components.TableILSQuestions.answer-13-2'
              },
              {
                question: 'components.TableILSQuestions.question-14',
                questionLabel: 'SI_4_F14',
                answer1: 'components.TableILSQuestions.answer-14-1',
                answer2: 'components.TableILSQuestions.answer-14-2'
              },
              {
                question: 'components.TableILSQuestions.question-19',
                questionLabel: 'VV_5_F19',
                answer1: 'components.TableILSQuestions.answer-19-1',
                answer2: 'components.TableILSQuestions.answer-19-2'
              },
              {
                question: 'components.TableILSQuestions.question-8',
                questionLabel: 'SG_2_F8',
                answer1: 'components.TableILSQuestions.answer-8-1',
                answer2: 'components.TableILSQuestions.answer-8-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-21',
                questionLabel: 'AR_6_F21',
                answer1: 'components.TableILSQuestions.answer-21-1',
                answer2: 'components.TableILSQuestions.answer-21-2'
              },
              {
                question: 'components.TableILSQuestions.question-26',
                questionLabel: 'SI_7_F26',
                answer1: 'components.TableILSQuestions.answer-26-1',
                answer2: 'components.TableILSQuestions.answer-26-2'
              },
              {
                question: 'components.TableILSQuestions.question-27',
                questionLabel: 'VV_7_F27',
                answer1: 'components.TableILSQuestions.answer-27-1',
                answer2: 'components.TableILSQuestions.answer-27-2'
              },
              {
                question: 'components.TableILSQuestions.question-16',
                questionLabel: 'SG_4_F16',
                answer1: 'components.TableILSQuestions.answer-16-1',
                answer2: 'components.TableILSQuestions.answer-16-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-25',
                questionLabel: 'AR_7_F25',
                answer1: 'components.TableILSQuestions.answer-25-1',
                answer2: 'components.TableILSQuestions.answer-25-2'
              },
              {
                question: 'components.TableILSQuestions.question-38',
                questionLabel: 'SI_10_F38',
                answer1: 'components.TableILSQuestions.answer-38-1',
                answer2: 'components.TableILSQuestions.answer-38-2'
              },
              {
                question: 'components.TableILSQuestions.question-39',
                questionLabel: 'VV_10_F39',
                answer1: 'components.TableILSQuestions.answer-39-1',
                answer2: 'components.TableILSQuestions.answer-39-2'
              },
              {
                question: 'components.TableILSQuestions.question-40',
                questionLabel: 'SG_10_F40',
                answer1: 'components.TableILSQuestions.answer-40-1',
                answer2: 'components.TableILSQuestions.answer-40-2'
              }
            ],
            [
              {
                question: 'components.TableILSQuestions.question-29',
                questionLabel: 'AR_8_F29',
                answer1: 'components.TableILSQuestions.answer-29-1',
                answer2: 'components.TableILSQuestions.answer-29-2'
              },
              {
                question: 'components.TableILSQuestions.question-42',
                questionLabel: 'SI_11_F42',
                answer1: 'components.TableILSQuestions.answer-42-1',
                answer2: 'components.TableILSQuestions.answer-42-2'
              },
              {
                question: 'components.TableILSQuestions.question-43',
                questionLabel: 'VV_11_F43',
                answer1: 'components.TableILSQuestions.answer-43-1',
                answer2: 'components.TableILSQuestions.answer-43-2'
              },
              {
                question: 'components.TableILSQuestions.question-44',
                questionLabel: 'SG_11_F44',
                answer1: 'components.TableILSQuestions.answer-44-1',
                answer2: 'components.TableILSQuestions.answer-44-2'
              }
            ]
          ]
        case 'components.ListKQuestions':
          return [
            [
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-1',
                questionLabel: 'org1_f1',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-2',
                questionLabel: 'org2_f2',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-3',
                questionLabel: 'org3_f3',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-4',
                questionLabel: 'elab1_f4',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-5',
                questionLabel: 'elab2_f5',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-6',
                questionLabel: 'elab3_f6',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-7',
                questionLabel: 'crit_rev1_f7',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-8',
                questionLabel: 'crit_rev2_f8',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-9',
                questionLabel: 'crit_rev3_f9',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-10',
                questionLabel: 'rep1_f10',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-11',
                questionLabel: 'rep2_f11',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-12',
                questionLabel: 'rep3_f12',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-13',
                questionLabel: 'goal_plan1_f13',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-14',
                questionLabel: 'goal_plan2_f14',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-15',
                questionLabel: 'goal_plan3_f15',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-16',
                questionLabel: 'con1_f16',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-17',
                questionLabel: 'con2_f17',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-18',
                questionLabel: 'con3_f18',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-19',
                questionLabel: 'reg1_f19',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-20',
                questionLabel: 'reg2_f20',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-21',
                questionLabel: 'reg3_f21',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-22',
                questionLabel: 'att1_f22',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-23',
                questionLabel: 'att2_f23',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-24',
                questionLabel: 'att3_f24',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-25',
                questionLabel: 'eff1_f25',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-26',
                questionLabel: 'eff2_f26',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-27',
                questionLabel: 'eff3_f27',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-28',
                questionLabel: 'time1_f28',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-29',
                questionLabel: 'time2_f29',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-30',
                questionLabel: 'time3_f30',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-31',
                questionLabel: 'lrn_w_cls1_f31',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-32',
                questionLabel: 'lrn_w_cls2_f32',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-33',
                questionLabel: 'lrn_w_cls3_f33',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-34',
                questionLabel: 'lit_res1_f34',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-35',
                questionLabel: 'lit_res2_f35',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-36',
                questionLabel: 'lit_res3_f36',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-37',
                questionLabel: 'lrn_env1_f37',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-38',
                questionLabel: 'lrn_env2_f38',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-39',
                questionLabel: 'lrn_env3_f39',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ]
          ]
        case 'components.ListKQuestions.Undefined':
          return [
            [
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              },
              {
                question: '',
                questionLabel: '',
                answer1: '',
                answer2: '',
                answer3: '',
                answer4: '',
                answer5: ''
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-1',
                questionLabel: 'org1_f1',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-2',
                questionLabel: 'org2_f2',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-3',
                questionLabel: 'org3_f3',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-4',
                questionLabel: 'elab1_f4',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-5',
                questionLabel: 'elab2_f5',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-6',
                questionLabel: 'elab3_f6',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-7',
                questionLabel: 'crit_rev1_f7',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-8',
                questionLabel: 'crit_rev2_f8',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-9',
                questionLabel: 'crit_rev3_f9',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-10',
                questionLabel: 'rep1_f10',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-11',
                questionLabel: 'rep2_f11',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-12',
                questionLabel: 'rep3_f12',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-13',
                questionLabel: 'goal_plan1_f13',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-14',
                questionLabel: 'goal_plan2_f14',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-15',
                questionLabel: 'goal_plan3_f15',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-16',
                questionLabel: 'con1_f16',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-17',
                questionLabel: 'con2_f17',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-18',
                questionLabel: 'con3_f18',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-19',
                questionLabel: 'reg1_f19',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-20',
                questionLabel: 'reg2_f20',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-21',
                questionLabel: 'reg3_f21',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-22',
                questionLabel: 'att1_f22',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-23',
                questionLabel: 'att2_f23',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-24',
                questionLabel: 'att3_f24',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-25',
                questionLabel: 'eff1_f25',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-26',
                questionLabel: 'eff2_f26',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-27',
                questionLabel: 'eff3_f27',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-28',
                questionLabel: 'time1_f28',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-29',
                questionLabel: 'time2_f29',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-30',
                questionLabel: 'time3_f30',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-31',
                questionLabel: 'lrn_w_cls1_f31',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-32',
                questionLabel: 'lrn_w_cls2_f32',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-33',
                questionLabel: 'lrn_w_cls3_f33',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-34',
                questionLabel: 'lit_res1_f34',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-35',
                questionLabel: 'lit_res2_f35',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              }
            ],
            [
              {
                question: 'components.TableListKQuestions.question-36',
                questionLabel: 'lit_res3_f36',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-37',
                questionLabel: 'lrn_env1_f37',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-38',
                questionLabel: 'lrn_env2_f38',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'components.TableListKQuestions.question-39',
                questionLabel: 'lrn_env3_f39',
                answer1: 'components.TableListKQuestions.answer-1',
                answer2: 'components.TableListKQuestions.answer-2',
                answer3: 'components.TableListKQuestions.answer-3',
                answer4: 'components.TableListKQuestions.answer-4',
                answer5: 'components.TableListKQuestions.answer-5'
              },
              {
                question: 'this question is only for testing purposes',
                questionLabel: 'undefined_f40',
                answer1: 'Undefined.Answer-1',
                answer2: 'Undefined.Answer-2',
                answer3: 'Undefined.Answer-3',
                answer4: 'Undefined.Answer-4',
                answer5: 'Undefined.Answer-5'
              }
            ]
          ]
        case 'components.AlgorithmSettingsModal.algorithms':
          return  [
            {
              "name": "Select Algorithm",
              "description": "Please select an algorithm for the learning path calculation.",
              "key": "noKey",
              "disabled": true
            },
            {
              "name": "Fixed Order",
              "description": "The learning elements are presented in a predetermined order.",
              "key": "default",
              "disabled": false
            },
            {
              "name": "Graf",
              "description": "This algorithm is based on the learning adaptive mechanism by Graf et al. It calculates the learning path based on the learning style of the learner.",
              "key": "graf",
              "disabled": false
            },
            {
              "name": "ACO",
              "description": "The Ant Colony Algorithm (ACO) is inspired by the behavior of ant workers. It calculates the learning path by simulating ants who leave behind pheromones to mark the best path.",
              "key": "aco",
              "disabled": false
            },
            {
              "name": "Genetic Algorithm",
              "description": "Based on natural selection, it combines learning paths to evolve the best one over several iterations.",
              "key": "ga",
              "disabled": false
            }
          ]
        default:
          return str
      }
    },
    i18n: {
      changeLanguage: () =>
        new Promise(() => {
          return
        }),
      getFixedT: () => (str: string) => {
        if (str === 'components.TableILS.balanced') return 'balanced'
        else return str.substring(20, str.length)
      }
    }
  }
}

const initReactI18next = {
  type: '3rdParty',
  init: jest.fn()
}

const I18nextProvider = ({ children }: any) => {
  return children
}

export { useTranslation, initReactI18next, I18nextProvider, reactI18Next }
