import { useTranslation } from 'react-i18next'
import { Typography } from '@common/components'
import { ListK } from '@core'

type GeneralSubscalesProps = {
  averageCognitiveStrategies: number
  averageInternalResourceManagementStrategies: number
  averageMetacognitiveStrategies: number
  averageExternalResourcesManagementStrategies: number
}

type CognitiveStrategiesProps = {
  organize: number
  elaborate: number
  criticalReview: number
  repeat: number
}

type MetaCognitiveStrategiesProps = {
  goalsPlans: number
  control: number
  regulate: number
}

const useGeneralSubscalesBelow3Element = (generalProps: GeneralSubscalesProps): JSX.Element => {
  const { t } = useTranslation()

  const averageSubscaleBelow3Array = []
  let averageSubscaleBelow3String = ''

  const averageSubscaleArray = [
    generalProps.averageCognitiveStrategies,
    generalProps.averageInternalResourceManagementStrategies,
    generalProps.averageMetacognitiveStrategies,
    generalProps.averageExternalResourcesManagementStrategies
  ]

  for (const item in averageSubscaleArray) {
    if (averageSubscaleArray[item] < 3) {
      averageSubscaleBelow3Array.push(averageSubscaleArray[item])
    }
  }
  if (averageSubscaleBelow3Array.length > 1) {
    averageSubscaleBelow3String +=
      ' ' + t('components.ResultDescriptionListK.subscaleAverage below3-' + averageSubscaleBelow3Array.length)
  }

  return (
    <div key={'GeneralDescriptionListK'}>
      <Typography variant="h6" gutterBottom>
        {t('components.ResultDescriptionListK.generalDescription-Title')} <br />
      </Typography>
      <Typography variant="body2" gutterBottom>
        {t('components.ResultDescriptionListK.generalDescription')}
        {averageSubscaleBelow3String} <br />
      </Typography>
    </div>
  )
}

