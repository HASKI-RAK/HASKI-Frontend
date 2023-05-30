import React from 'react'
import { render, screen } from '@testing-library/react'
import GlossaryForm, { GlossaryFormProps } from './GlossaryForm'
import { useGlossaryFormHookParams, GlossaryFormHookReturn } from './GlossaryForm.hooks'

describe('GlossaryForm tests', () => {


  //GloassaryList needs unique key prop keys
  it('GlossaryForm renders without inputs', () => {
    const { getByTestId } = render(<GlossaryForm />)
    const component = getByTestId('GlossaryForm')
    expect(component).toBeInTheDocument()

    screen.debug()
  })

  it('GlossaryForm without input can be scrolled', () => {
    const { getByTestId } = render(<GlossaryForm />)
    const component = getByTestId('GlossaryForm')
    window.dispatchEvent(new Event('scroll'))
    expect(component).toBeInTheDocument()
  })

});
