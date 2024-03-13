import { useTranslation } from 'react-i18next'
import { Network } from '@common/components'
import { ListK } from '@core'

// Center the Score beneath the Subscale name. That is done with Whitespaces before the score.
const centerString = (str: string, maxLen: number): string => str.padStart((str.length + maxLen * 1.5) / 2)

export const useData = (
  data: ListK
): {
  nodes: { id: string; height: number; size: number; score: number; color: string }[]
  links: { source: string; target: string; distance: number }[]
} => {
  const { t } = useTranslation()

  // Center the Score beneath the Subscale name. That is done with Whitespaces before the score.
  const organizeCentered =
    t('components.TableListK.organize') +
    '\n' +
    centerString(data.org.toFixed(2), t('components.TableListK.organize').length)
  const elaborateCentered =
    t('components.TableListK.elaborate') +
    '\n' +
    centerString(data.elab.toFixed(2), t('components.TableListK.elaborate').length)
  const criticalReviewCentered =
    t('components.TableListK.criticalReview') +
    '\n' +
    centerString(data.crit_rev.toFixed(2), t('components.TableListK.criticalReview').length)
  const repeatCentered =
    t('components.TableListK.repeat') +
    '\n' +
    centerString(data.rep.toFixed(2), t('components.TableListK.repeat').length)
  const attentionCentered =
    t('components.TableListK.attention') +
    '\n' +
    centerString(data.att.toFixed(2), t('components.TableListK.attention').length)
  const effortCentered =
    t('components.TableListK.effort') +
    '\n' +
    centerString(data.eff.toFixed(2), t('components.TableListK.effort').length)
  const timeCentered =
    t('components.TableListK.time') + '\n' + centerString(data.time.toFixed(2), t('components.TableListK.time').length)
  const goalsPlansCentered =
    t('components.TableListK.goalsAndPlans') +
    '\n' +
    centerString(data.goal_plan.toFixed(2), t('components.TableListK.goalsAndPlans').length)
  const controlCentered =
    t('components.TableListK.control') +
    '\n' +
    centerString(data.con.toFixed(2), t('components.TableListK.control').length)
  const regulateCentered =
    t('components.TableListK.regulate') +
    '\n' +
    centerString(data.reg.toFixed(2), t('components.TableListK.regulate').length)
  const learnWithClassmatesCentered =
    t('components.TableListK.learningWithClassmates') +
    '\n' +
    centerString(data.lrn_w_cls.toFixed(2), t('components.TableListK.learningWithClassmates').length)
  const literatureResearchCentered =
    t('components.TableListK.literatureResearch') +
    '\n' +
    centerString(data.lit_res.toFixed(2), t('components.TableListK.literatureResearch').length)
  const learningEnvironmentCentered =
    t('components.TableListK.learningEnvironment') +
    '\n' +
    centerString(data.lrn_env.toFixed(2), t('components.TableListK.learningEnvironment').length)

  return {
    nodes: [
      {
        id: t('components.TableListK.cognitiveStrategies'),
        height: 1,
        size: 12,
        score: data.cogn_str,
        color: 'rgb(97, 205, 187)'
      },
      {
        id: t('components.TableListK.internalResourceManagementStrategies'),
        height: 1,
        size: 12,
        score: data.int_res_mng_str,
        color: 'rgb(97, 205, 187)'
      },
      {
        id: t('components.TableListK.metacognitiveStrategies'),
        height: 1,
        size: 12,
        score: data.metacogn_str,
        color: 'rgb(97, 205, 187)'
      },
      {
        id: t('components.TableListK.externalResourceManagementStrategies'),
        height: 1,
        size: 12,
        score: data.ext_res_mng_str,
        color: 'rgb(97, 205, 187)'
      },
      {
        id: 'List K',
        height: 2,
        size: 12,
        score: 3,
        color: 'rgb(244, 117, 96)'
      },
      {
        id: organizeCentered,
        height: 0,
        size: 5,
        score: data.org,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: elaborateCentered,
        height: 0,
        size: 5,
        score: data.elab,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: criticalReviewCentered,
        height: 0,
        size: 5,
        score: data.crit_rev,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: repeatCentered,
        height: 0,
        size: 5,
        score: data.rep,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: attentionCentered,
        height: 0,
        size: 5,
        score: data.att,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: effortCentered,
        height: 0,
        size: 5,
        score: data.eff,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: timeCentered,
        height: 0,
        size: 5,
        score: data.time,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: goalsPlansCentered,
        height: 0,
        size: 5,
        score: data.goal_plan,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: controlCentered,
        height: 0,
        size: 5,
        score: data.con,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: regulateCentered,
        height: 0,
        size: 5,
        score: data.reg,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: learnWithClassmatesCentered,
        height: 0,
        size: 5,
        score: data.lrn_w_cls,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: literatureResearchCentered,
        height: 0,
        size: 5,
        score: data.lit_res,
        color: 'rgb(232, 193, 160)'
      },
      {
        id: learningEnvironmentCentered,
        height: 0,
        size: 5,
        score: data.lrn_env,
        color: 'rgb(232, 193, 160)'
      }
    ],
    links: [
      {
        source: 'List K',
        target: t('components.TableListK.cognitiveStrategies'),
        distance: 60
      },
      {
        source: t('components.TableListK.cognitiveStrategies'),
        target: organizeCentered,
        distance: 50
      },
      {
        source: t('components.TableListK.cognitiveStrategies'),
        target: elaborateCentered,
        distance: 50
      },
      {
        source: t('components.TableListK.cognitiveStrategies'),
        target: criticalReviewCentered,
        distance: 50
      },
      {
        source: t('components.TableListK.cognitiveStrategies'),
        target: repeatCentered,
        distance: 50
      },
      {
        source: 'List K',
        target: t('components.TableListK.internalResourceManagementStrategies'),
        distance: 50
      },
      {
        source: t('components.TableListK.internalResourceManagementStrategies'),
        target: attentionCentered,
        distance: 70
      },
      {
        source: t('components.TableListK.internalResourceManagementStrategies'),
        target: effortCentered,
        distance: 70
      },
      {
        source: t('components.TableListK.internalResourceManagementStrategies'),
        target: timeCentered,
        distance: 55
      },
      {
        source: 'List K',
        target: t('components.TableListK.metacognitiveStrategies'),
        distance: 50
      },
      {
        source: t('components.TableListK.metacognitiveStrategies'),
        target: goalsPlansCentered,
        distance: 60
      },
      {
        source: t('components.TableListK.metacognitiveStrategies'),
        target: controlCentered,
        distance: 50
      },
      {
        source: t('components.TableListK.metacognitiveStrategies'),
        target: regulateCentered,
        distance: 50
      },
      {
        source: 'List K',
        target: t('components.TableListK.externalResourceManagementStrategies'),
        distance: 70
      },
      {
        source: t('components.TableListK.externalResourceManagementStrategies'),
        target: learnWithClassmatesCentered,
        distance: 60
      },
      {
        source: t('components.TableListK.externalResourceManagementStrategies'),
        target: literatureResearchCentered,
        distance: 55
      },
      {
        source: t('components.TableListK.externalResourceManagementStrategies'),
        target: learningEnvironmentCentered,
        distance: 50
      }
    ]
  }
}

