import '@testing-library/jest-dom'
//tests fail because of i18next, if import is shortened
import { ResultDescriptionListK } from '@components'

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => {
        if (str === 'components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced') return 'balanced'
        else return str
      },
      i18n: {
        //changeLanguage: () => new Promise(() => {}),
        getFixedT: () => (str: string) => {
          if (str === 'components.Questionnaire.QuestionnaireResults.Table.TableILS.balanced') return 'balanced'
          else return str
        }
        // You can include here any property your component may use
      }
    }
  }
}))

const mockListK = {
  characteristic_id: 1,
  id: 1,
  att: 1,
  cogn_str: 1,
  con: 1,
  crit_rev: 1,
  eff: 1,
  elab: 1,
  ext_res_mng_str: 1,
  goal_plan: 1,
  int_res_mng_str: 1,
  lit_res: 1,
  lrn_env: 1,
  lrn_w_cls: 1,
  metacogn_str: 1,
  org: 1,
  reg: 1,
  rep: 1,
  time: 1
}

describe('Test ResultDescriptionListK with all Methods', () => {
  test('General Description is correct', () => {
    const container = ResultDescriptionListK({ data: mockListK })

    expect(container.props.children[0].key).toBe('GeneralDescriptionListK')
    expect(container.key).toMatch('ResultDescriptionListK')
  })

  test('All Descriptions are shown (when everything is below 3)', () => {
    const container = ResultDescriptionListK({ data: mockListK })

    expect(container.props.children.length).toBe(4)
    expect(container.key).toMatch('ResultDescriptionListK')
    expect(container.props.children[1][0].key).toMatch('CognitiveStrategiesDescriptionListK')
    expect(container.props.children[2][0].key).toMatch('MetaCognitiveStrategiesDescriptionListK')
    expect(container.props.children[3][0].key).toMatch('RelevantSubscalesBelow3DescriptionListK')
  })

  test('General Description and Cognitive Strategies is shown', () => {
    const mockListK = {
      characteristic_id: 1,
      id: 1,
      att: 5,
      cogn_str: 5,
      con: 5,
      crit_rev: 1,
      eff: 5,
      elab: 1,
      ext_res_mng_str: 5,
      goal_plan: 5,
      int_res_mng_str: 5,
      lit_res: 5,
      lrn_env: 5,
      lrn_w_cls: 5,
      metacogn_str: 5,
      org: 1,
      reg: 5,
      rep: 1,
      time: 5
    }

    const container = ResultDescriptionListK({ data: mockListK })

    expect(container.key).toMatch('ResultDescriptionListK')
    expect(container.props.children[1][0].key).toMatch('CognitiveStrategiesDescriptionListK')
    expect(container.props.children[2]).toStrictEqual([])
    expect(container.props.children[3]).toStrictEqual([])
  })

  test('General Description and Metacognitive Strategies is shown', () => {
    const mockListK = {
      characteristic_id: 1,
      id: 1,
      att: 5,
      cogn_str: 5,
      con: 1,
      crit_rev: 5,
      eff: 5,
      elab: 5,
      ext_res_mng_str: 5,
      goal_plan: 1,
      int_res_mng_str: 5,
      lit_res: 5,
      lrn_env: 5,
      lrn_w_cls: 5,
      metacogn_str: 5,
      org: 5,
      reg: 1,
      rep: 5,
      time: 5
    }

    const container = ResultDescriptionListK({ data: mockListK })

    expect(container.key).toMatch('ResultDescriptionListK')
    expect(container.props.children[1]).toStrictEqual([])
    expect(container.props.children[2][0].key).toMatch('MetaCognitiveStrategiesDescriptionListK')
    expect(container.props.children[3]).toStrictEqual([])
  })

  test('Attention and Time below 3', () => {
    const mockListK = {
      characteristic_id: 1,
      id: 1,
      att: 1,
      cogn_str: 5,
      con: 5,
      crit_rev: 5,
      eff: 5,
      elab: 5,
      ext_res_mng_str: 5,
      goal_plan: 5,
      int_res_mng_str: 5,
      lit_res: 5,
      lrn_env: 5,
      lrn_w_cls: 5,
      metacogn_str: 5,
      org: 5,
      reg: 5,
      rep: 5,
      time: 1
    }

    const container = ResultDescriptionListK({ data: mockListK })

    expect(container.props.children[3][0].props.children[0].props.children.substring(69, 93)).toMatch(
      'attention && time Below3'
    )
  })

  test('Attention below 3', () => {
    const mockListK = {
      characteristic_id: 1,
      id: 1,
      att: 1,
      cogn_str: 5,
      con: 5,
      crit_rev: 5,
      eff: 5,
      elab: 5,
      ext_res_mng_str: 5,
      goal_plan: 5,
      int_res_mng_str: 5,
      lit_res: 5,
      lrn_env: 5,
      lrn_w_cls: 5,
      metacogn_str: 5,
      org: 5,
      reg: 5,
      rep: 5,
      time: 5
    }

    const container = ResultDescriptionListK({ data: mockListK })

    expect(container.props.children[3][0].props.children[0].props.children.substring(69, 85)).toMatch(
      'attention Below3'
    )
  })

  test('Attention and Time and Learning with Classmates below 3', () => {
    const mockListK = {
      characteristic_id: 1,
      id: 1,
      att: 1,
      cogn_str: 5,
      con: 5,
      crit_rev: 5,
      eff: 5,
      elab: 5,
      ext_res_mng_str: 5,
      goal_plan: 5,
      int_res_mng_str: 5,
      lit_res: 5,
      lrn_env: 5,
      lrn_w_cls: 1,
      metacogn_str: 5,
      org: 5,
      reg: 5,
      rep: 5,
      time: 1
    }

    const container = ResultDescriptionListK({ data: mockListK })

    expect(container.props.children[3][0].props.children[0].props.children.substring(69, 116)).toMatch(
      'attention && time && learnWithClassmates Below3'
    )
  })

  test('Attention and Time and Learning with Classmates and Literature Reasearch below 3', () => {
    const mockListK = {
      characteristic_id: 1,
      id: 1,
      att: 1,
      cogn_str: 5,
      con: 5,
      crit_rev: 5,
      eff: 5,
      elab: 5,
      ext_res_mng_str: 5,
      goal_plan: 5,
      int_res_mng_str: 5,
      lit_res: 1,
      lrn_env: 5,
      lrn_w_cls: 1,
      metacogn_str: 5,
      org: 5,
      reg: 5,
      rep: 5,
      time: 1
    }

    const container = ResultDescriptionListK({ data: mockListK })

    expect(container.props.children[3][0].props.children[0].props.children.substring(69, 138)).toMatch(
      'attention && time && learnWithClassmates && literatureResearch Below3'
    )
  })

  test('Attention and Time and Learning with Classmates and Literature Reasearch and Learning Environment below 3', () => {
    const mockListK = {
      characteristic_id: 1,
      id: 1,
      att: 1,
      cogn_str: 5,
      con: 5,
      crit_rev: 5,
      eff: 5,
      elab: 5,
      ext_res_mng_str: 5,
      goal_plan: 5,
      int_res_mng_str: 5,
      lit_res: 1,
      lrn_env: 1,
      lrn_w_cls: 1,
      metacogn_str: 5,
      org: 5,
      reg: 5,
      rep: 5,
      time: 1
    }

    const container = ResultDescriptionListK({ data: mockListK })

    expect(container.props.children[3][0].props.children[0].props.children.substring(69, 161)).toMatch(
      'attention && time && learnWithClassmates && literatureResearch && learningEnvironment Below3'
    )
  })
})
