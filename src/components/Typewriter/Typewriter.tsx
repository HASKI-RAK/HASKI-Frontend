import { memo, useEffect, useState } from 'react'
import { Typography, TypographyProps } from '@common/components'
import { debounce } from '@services'

/**
 * @prop startAnimation - Indicates if the animation has started or not.
 * @prop delay - The delay between each animation step.
 * @prop children - The text, number or array that will be animated.
 * @prop {@link TypographyProps} - The props of the Typography component.
 * @interface
 */
type TypewriterProps = TypographyProps & {
  children?: string[] | number[] | string | number
  startAnimation?: boolean
  delay?: number
}

/**
 * Typewriter component.
 *
 * @param props - Props containing startAnimation, delay and children.
 *
 * @remarks
 * Typewriter represents a component that animates and displays a text, number or array.
 * The animation is done by debouncing each character or array entry to simulate a typewriter.
 * Typewriter can be used as a standalone component on a page.
 *
 * @category Components
 */
const Typewriter = ({ startAnimation = true, ...props }: TypewriterProps) => {
  const [text, setText] = useState<string | string[]>('')
  const wholeText = Array.isArray(props.children) ? props.children.map(String) : props.children?.toString()

  // Start animation with useEffect hook
  useEffect(() => {
    if (startAnimation) {
      debounce(() => {
        setText(wholeText?.slice(0, text.length + 1) ?? '')
      }, props.delay)
    }
  }, [startAnimation, wholeText, text.length, props.delay])

  return <Typography {...props}>{text}</Typography>
}

export default memo(Typewriter)
