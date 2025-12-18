import '@testing-library/jest-dom'
// test not working when import shortened
import { FormDataType, postContactForm } from './postContactForm'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve<Response>,
    ok: true,
    status: 200,
    message: 'OK',
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('[HASKI-REQ-0044] postContactForm', () => {
  const testData: FormDataType = {
    report_type: '1',
    report_topic: '1',
    report_description: 'test'
  }
  it('should return contact success with default params', async () => {
    const contactStatus = await postContactForm(testData, 1, 1)
    expect(contactStatus).toEqual(Promise.resolve<Response>)
    expect(contactStatus.status).toEqual(undefined)
  })
})
