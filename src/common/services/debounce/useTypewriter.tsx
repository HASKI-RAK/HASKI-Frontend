import React, { Component } from 'react';

interface TypewriterProps {
  text: string;
  delay: number;
}

interface TypewriterState {
  currentIndex: number;
  displayedText: string;
}

class Typewriter extends Component<TypewriterProps, TypewriterState> {
  private typewriterInterval: NodeJS.Timeout | null = null;

  constructor(props: TypewriterProps) {
    super(props);
    this.state = {
      currentIndex: 0,
      displayedText: '',
    };
  }

  componentDidMount() {
    this.typewriterInterval = setInterval(this.typeCharacter, this.props.delay);
  }

  componentWillUnmount() {
    if (this.typewriterInterval) {
      clearInterval(this.typewriterInterval);
    }
  }

  typeCharacter = () => {
    const { text } = this.props;
    const { currentIndex, displayedText } = this.state;

    if (currentIndex < text.length) {
      this.setState((prevState) => ({
        currentIndex: prevState.currentIndex + 1,
        displayedText: prevState.displayedText + text[currentIndex],
      }));
    } else {
      clearInterval(this.typewriterInterval!);
    }
  };

  render() {
    return <span>{this.state.displayedText}</span>;
  }
}

export default Typewriter;