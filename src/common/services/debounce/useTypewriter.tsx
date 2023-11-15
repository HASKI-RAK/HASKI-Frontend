import React, { Component } from 'react'
import { Typography, TypographyProps } from '@mui/material'

interface TypewriterProps {
  text: string
  delay: number
}

interface TypewriterState {
  currentIndex: number
  displayedText: string
}

class Typewriter2 extends Component<TypewriterProps, TypewriterState> {
  private typewriterInterval: NodeJS.Timeout | null = null

  constructor(props: TypewriterProps) {
    super(props)
    this.state = {
      currentIndex: 0,
      displayedText: ''
    }
  }

  componentDidMount() {
    this.typewriterInterval = setInterval(this.typeCharacter, this.props.delay)
  }

  componentWillUnmount() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval)
    }
  }

  typeCharacter = () => {
    const { text } = this.props
    const { currentIndex, displayedText } = this.state

    if (currentIndex < text.length) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
        displayedText: prevState.displayedText + text[currentIndex]
      }))
    } else {
      clearInterval(this.typewriterInterval!)
    }
  }

  render() {
    return <span>{this.state.displayedText}</span>
  }
}

type TypeProps = {
  children?: React.ReactElement<TypographyProps>
}

// if props.children.props.children is a string, TypeWriter

const Typewriter = (props: TypeProps) => {
  props.children?.props.children!
  return (
    <>
      <>{props.children}</>
      <Typography />
    </>
  )
}

export default Typewriter