const useCognitiveStrategiesBelow3Element = (generalProps: CognitiveStrategiesProps) => {
  const { t } = useTranslation()

  let cognitiveStrategiesBelow3String = t('components.ResultDescriptionListK.cognitiveStrategies below3-1')
  const cognitiveStrategiesBelow3Array = []
  const cognitiveStrategiesBelow3Html = []

  if (generalProps.organize < 3) {
    cognitiveStrategiesBelow3Array.push('Organize')
    cognitiveStrategiesBelow3String += ' ' + t('components.TableListK.organize') + ' &'
  }
  if (generalProps.elaborate < 3) {
    cognitiveStrategiesBelow3Array.push('Elaborate')
    cognitiveStrategiesBelow3String += ' ' + t('components.TableListK.elaborate') + ' &'
  }
  if (generalProps.criticalReview < 3) {
    cognitiveStrategiesBelow3Array.push('Critical review')
    cognitiveStrategiesBelow3String += ' ' + t('components.TableListK.criticalReview') + ' &'
  }
  if (generalProps.repeat < 3) {
    cognitiveStrategiesBelow3Array.push('Repeat')
    cognitiveStrategiesBelow3String += ' ' + t('components.TableListK.repeat') + ' &'
  }

  //Remove last " & "
  cognitiveStrategiesBelow3String = cognitiveStrategiesBelow3String.slice(0, cognitiveStrategiesBelow3String.length - 2)

  if (cognitiveStrategiesBelow3Array.length > 0) {
    cognitiveStrategiesBelow3String += ' ' + t('components.ResultDescriptionListK.cognitiveStrategies below3-2')
    cognitiveStrategiesBelow3Html.push(
      <div key={'CognitiveStrategiesDescriptionListK'}>
        <Typography variant={'h6'} gutterBottom>
          {t('components.TableListK.cognitiveStrategies')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {cognitiveStrategiesBelow3String}
        </Typography>
      </div>
    )
  }

  return cognitiveStrategiesBelow3Html
}

const useMetacognitiveStrategiesBelow3Element = (metacognitiveProps: MetaCognitiveStrategiesProps) => {
  const { t } = useTranslation()

  let metacognitiveStrategiesBelow3String = t('components.ResultDescriptionListK.metacognitiveStrategies below3-1')
  const metacognitiveStrategiesBelow3Array = []
  const metacognitiveStrategiesBelow3Html = []

  if (metacognitiveProps.goalsPlans < 3) {
    metacognitiveStrategiesBelow3Array.push('Goals and plans')
    metacognitiveStrategiesBelow3String +=
      ' ' + t('components.ResultDescriptionListK.metacognitiveStrategies below3.GoalsAndPlans') + ' &'
  }
  if (metacognitiveProps.control < 3) {
    metacognitiveStrategiesBelow3Array.push('Control')
    metacognitiveStrategiesBelow3String += ' ' + t('components.TableListK.control') + ' &'
  }
  if (metacognitiveProps.regulate < 3) {
    metacognitiveStrategiesBelow3Array.push('Regulate')
    metacognitiveStrategiesBelow3String +=
      ' ' + t('components.ResultDescriptionListK.metacognitiveStrategies below3.regulate') + ' &'
  }

  //Remove last " & "
  metacognitiveStrategiesBelow3String = metacognitiveStrategiesBelow3String.slice(
    0,
    metacognitiveStrategiesBelow3String.length - 2
  )

  if (metacognitiveStrategiesBelow3Array.length > 0) {
    metacognitiveStrategiesBelow3String += '.'
    metacognitiveStrategiesBelow3Html.push(
      <div key={'MetaCognitiveStrategiesDescriptionListK'}>
        <Typography variant={'h6'} gutterBottom>
          {t('components.TableListK.metacognitiveStrategies')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {metacognitiveStrategiesBelow3String}
        </Typography>
      </div>
    )
  }

  return metacognitiveStrategiesBelow3Html
}

//relevant subscales are: attention, time, learning with classmates, literature research and learning environment
const useRelevantSubscalesBelow3Element = (subScalesRelevantCombinations: { [key: string]: number }): JSX.Element[] => {
  const { t } = useTranslation()
  const subscalesBelow3Array = []
  const subscalesBelow3MessageString = []

  //Going through all combinations of subScales and adding them to the future if-statement if they are below 3
  for (const item in subScalesRelevantCombinations) {
    if (subScalesRelevantCombinations[item] < 3) {
      subscalesBelow3Array.push(item + ' && ')
    }
  }

  //If there are any relevant subScales below 3, the if-statement is created
  if (subscalesBelow3Array.length > 0) {
    //remove last " && "
    subscalesBelow3Array[subscalesBelow3Array.length - 1] = subscalesBelow3Array[subscalesBelow3Array.length - 1].slice(
      0,
      subscalesBelow3Array[subscalesBelow3Array.length - 1].length - 4
    )
    subscalesBelow3MessageString.push(
      <div key={'RelevantSubscalesBelow3DescriptionListK'}>
        <Typography variant={'h6'} gutterBottom>
          {t('components.ResultDescriptionListK.' + subscalesBelow3Array.join('') + ' below3-Title')}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {t('components.ResultDescriptionListK.' + subscalesBelow3Array.join('') + ' below3-Description')}
        </Typography>
      </div>
    )
  }

  return subscalesBelow3MessageString
}

type ResultDescriptionListKProps = {
  data: ListK
}

const ResultDescriptionListK = ({ data }: ResultDescriptionListKProps) => {
  const organize = data.org
  const elaborate = data.elab
  const criticalReview = data.crit_rev
  const repeat = data.rep
  const attention = data.att
  const time = data.time
  const goalsPlans = data.goal_plan
  const control = data.con
  const regulate = data.reg
  const learnWithClassmates = data.lrn_w_cls
  const literatureResearch = data.lit_res
  const learningEnvironment = data.lrn_env
  const averageCognitiveStrategies = data.cogn_str
  const averageInternalResourceManagementStrategies = data.int_res_mng_str
  const averageMetacognitiveStrategies = data.metacogn_str
  const averageExternalResourcesManagementStrategies = data.ext_res_mng_str

  const subScalesRelevantCombinations = [
    ['attention', attention],
    ['time', time],
    ['learnWithClassmates', learnWithClassmates],
    ['literatureResearch', literatureResearch],
    ['learningEnvironment', learningEnvironment]
  ]
  const subScalesDictionary = subScalesRelevantCombinations.reduce(
    (acc, [key, value]) => ({ ...acc, [key]: value }),
    {}
  )

  const generalSubscalesBelow3 = useGeneralSubscalesBelow3Element({
    averageCognitiveStrategies,
    averageInternalResourceManagementStrategies,
    averageMetacognitiveStrategies,
    averageExternalResourcesManagementStrategies
  })
  const cognitiveStrategiesBelow3 = useCognitiveStrategiesBelow3Element({ organize, elaborate, criticalReview, repeat })
  const metacognitiveStrategiesBelow3 = useMetacognitiveStrategiesBelow3Element({ goalsPlans, control, regulate })
  const relevantSubscalesBelow3 = useRelevantSubscalesBelow3Element(subScalesDictionary)

  return (
    <div key={'ResultDescriptionListK'}>
      {generalSubscalesBelow3}
      {cognitiveStrategiesBelow3}
      {metacognitiveStrategiesBelow3}
      {relevantSubscalesBelow3}
    </div>
  )
}

export default ResultDescriptionListK
