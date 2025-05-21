import { memo } from 'react'

import { Box, Switch, Typography } from '@common/components'

/**
 * @prop labelLeft - The label on the left side of the switch.
 * @prop labelRight - The label on the right side of the switch.
 * @prop isGrouped - The state of the switch.
 * @prop setIsGrouped - The function to set the state of the switch.
 * @category Components
 * @interface
 */
type LabeledSwitchProps = {
  labelLeft?: string
  labelRight?: string
  isGrouped?: boolean
  setIsGrouped?: (isGrouped: boolean) => void
}

/**
 * SwitchPanel component.
 *
 * @param props - The props containing the label on the left and right side of the switch, aswell as the state and a function to set the state of the switch.
 *
 * @remarks
 * The SwitchPanel component is a panel containing a switch and two labels.
 * It can be used to switch between two states.
 * SwitchPanel can be used as a standalone component on a page.
 *
 * @category Components
 */
const SwitchPanel = (props: LabeledSwitchProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      {props.labelLeft && <Typography>{props.labelLeft}</Typography>}
      <Switch onChange={() => props.setIsGrouped?.(!props.isGrouped)} size="small" />
      {props.labelRight && <Typography>{props.labelRight}</Typography>}
    </Box>
  )
}

export default memo(SwitchPanel)
