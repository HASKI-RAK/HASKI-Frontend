import { Typography } from '@common/components'
import React from 'react'

/**
 * Fraction component props.
 * @prop {@link FractionProps#numerator} - The numerator of the fraction.
 * @prop {@link FractionProps#denominator} - The denominator of the fraction.
 */
interface FractionProps {
  numerator: number
  denominator: number
}

/**
 * Fraction component.
 * @param param - component props.
 * @returns A JSX Element with the rendered fraction. (3/4 e.g.)
 */
const Fraction = ({ numerator, denominator }: FractionProps) => {
  return (
    <Typography variant="body1" component="span" sx={{ fontSize: 16 }}>
      <sup>{numerator}</sup>/<sub>{denominator}</sub>
    </Typography>
  )
}

export default Fraction
