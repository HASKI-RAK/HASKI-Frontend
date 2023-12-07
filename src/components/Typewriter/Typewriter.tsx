import { Typography, TypographyProps } from '@common/components'
import { useCallback, useEffect, useState } from 'react'
import { debounce } from '@services'
import { getPropertyAccessor } from '@nivo/core'

type TypewriterProps = TypographyProps & {
  children: string[] | number[] | string | number
}

const Typewriter = (props: TypewriterProps) => {
  const [text, setText] = useState<string | string[]>('')
  const [wholeText, setWholeText] = useState<string | string[]>(
    Array.isArray(props.children) ? props.children.map(String) : props.children.toString()
  )

  // Animates header text by writing one character at a time into the headerState with a short timeout.
  /*const typewriterEffect = useCallback(
    (header: string) => {
      return debounce(() => {
        setText(header.slice(0, props.children?.length! + 1))
      }, 50)
    },
    [setText, text]
  )*/

  useEffect(() => {
    debounce(() => {
      setText(wholeText?.slice(0, text.length + 1))
    }, 50)
  })

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
  // Start animation with useEffect hook

  return <Typography {...props}>{text ?? ''}</Typography>
}

export default Typewriter
