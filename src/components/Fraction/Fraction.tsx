import { Typography } from '@common/components'
import React from 'react'

interface FractionProps {
  numerator: number
  denominator: number
}

const Fraction = ({ numerator, denominator }: FractionProps) => {
  return (
    <Typography variant="body1" component="span" sx={{ fontSize: 16 }}>
      <sup>{numerator}</sup>/<sub>{denominator}</sub>
    </Typography>
  )
}

export default Fraction