type GraphListKProps = {
  data: ListK
}

const GraphListK = ({ data }: GraphListKProps) => {
  const { t } = useTranslation()

  const graphListKData = useData(data)

  const cognitiveStrategies = t('components.TableListK.cognitiveStrategies')
  const intResMngtStrategies = t('components.TableListK.internalResourceManagementStrategies')
  const metacognitiveStrategies = t('components.TableListK.metacognitiveStrategies')
  const extResMngtStrategies = t('components.TableListK.externalResourceManagementStrategies')

  return (
    <Network
      height={500}
      width={650}
      data={graphListKData}
      margin={{ top: 0, right: 200, bottom: 80, left: 0 }}
      linkDistance={(e: { distance: number }) => e.distance}
      repulsivity={100}
      activeNodeSize={(n: { size: number }) => n.size * 3}
      nodeSize={(n: { size: number; score: number }) => n.size * (n.score * 0.6 + 1)}
      nodeColor={(e: { color: string }) => e.color}
      nodeBorderWidth={1.3}
      nodeBorderColor={(data: { data: { score: number } }) => {
        if (data.data.score >= 3) {
          return 'black'
        } else {
          return '#9c3641'
        }
      }}
      linkColor={{ from: 'source.color', modifiers: [] }}
      linkThickness={(n: { target: { data: { height: number } } }) => 2 + 2 * n.target.data.height}
      linkBlendMode="multiply"
      motionConfig="wobbly"
      animate={true}
      annotations={[
        {
          type: 'circle',
          match: {
            id: cognitiveStrategies
          },
          note:
            t('components.ResultDescriptionListK.score') +
            ': ' +
            (Math.round((data.cogn_str + Number.EPSILON) * 100) / 100).toFixed(2),
          noteX: -10,
          noteY: 40,
          offset: 13,
          noteTextOffset: 5
        },
        {
          type: 'circle',
          match: {
            id: cognitiveStrategies
          },
          note: cognitiveStrategies,
          noteX: -10,
          noteY: 40,
          offset: 13,
          noteTextOffset: -15
        },
        {
          type: 'circle',
          match: {
            id: intResMngtStrategies
          },
          note:
            t('components.ResultDescriptionListK.score') +
            ': ' +
            (Math.round((data.int_res_mng_str + Number.EPSILON) * 100) / 100).toFixed(2),
          noteWidth: 250,
          noteX: 50,
          noteY: 35,
          offset: 13,
          noteTextOffset: 5
        },
        {
          type: 'circle',
          match: {
            id: intResMngtStrategies
          },
          note: intResMngtStrategies,
          noteWidth: 250,
          noteX: 50,
          noteY: 35,
          offset: 13,
          noteTextOffset: -15
        },
        {
          type: 'circle',
          match: {
            id: metacognitiveStrategies
          },
          note:
            t('components.ResultDescriptionListK.score') +
            ': ' +
            (Math.round((data.metacogn_str + Number.EPSILON) * 100) / 100).toFixed(2),
          noteWidth: 145,
          noteX: -10,
          noteY: 100,
          offset: 13,
          noteTextOffset: 5
        },
        {
          type: 'circle',
          match: {
            id: metacognitiveStrategies
          },
          note: metacognitiveStrategies,
          noteWidth: 145,
          noteX: -10,
          noteY: 100,
          offset: 13,
          noteTextOffset: -15
        },
        {
          type: 'circle',
          match: {
            id: extResMngtStrategies
          },
          note:
            t('components.ResultDescriptionListK.score') +
            ': ' +
            (Math.round((data.ext_res_mng_str + Number.EPSILON) * 100) / 100).toFixed(2),
          noteWidth: 250,
          noteX: 10,
          noteY: 90,
          offset: 13,
          noteTextOffset: 5
        },
        {
          type: 'circle',
          match: {
            id: extResMngtStrategies
          },
          note: extResMngtStrategies,
          noteWidth: 250,
          noteX: 10,
          noteY: 90,
          offset: 13,
          noteTextOffset: -15
        }
      ]}
      ariaDescribedBy={'List K Graph'}
      ariaLabel={'List K Graph'}
    />
  )
}

export default GraphListK
