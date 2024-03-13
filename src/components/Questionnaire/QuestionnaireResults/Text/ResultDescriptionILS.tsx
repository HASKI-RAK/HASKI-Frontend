import { useTranslation } from 'react-i18next'
import { Typography } from '@common/components'
import { ILS } from '@core'
import { ILSDimension, ILSInterpretation } from '../Table/TableILS'

// function can be replaced for test-purposes
type ResultDescriptionILSProps = {
  data: ILS
  ILSdim?: (n: number, s: number, b?: boolean) => string
}
const ResultDescriptionILS = ({ data, ILSdim = ILSDimension }: ResultDescriptionILSProps) => {
  const { t } = useTranslation()

  const dimensionOneScore = data.processing_value
  const dimensionTwoScore = data.perception_value
  const dimensionThreeScore = data.input_value
  const dimensionFourScore = data.understanding_value

  //active, reflective, sensory...etc, it´s mandatory in english because of internationalization name in .json file
  const dimensionOne = ILSdim(1, dimensionOneScore, true).toLowerCase()
  const dimensionTwo = ILSdim(2, dimensionTwoScore, true).toLowerCase()
  const dimensionThree = ILSdim(3, dimensionThreeScore, true).toLowerCase()
  const dimensionFour = ILSdim(4, dimensionFourScore, true).toLowerCase()
  const dimensionArray = [dimensionOne, dimensionTwo, dimensionThree, dimensionFour]

  //balanced, moderate, strong
  const interpretationDimensionOneScore = ILSInterpretation(dimensionOneScore, '', true).trim().toLowerCase()
  const interpretationDimensionTwoScore = ILSInterpretation(dimensionTwoScore, '', true).trim().toLowerCase()
  const interpretationDimensionThreeScore = ILSInterpretation(dimensionThreeScore, '', true).trim().toLowerCase()
  const interpretationDimensionFourScore = ILSInterpretation(dimensionFourScore, '', true).trim().toLowerCase()

  const interpretationArray = [
    interpretationDimensionOneScore,
    interpretationDimensionTwoScore,
    interpretationDimensionThreeScore,
    interpretationDimensionFourScore
  ]

  const balancedDimensionsArray: string[] = []
  const unbalancedDimensionsArray: JSX.Element[] = []
  let balancedDimensionsInterpretationString = ''
  let balancedDimensionsKeyWordString = ''

  //All dimensions are processed here and balanced dimensions are stored in balancedDimensionsArray
  interpretationArray.forEach((item, index) => {
    if (item === 'balanced') {
      balancedDimensionsArray.push(dimensionArray[index] + '-' + interpretationArray[index])
    } else {
      unbalancedDimensionsArray.push(
        <div
          data-testid={'Dimension: ' + dimensionArray[index] + ' Interpretation: ' + interpretationArray[index]}
          key={'Dimension: ' + dimensionArray[index] + ' Interpretation: ' + interpretationArray[index]}>
          <Typography variant="h6" gutterBottom>
            {t('components.TableILS.' + dimensionArray[index])}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t('components.ResultDescriptionILS.' + dimensionArray[index] + '-' + interpretationArray[index])} <br />
          </Typography>
        </div>
      )
    }
  })

  //All balanced dimensions are processed here
  if (balancedDimensionsArray.length > 0) {
    if (balancedDimensionsArray.length === 4) {
      return (
        <div key={'AllDimensionsAreBalancedDescription'}>
          <Typography variant="h6" gutterBottom>
            {t('components.ResultDescriptionILS.allDimensions')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {t('components.ResultDescriptionILS.everythingBalanced')}
          </Typography>
        </div>
      )
    } else {
      for (const dim in balancedDimensionsArray) {
        switch (balancedDimensionsArray[dim]) {
          case 'active-balanced':
            balancedDimensionsKeyWordString += t('components.ResultDescriptionILS.processingBalanced') + ' & '
            break
          case 'reflective-balanced':
            balancedDimensionsKeyWordString += t('components.ResultDescriptionILS.processingBalanced') + ' & '
            break
          case 'sensory-balanced':
            balancedDimensionsKeyWordString += t('components.ResultDescriptionILS.perceptionBalanced') + ' & '
            break
          case 'intuitive-balanced':
            balancedDimensionsKeyWordString += t('components.ResultDescriptionILS.perceptionBalanced') + ' & '
            break
          case 'verbal-balanced':
            balancedDimensionsKeyWordString += t('components.ResultDescriptionILS.presentationBalanced') + ' & '
            break
          case 'visual-balanced':
            balancedDimensionsKeyWordString += t('components.ResultDescriptionILS.presentationBalanced') + ' & '
            break
          case 'sequential-balanced':
            balancedDimensionsKeyWordString += t('components.ResultDescriptionILS.organisationBalanced') + ' & '
            break
          case 'global-balanced':
            balancedDimensionsKeyWordString += t('components.ResultDescriptionILS.organisationBalanced') + ' & '
            break
          default:
            break
        }
      }

      //Remove last " & "
      balancedDimensionsKeyWordString = balancedDimensionsKeyWordString.slice(
        0,
        balancedDimensionsKeyWordString.length - 2
      )

      balancedDimensionsInterpretationString =
        t('components.ResultDescriptionILS.balancedDimensions-1') +
        ' ' +
        t('components.ResultDescriptionILS.balancedEnumeration-' + balancedDimensionsArray.length) +
        ' ' +
        t('components.ResultDescriptionILS.balancedDimensions-2') +
        ' ' +
        balancedDimensionsKeyWordString +
        ' ' +
        t('components.ResultDescriptionILS.balancedDimensions-3')
    }
  }

  return (
    <div key={'OuterDivResultDescriptionILS'}>
      {unbalancedDimensionsArray}
      {balancedDimensionsInterpretationString == '' ? (
        <br />
      ) : (
        <div key={'InnerDivResultDescriptionILS'}>
          <Typography variant="h6" gutterBottom>
            {t('components.ResultDescriptionILS.remainingDimensions')}
          </Typography>
          <Typography variant="body2" gutterBottom>
            {balancedDimensionsInterpretationString}
          </Typography>
        </div>
      )}
    </div>
  )
}

export default ResultDescriptionILS
