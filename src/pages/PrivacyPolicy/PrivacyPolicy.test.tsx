import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { PrivacyPolicy } from '@pages'

describe('[HASKI-REQ-0005] Test the PrivacyPolicy page', () => {
  it('renders PrivacyPolicy', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    )
    expect(getByText('pages.privacypolicy')).toBeTruthy()
  })

  it('renders the correct address details', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    )
    expect(getByText('Jim Haug (HS Kempten)')).toBeTruthy()
    expect(getAllByText('Bahnhofstraße 61')).toBeTruthy()
    expect(getAllByText('D - 87435 Kempten')).toBeTruthy()
  })

  it('displays the correct Privacy Policy information', () => {
    const { getByText } = render(
      <MemoryRouter>
        <PrivacyPolicy />
      </MemoryRouter>
    )
    expect(getByText('1. pages.privacypolicy.informationStudy')).toBeTruthy()
    expect(getByText('pages.privacypolicy.informationStudyText')).toBeTruthy()
    expect(getByText('2. pages.privacypolicy.privacyNotice')).toBeTruthy()
    expect(getByText('pages.privacypolicy.privacyNoticeHandlingPersonalData')).toBeTruthy()
    expect(getByText('pages.privacypolicy.privacyNoticeIntention')).toBeTruthy()
    expect(getByText('pages.privacypolicy.dataCollection')).toBeTruthy()
    expect(getByText('pages.privacypolicy.dataCollectionText')).toBeTruthy()
    expect(getByText('pages.privacypolicy.dataProcessing')).toBeTruthy()
    expect(getByText('pages.privacypolicy.dataProcessingText')).toBeTruthy()
    expect(getByText('pages.privacypolicy.storageAndAccess')).toBeTruthy()
    expect(getByText('pages.privacypolicy.storageAndAccessText')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publication')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationParagraph-1')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationParagraph-2')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationParagraph-3')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationParagraph-4')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationParagraph-5')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationParagraph-6')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationParagraph-7')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationText-1')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationText-2')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationText-3')).toBeTruthy()
    expect(getByText('pages.privacypolicy.publicationText-4')).toBeTruthy()
  })
})
