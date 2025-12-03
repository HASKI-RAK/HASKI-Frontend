import { getConfig } from '@shared'
import { fetchRemoteTopics } from './fetchRemoteTopics'

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ status: 200 }),
    ok: true,
    headers: {
      get: () => 'application/json'
    }
  })
) as jest.Mock

describe('[HASKI-REQ-0036] fetchRemoteTopics has expected behaviour', () => {
  it('should return the course when the response is successful', async () => {
    const expectedData = [
      {
        lms_learning_elements: [
          {
            lms_activity_type: 'forum',
            lms_id: 1,
            lms_learning_element_name: 'Announcements'
          },
          {
            lms_activity_type: 'feedback',
            lms_id: 3,
            lms_learning_element_name: 'ILS Fragebogen'
          },
          {
            lms_activity_type: 'book',
            lms_id: 12,
            lms_learning_element_name: 'hello'
          },
          {
            lms_activity_type: 'resource',
            lms_id: 38,
            lms_learning_element_name: '978-3-658-35492-3 (1)'
          },
          {
            lms_activity_type: 'h5pactivity',
            lms_id: 39,
            lms_learning_element_name: '645ccebe93872995e83c744e'
          }
        ],
        topic_lms_id: 1,
        topic_lms_name: 'General'
      },
      {
        lms_learning_elements: [
          {
            lms_activity_type: 'h5pactivity',
            lms_id: 4,
            lms_learning_element_name: 'DefinitionDeklaration und AufrufeinerFunktion'
          }
        ],
        topic_lms_id: 2,
        topic_lms_name: 'Bekannte'
      },
      {
        lms_learning_elements: [
          {
            lms_activity_type: 'lti',
            lms_id: 7,
            lms_learning_element_name: 'haski_lti_thingy'
          },
          {
            lms_activity_type: 'h5pactivity',
            lms_id: 8,
            lms_learning_element_name: 'Adapter - Kurzübersicht'
          },
          {
            lms_activity_type: 'h5pactivity',
            lms_id: 10,
            lms_learning_element_name: 'Adapter - leicht 1'
          },
          {
            lms_activity_type: 'h5pactivity',
            lms_id: 9,
            lms_learning_element_name: 'Adapter - leicht 2'
          }
        ],
        topic_lms_id: 3,
        topic_lms_name: 'Strat'
      }
    ]

    const mockResponseRemoteTopic = {
      ok: true,
      json: jest.fn().mockResolvedValue(expectedData)
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponseRemoteTopic)

    const result = await fetchRemoteTopics('1')

    expect(fetch).toHaveBeenCalledWith(`${getConfig().BACKEND}/lms/remote/course/1/content`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    expect(result).toEqual(expectedData)
  })

  it('should throw a specific error when the response has an error variable', async () => {
    const expectedError = 'Error: HTTP error undefined'
    const expectedMessage = 'courseId is required'

    const mockResponseRemoteTopic = {
      ok: false,
      json: jest.fn().mockResolvedValue({ error: expectedError, message: expectedMessage })
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponseRemoteTopic)

    await expect(fetchRemoteTopics()).rejects.toThrow(`${expectedMessage}`)
  })

  it('should throw an unknown error when the response does not have an error variable', async () => {
    const mockResponseRemoteTopic = {
      ok: false,
      json: jest.fn().mockResolvedValue({})
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    fetch.mockResolvedValue(mockResponseRemoteTopic)

    await expect(fetchRemoteTopics()).rejects.toThrow('')
  })
})
