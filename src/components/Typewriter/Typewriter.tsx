import { Typography, TypographyProps } from '@common/components'
import { useEffect, useState, memo } from 'react'
import { debounce } from '@services'

type TypewriterProps = TypographyProps & {
  children?: string[] | number[] | string | number
  start?: boolean
  timer?: number
}

const Typewriter = ({ start = true, ...props }: TypewriterProps) => {
  const [text, setText] = useState<string | string[]>('')
  const wholeText = Array.isArray(props.children) ? props.children.map(String) : props.children?.toString()

  // Start animation with useEffect hook
  useEffect(() => {
    if (start) {
      debounce(() => {
        setText(wholeText?.slice(0, text.length + 1) ?? '')
      }, props.timer)
    }
  }, [start, wholeText, text.length, props.timer])

  return <Typography {...props}>{text}</Typography>
}

export default memo(Typewriter)
