import * as statement from './getStatement'
import '@testing-library/jest-dom'

describe('getStatement tests', () => {
  test('getContextActivities returns empty object', () => {
    expect(statement.getContextActivities('/', () => 'pages.test')).toStrictEqual({})
  })

  test('getContextActivities only returns parent', () => {
    expect(statement.getContextActivities('/test', () => 'pages.test')).toStrictEqual({
      parent: [
        {
          id: new URL(window.location.href).origin.concat('/test'),
          definition: {
            type: '/pages/test',
            name: {
              en: 'pages.test'
            }
          }
        }
      ]
    })
  })

  test('getContextActivities returns parent and grouping', () => {
    expect(statement.getContextActivities('/test/test', () => 'pages.test')).toStrictEqual({
      parent: [
        {
          id: new URL(window.location.href).origin.concat('/test/test'),
          definition: {
            type: '/pages/test',
            name: {
              en: 'pages.test'
            }
          }
        }
      ],
      grouping: [
        {
          id: new URL(window.location.href).origin,
          definition: {
            type: '/pages/home',
            name: {
              en: 'Home'
            }
          }
        }
      ]
    })
  })

  test('getStatement', () => {
    expect(
      statement.getStatement(
        '0',
        'clicked',
        '/',
        '0',
        'Button',
        () => 'pages.test',
        '/common/components/DefaultButton/DefaultButton'
      )
    ).toStrictEqual({
      actor: {
        account: {
          homePage: new URL(window.location.href).origin,
          name: '0'
        }
      },
      verb: {
        id: '/verbs/clicked',
        display: {
          en: 'clicked'
        }
      },
      object: {
        id: new URL(window.location.href).origin.concat('/#0'),
        definition: {
          name: {
            en: 'Button'
          },
          type: '/common/components/button'
        }
      },
      context: {
        platform: 'Frontend',
        language: localStorage.getItem('i18nextLng') ?? '',
        extensions: {
          'http://lrs.learninglocker.net/define/extensions/info': {
            domain: new URL(window.location.href).origin,
            domain_version: '',
            github: '',
            event_function: 'src/common/components/DefaultButton/DefaultButton'
          }
        },
        contextActivities: {}
      },
      timestamp: expect.any(String)
    })
  })
})
