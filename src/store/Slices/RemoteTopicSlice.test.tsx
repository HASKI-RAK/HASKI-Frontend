import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { RemoteTopics } from '@core'
import { useStore } from '../Zustand/Store'

const createDeferred = <T,>() => {
  const deferred: { resolve?: (value: T) => void; reject?: (reason?: any) => void } = {}
  const promise = new Promise<T>((res, rej) => {
    deferred.resolve = res
    deferred.reject = rej
  })
  return { promise, resolve: deferred.resolve!, reject: deferred.reject! }
}

const remoteTopic = [
  {
    lms_learning_elements: [
      {
        lms_activity_type: 'forum',
        lms_id: 1,
        lms_learning_element_name: 'Announcements'
      },
      {
        lms_activity_type: 'resource',
        lms_id: 38,
        lms_learning_element_name: 'superKnowledge.pdf'
      },
      {
        lms_activity_type: 'h5pactivity',
        lms_id: 39,
        lms_learning_element_name: 'Strategie Übung - Leicht'
      }
    ],
    topic_lms_id: 3,
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
    topic_lms_id: 4,
    topic_lms_name: 'Bekannte Entwurfsmuster'
  }
]

describe('RemoteTopicSlice ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should fetch remote topics from lms', async () => {
    const { getRemoteTopics } = useStore.getState()
    const courseId = '2'

    const result = await getRemoteTopics(courseId)

    expect(result).toEqual(remoteTopic)
    expect(getRemoteTopics).toBeDefined()
    expect(mockServices.fetchRemoteTopics).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchRemoteTopics).toHaveBeenCalledWith(courseId)
    expect(useStore.getState()._cache_remoteTopics_record[`${courseId}`]).toEqual({
      value: [
        {
          lms_learning_elements: [
            {
              lms_activity_type: 'forum',
              lms_id: 1,
              lms_learning_element_name: 'Announcements'
            },
            {
              lms_activity_type: 'resource',
              lms_id: 38,
              lms_learning_element_name: 'superKnowledge.pdf'
            },
            {
              lms_activity_type: 'h5pactivity',
              lms_id: 39,
              lms_learning_element_name: 'Strategie Übung - Leicht'
            }
          ],
          topic_lms_id: 3,
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
          topic_lms_id: 4,
          topic_lms_name: 'Bekannte Entwurfsmuster'
        }
      ]
    })
  })

  it('should return cached remote topics if available', async () => {
    const { getRemoteTopics } = useStore.getState()
    const courseId = '1'

    await getRemoteTopics(courseId)

    expect(useStore.getState()._cache_remoteTopics_record[`${courseId}`]).toEqual({
      value: [
        {
          lms_learning_elements: [
            {
              lms_activity_type: 'forum',
              lms_id: 1,
              lms_learning_element_name: 'Announcements'
            },
            {
              lms_activity_type: 'resource',
              lms_id: 38,
              lms_learning_element_name: 'superKnowledge.pdf'
            },
            {
              lms_activity_type: 'h5pactivity',
              lms_id: 39,
              lms_learning_element_name: 'Strategie Übung - Leicht'
            }
          ],
          topic_lms_id: 3,
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
          topic_lms_id: 4,
          topic_lms_name: 'Bekannte Entwurfsmuster'
        }
      ]
    })

    const cached = await getRemoteTopics(courseId)

    expect(mockServices.fetchRemoteTopics).toHaveBeenCalledTimes(1)
    expect(cached).toEqual(remoteTopic)
  })

  it('should return the cached promise if a fetch is already pending', async () => {
    const deferred = createDeferred<RemoteTopics[]>()

    mockServices.fetchRemoteTopics = jest.fn(() => deferred.promise)

    const courseId = '1'

    const { getRemoteTopics } = useStore.getState()

    const promise1 = getRemoteTopics(courseId)
    // Second call (before the promise resolves) should return the same in-flight promise.
    const promise2 = getRemoteTopics(courseId)

    // Ensure fetchRemoteTopics was called only once.
    expect(mockServices.fetchRemoteTopics).toHaveBeenCalledTimes(1)
    expect(mockServices.fetchRemoteTopics).toHaveBeenCalledWith(courseId)

    deferred.resolve(remoteTopic)

    // Await the resolution of the promise.
    const result1 = await promise1
    const result2 = await promise2

    // Both results should match the remoteTopic object.
    expect(result1).toEqual(remoteTopic)
    expect(result2).toEqual(remoteTopic)
  })
})
