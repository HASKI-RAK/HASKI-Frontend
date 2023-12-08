import { Typography, TypographyProps } from '@common/components'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from '@services'

type TypewriterProps = TypographyProps & {
  children: string[] | number[] | string | number
  startAnimation: boolean
}

const Typewriter = (props: TypewriterProps) => {
  const [text, setText] = useState<string | string[]>('')
  const [wholeText, setWholeText] = useState<string | string[]>('')

  // Start animation with useEffect hook
  useEffect(() => {
    if (props.startAnimation) {
      setWholeText(Array.isArray(props.children) ? props.children.map(String) : props.children.toString())
      debounce(() => {
        setText(wholeText.slice(0, text.length + 1))
      }, 50)
    }
  }, [props.startAnimation, props.children, wholeText, text.length])

  /*useEffect(() => {
    if (Array.isArray(props.children)) props.children.map(String)
    else props.child.toString() 

    // Write children to state with delay between each character
    const writeText = (text: string) => {
      let charIndex = 0
      const interval = setInterval(() => {
        setText(text.substring(0, charIndex))
        charIndex++
        if (charIndex > text.length) {
          clearInterval(interval)
        }
      }, 100)
    }
  })*/

  return <Typography {...props}>{text ?? ''}</Typography>
}

export default Typewriter
