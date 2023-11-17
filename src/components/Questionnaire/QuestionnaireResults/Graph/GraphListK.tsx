import { Network } from '@common/components'
import { useTranslation } from 'react-i18next'
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
    t('components.TableListK.Organize') +
    '\n' +
    centerString(
      data.org.toFixed(2),
      t('components.TableListK.Organize').length
    )
  const elaborateCentered =
    t('components.TableListK.Elaborate') +
    '\n' +
    centerString(
      data.elab.toFixed(2),
      t('components.TableListK.Elaborate').length
    )
  const criticalReviewCentered =
    t('components.TableListK.Critical review') +
    '\n' +
    centerString(
      data.crit_rev.toFixed(2),
      t('components.TableListK.Critical review').length
    )
  const repeatCentered =
    t('components.TableListK.Repeat') +
    '\n' +
    centerString(data.rep.toFixed(2), t('components.TableListK.Repeat').length)
  const attentionCentered =
    t('components.TableListK.Attention') +
    '\n' +
    centerString(
      data.att.toFixed(2),
      t('components.TableListK.Attention').length
    )
  const effortCentered =
    t('components.TableListK.Effort') +
    '\n' +
    centerString(data.eff.toFixed(2), t('components.TableListK.Effort').length)
  const timeCentered =
    t('components.TableListK.Time') +
    '\n' +
    centerString(data.time.toFixed(2), t('components.TableListK.Time').length)
  const goalsPlansCentered =
    t('components.TableListK.Goals & plans') +
    '\n' +
    centerString(
      data.goal_plan.toFixed(2),
      t('components.TableListK.Goals & plans').length
    )
  const controlCentered =
    t('components.TableListK.Control') +
    '\n' +
    centerString(
      data.con.toFixed(2),
      t('components.TableListK.Control').length
    )
  const regulateCentered =
    t('components.TableListK.Regulate') +
    '\n' +
    centerString(
      data.reg.toFixed(2),
      t('components.TableListK.Regulate').length
    )
  const learnWithClassmatesCentered =
    t('components.TableListK.Learning with classmates') +
    '\n' +
    centerString(
      data.lrn_w_cls.toFixed(2),
      t('components.TableListK.Learning with classmates').length
    )
  const literatureResearchCentered =
    t('components.TableListK.Literature research') +
    '\n' +
    centerString(
      data.lit_res.toFixed(2),
      t('components.TableListK.Literature research').length
    )
  const learningEnvironmentCentered =
    t('components.TableListK.Learning environment') +
    '\n' +
    centerString(
      data.lrn_env.toFixed(2),
      t('components.TableListK.Learning environment').length
    )

  return {
    nodes: [
      {
        id: t('components.TableListK.Cognitive strategies'),
        height: 1,
        size: 12,
        score: data.cogn_str,
        color: 'rgb(97, 205, 187)'
      },
      {
        id: t('components.TableListK.Internal resource management strategies'),
        height: 1,
        size: 12,
        score: data.int_res_mng_str,
        color: 'rgb(97, 205, 187)'
      },
      {
        id: t('components.TableListK.Metacognitive strategies'),
        height: 1,
        size: 12,
        score: data.metacogn_str,
        color: 'rgb(97, 205, 187)'
      },
      {
        id: t('components.TableListK.External resource management strategies'),
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
        target: t('components.TableListK.Cognitive strategies'),
        distance: 60
      },
      {
        source: t('components.TableListK.Cognitive strategies'),
        target: organizeCentered,
        distance: 50
      },
      {
        source: t('components.TableListK.Cognitive strategies'),
        target: elaborateCentered,
        distance: 50
      },
      {
        source: t('components.TableListK.Cognitive strategies'),
        target: criticalReviewCentered,
        distance: 50
      },
      {
        source: t('components.TableListK.Cognitive strategies'),
        target: repeatCentered,
        distance: 50
      },
      {
        source: 'List K',
        target: t(
          'components.TableListK.Internal resource management strategies'
        ),
        distance: 50
      },
      {
        source: t(
          'components.TableListK.Internal resource management strategies'
        ),
        target: attentionCentered,
        distance: 70
      },
      {
        source: t(
          'components.TableListK.Internal resource management strategies'
        ),
        target: effortCentered,
        distance: 70
      },
      {
        source: t(
          'components.TableListK.Internal resource management strategies'
        ),
        target: timeCentered,
        distance: 55
      },
      {
        source: 'List K',
        target: t('components.TableListK.Metacognitive strategies'),
        distance: 50
      },
      {
        source: t('components.TableListK.Metacognitive strategies'),
        target: goalsPlansCentered,
        distance: 60
      },
      {
        source: t('components.TableListK.Metacognitive strategies'),
        target: controlCentered,
        distance: 50
      },
      {
        source: t('components.TableListK.Metacognitive strategies'),
        target: regulateCentered,
        distance: 50
      },
      {
        source: 'List K',
        target: t(
          'components.TableListK.External resource management strategies'
        ),
        distance: 70
      },
      {
        source: t(
          'components.TableListK.External resource management strategies'
        ),
        target: learnWithClassmatesCentered,
        distance: 60
      },
      {
        source: t(
          'components.TableListK.External resource management strategies'
        ),
        target: literatureResearchCentered,
        distance: 55
      },
      {
        source: t(
          'components.TableListK.External resource management strategies'
        ),
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

  const cognitiveStrategies = t('components.TableListK.Cognitive strategies')
  const intResMngtStrategies = t(
    'components.TableListK.Internal resource management strategies'
  )
  const metacognitiveStrategies = t(
    'components.TableListK.Metacognitive strategies'
  )
  const extResMngtStrategies = t(
    'components.TableListK.External resource management strategies'
  )

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
            t('components.ResultDescriptionListK.Score') +
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
            t('components.ResultDescriptionListK.Score') +
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
            t('components.ResultDescriptionListK.Score') +
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
            t('components.ResultDescriptionListK.Score') +
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
