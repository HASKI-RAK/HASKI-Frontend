import '@testing-library/jest-dom'
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

describe('postContactForm', () => {
  const testData: FormDataType = {
    report_type: '1',
    report_topic: '1',
    report_description: 'test'
  }
  it('should return contact success with default params', async () => {
    const contactStatus = await postContactForm(testData, 1, 1)
    expect(contactStatus.status).toEqual(undefined)
  })
})
