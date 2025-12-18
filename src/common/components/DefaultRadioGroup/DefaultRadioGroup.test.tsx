import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Radio } from '@common/components'
import RadioGroup from './DefaultRadioGroup'

describe('[HASKI-REQ-0086] DefaultRadioGroup tests', () => {
  test('DefaultRadioGroup renders correctly', () => {
    const radioGroup = render(
      <MemoryRouter>
        <RadioGroup>
          <Radio value={'test'} />
          <Radio value={'test2'} />
        </RadioGroup>
      </MemoryRouter>
    )

    expect(radioGroup).toBeTruthy()
  })
})
