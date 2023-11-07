const reactI18Next: any = jest.createMockFromModule('react-i18next')

const useTranslation = () => {
  return {
    t: (str: string) => {
      switch (str) {
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
        case 'components.Questionnaire.QuestionnaireQuestions.Table.ILSLongQuestions':
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
        case 'components.Questionnaire.QuestionnaireQuestions.Table.ILSShortQuestions':
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
        case 'components.Questionnaire.QuestionnaireQuestions.Table.ListKQuestions':
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
        case 'components.Questionnaire.QuestionnaireQuestions.Table.ListKQuestions.Undefined':
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
        if (str === 'components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced') return 'balanced'
        else return str.substring(61, str.length)
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
