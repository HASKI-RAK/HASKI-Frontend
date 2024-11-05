import '@testing-library/jest-dom'
import { mockServices } from 'jest.setup'
import { useStore } from '../Zustand/Store'

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
    expect(useStore.getState()._cache_remoteTopics_record[`${courseId}`]).toEqual(remoteTopic)
  })

  it('should return cached remote topics if available', async () => {
    const { getRemoteTopics } = useStore.getState()
    const courseId = '1'

    await getRemoteTopics(courseId)

    expect(useStore.getState()._cache_remoteTopics_record[`${courseId}`]).toEqual(remoteTopic)

    const cached = await getRemoteTopics(courseId)

    expect(mockServices.fetchRemoteTopics).toHaveBeenCalledTimes(1)
    expect(cached).toEqual(remoteTopic)
  })
})
