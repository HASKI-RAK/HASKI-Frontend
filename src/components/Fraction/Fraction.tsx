import { Typography, TypographyProps } from '@common/components'
import { memo } from 'react'

/**
 * Fraction component props.
 * @prop {@link FractionProps#numerator} - The numerator of the fraction.
 * @prop {@link FractionProps#denominator} - The denominator of the fraction.
 */
type FractionProps = TypographyProps & {
  numerator: number
  denominator: number
}

/**
 * Fraction component.
 * @param param - component props.
 * @returns A JSX Element with the rendered fraction. (3/4 e.g.)
 */
const Fraction = ({ numerator, denominator, ...props }: FractionProps) => {
  return (
    <Typography {...props}>
      <sup>{numerator}</sup>/<sub>{denominator}</sub>
    </Typography>
  )
}

export default memo(Fraction)
