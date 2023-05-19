import { PrivacyPolicy } from '@pages'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (key: string) => {
        if (key == 'pages.privacypolicy.paragraphs') {
          const paragraphs = [
            { header: '1', content: 'issue' },
            { header: '2', content: 'Spam' }
          ]
          return paragraphs
        }
        return key
      }
    }
  }
}))

describe('Test the PrivacyPolicy page', () => {
  test('renders PrivacyPolicy', () => {
    render(<PrivacyPolicy />)
  })
})
