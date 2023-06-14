import { useEffect, useState } from 'react'
import { Topic } from '@services'
import { LearningPath } from '@core'
import log from 'loglevel'
import useBoundStore from '@store'
import { LearningPathReturn } from '@core'

const hardcodedTopics: Topic[] = [
  {
    id: 1,
    name: 'Allgemein',
    contains_le: true,
    created_at: 'now',
    created_by: 'me',
    is_topic: true,
    last_updated: 'now',
    parent_id: null,
    lms_id: 1,
    university: 'HS-KE',
    student_topic: {
      done: false,
      done_at: null,
      id: 1,
      student_id: 1,
      topic_id: 1,
      visits: []
    }
  },
  {
    id: 16,
    name: 'Individuelle Anordnung',
    contains_le: true,
    created_at: 'now',
    created_by: 'me',
    is_topic: true,
    last_updated: 'now',
    parent_id: null,
    lms_id: 16,
    university: 'HS-KE',
    student_topic: {
      done: false,
      done_at: null,
      id: 16,
      student_id: 16,
      topic_id: 16,
      visits: []
    }
  },
  {
    id: 7,
    name: 'Entwurfsmuster Allgemein',
    contains_le: true,
    created_at: 'now',
    created_by: 'me',
    is_topic: true,
    last_updated: 'now',
    parent_id: null,
    lms_id: 7,
    university: 'HS-KE',
    student_topic: {
      done: false,
      done_at: null,
      id: 7,
      student_id: 7,
      topic_id: 7,
      visits: []
    }
  },
  {
    id: 2,
    name: 'Bekannte Entwurfsmuster',
    contains_le: true,
    created_at: 'now',
    created_by: 'me',
    is_topic: true,
    last_updated: 'now',
    parent_id: null,
    lms_id: 2,
    university: 'HS-KE',
    student_topic: {
      done: false,
      done_at: null,
      id: 2,
      student_id: 2,
      topic_id: 2,
      visits: []
    }
  },
  {
    id: 3,
    name: 'Strategie',
    contains_le: true,
    created_at: 'now',
    created_by: 'me',
    is_topic: true,
    last_updated: 'now',
    parent_id: null,
    lms_id: 3,
    university: 'HS-KE',
    student_topic: {
      done: false,
      done_at: null,
      id: 3,
      student_id: 3,
      topic_id: 3,
      visits: []
    }
  },
  {
    id: 4,
    name: 'Zustand',
    contains_le: true,
    created_at: 'now',
    created_by: 'me',
    is_topic: true,
    last_updated: 'now',
    parent_id: null,
    lms_id: 4,
    university: 'HS-KE',
    student_topic: {
      done: false,
      done_at: null,
      id: 4,
      student_id: 4,
      topic_id: 4,
      visits: []
    }
  },
  {
    id: 5,
    name: 'Adapter',
    contains_le: true,
    created_at: 'now',
    created_by: 'me',
    is_topic: true,
    last_updated: 'now',
    parent_id: null,
    lms_id: 5,
    university: 'HS-KE',
    student_topic: {
      done: false,
      done_at: null,
      id: 5,
      student_id: 5,
      topic_id: 5,
      visits: []
    }
  },
  {
    id: 6,
    name: 'Fassade',
    contains_le: true,
    created_at: 'now',
    created_by: 'me',
    is_topic: true,
    last_updated: 'now',
    parent_id: null,
    lms_id: 6,
    university: 'HS-KE',
    student_topic: {
      done: false,
      done_at: null,
      id: 6,
      student_id: 6,
      topic_id: 6,
      visits: []
    }
  },
  {
    id: 14,
    name: 'Abschluss',
    contains_le: true,
    created_at: 'now',
    created_by: 'me',
    is_topic: true,
    last_updated: 'now',
    parent_id: null,
    lms_id: 14,
    university: 'HS-KE',
    student_topic: {
      done: false,
      done_at: null,
      id: 14,
      student_id: 14,
      topic_id: 14,
      visits: []
    }
  }
]

const hardcodedLearningPaths: LearningPath[] = [
  {
    id: 1,
    course_id: 2,
    based_on: 'aco',
    calculated_on: 'aco',
    path: [
      {
        id: 1,
        position: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: false,
        learningElement: {
          id: 1,
          lmsId: 1,
          name: 'Begriffserklärung HASKI Alpha-Version',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 1,
            student_id: 1,
            learning_element_id: 1,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 2,
        position: 2,
        learningElementId: 2,
        learningPathId: 2,
        recommended: false,
        learningElement: {
          id: 2,
          lmsId: 2,
          name: 'Welche Gefühlszustände treffen derzeit auf Sie zu?',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 2,
            student_id: 2,
            learning_element_id: 2,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 3,
        position: 3,
        learningElementId: 3,
        learningPathId: 3,
        recommended: false,
        learningElement: {
          id: 3,
          lmsId: 3,
          name: 'Evaluation vor dem Thema Entwurfsmuster Allgemein',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 3,
            student_id: 3,
            learning_element_id: 3,
            done: false,
            done_at: 'now'
          }
        }
      }
    ]
  },
  {
    id: 2,
    course_id: 2,
    based_on: 'aco',
    calculated_on: 'aco',
    path: [
      {
        id: 1,
        position: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: false,
        learningElement: {
          id: 1,
          lmsId: 1,
          name: 'Intuitive Reihenfolge der Lernelemente',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 1,
            student_id: 1,
            learning_element_id: 1,
            done: false,
            done_at: 'now'
          }
        }
      }
    ]
  },
  {
    id: 3,
    course_id: 2,
    based_on: 'aco',
    calculated_on: 'aco',
    path: [
      {
        id: 1,
        position: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: false,
        learningElement: {
          id: 1,
          lmsId: 1,
          name: 'Kurzübersicht',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 1,
            student_id: 1,
            learning_element_id: 1,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 2,
        position: 2,
        learningElementId: 2,
        learningPathId: 2,
        recommended: false,
        learningElement: {
          id: 2,
          lmsId: 2,
          name: 'Erklärung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 2,
            student_id: 2,
            learning_element_id: 2,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 3,
        position: 3,
        learningElementId: 3,
        learningPathId: 3,
        recommended: false,
        learningElement: {
          id: 3,
          lmsId: 3,
          name: 'Animation',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 3,
            student_id: 3,
            learning_element_id: 3,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 4,
        position: 4,
        learningElementId: 4,
        learningPathId: 4,
        recommended: false,
        learningElement: {
          id: 4,
          lmsId: 4,
          name: 'Beispiel',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 4,
            student_id: 4,
            learning_element_id: 4,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 5,
        position: 5,
        learningElementId: 5,
        learningPathId: 5,
        recommended: false,
        learningElement: {
          id: 5,
          lmsId: 5,
          name: 'Selbsteinschätzungstest',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 5,
            student_id: 5,
            learning_element_id: 5,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 6,
        position: 6,
        learningElementId: 6,
        learningPathId: 6,
        recommended: false,
        learningElement: {
          id: 6,
          lmsId: 6,
          name: 'Leichte Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 6,
            student_id: 6,
            learning_element_id: 6,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 7,
        position: 7,
        learningElementId: 7,
        learningPathId: 7,
        recommended: false,
        learningElement: {
          id: 7,
          lmsId: 7,
          name: 'Leichte Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 7,
            student_id: 7,
            learning_element_id: 7,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 8,
        position: 8,
        learningElementId: 8,
        learningPathId: 8,
        recommended: false,
        learningElement: {
          id: 8,
          lmsId: 8,
          name: 'Mittlere Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 8,
            student_id: 8,
            learning_element_id: 8,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 9,
        position: 9,
        learningElementId: 9,
        learningPathId: 9,
        recommended: false,
        learningElement: {
          id: 9,
          lmsId: 9,
          name: 'Mittlere Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 9,
            student_id: 9,
            learning_element_id: 9,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 10,
        position: 10,
        learningElementId: 10,
        learningPathId: 10,
        recommended: false,
        learningElement: {
          id: 10,
          lmsId: 10,
          name: 'Schwere Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 10,
            student_id: 10,
            learning_element_id: 10,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 11,
        position: 11,
        learningElementId: 11,
        learningPathId: 11,
        recommended: false,
        learningElement: {
          id: 11,
          lmsId: 11,
          name: 'Schwere Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 11,
            student_id: 11,
            learning_element_id: 11,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 12,
        position: 12,
        learningElementId: 12,
        learningPathId: 12,
        recommended: false,
        learningElement: {
          id: 12,
          lmsId: 12,
          name: 'Zusammenfassung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 12,
            student_id: 12,
            learning_element_id: 12,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 13,
        position: 13,
        learningElementId: 13,
        learningPathId: 13,
        recommended: false,
        learningElement: {
          id: 13,
          lmsId: 13,
          name: 'Zusatzliteratur',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 13,
            student_id: 13,
            learning_element_id: 13,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 14,
        position: 14,
        learningElementId: 14,
        learningPathId: 14,
        recommended: false,
        learningElement: {
          id: 14,
          lmsId: 14,
          name: 'Evaluation nach dem Thema Entwurfsmuster Allgemein',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 14,
            student_id: 14,
            learning_element_id: 14,
            done: false,
            done_at: 'now'
          }
        }
      }
    ]
  },
  {
    id: 4,
    course_id: 4,
    based_on: 'aco',
    calculated_on: 'aco',
    path: [
      {
        id: 1,
        position: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: false,
        learningElement: {
          id: 1,
          lmsId: 1,
          name: 'Erklärung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 1,
            student_id: 1,
            learning_element_id: 1,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 2,
        position: 2,
        learningElementId: 2,
        learningPathId: 2,
        recommended: false,
        learningElement: {
          id: 2,
          lmsId: 2,
          name: 'Evaluation vor dem Thema Strategie',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 2,
            student_id: 2,
            learning_element_id: 2,
            done: false,
            done_at: 'now'
          }
        }
      }
    ]
  },
  {
    id: 5,
    course_id: 5,
    based_on: 'aco',
    calculated_on: 'aco',
    path: [
      {
        id: 1,
        position: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: false,
        learningElement: {
          id: 1,
          lmsId: 1,
          name: 'Kurzübersicht',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 1,
            student_id: 1,
            learning_element_id: 1,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 2,
        position: 2,
        learningElementId: 2,
        learningPathId: 2,
        recommended: false,
        learningElement: {
          id: 2,
          lmsId: 2,
          name: 'Erklärung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 2,
            student_id: 2,
            learning_element_id: 2,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 3,
        position: 3,
        learningElementId: 3,
        learningPathId: 3,
        recommended: false,
        learningElement: {
          id: 3,
          lmsId: 3,
          name: 'Animation',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 3,
            student_id: 3,
            learning_element_id: 3,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 4,
        position: 4,
        learningElementId: 4,
        learningPathId: 4,
        recommended: false,
        learningElement: {
          id: 4,
          lmsId: 4,
          name: 'Beispiel',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 4,
            student_id: 4,
            learning_element_id: 4,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 5,
        position: 5,
        learningElementId: 5,
        learningPathId: 5,
        recommended: false,
        learningElement: {
          id: 5,
          lmsId: 5,
          name: 'Selbsteinschätzungstest',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 5,
            student_id: 5,
            learning_element_id: 5,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 6,
        position: 6,
        learningElementId: 6,
        learningPathId: 6,
        recommended: false,
        learningElement: {
          id: 6,
          lmsId: 6,
          name: 'Leichte Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 6,
            student_id: 6,
            learning_element_id: 6,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 7,
        position: 7,
        learningElementId: 7,
        learningPathId: 7,
        recommended: false,
        learningElement: {
          id: 7,
          lmsId: 7,
          name: 'Leichte Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 7,
            student_id: 7,
            learning_element_id: 7,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 8,
        position: 8,
        learningElementId: 8,
        learningPathId: 8,
        recommended: false,
        learningElement: {
          id: 8,
          lmsId: 8,
          name: 'Mittlere Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 8,
            student_id: 8,
            learning_element_id: 8,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 9,
        position: 9,
        learningElementId: 9,
        learningPathId: 9,
        recommended: false,
        learningElement: {
          id: 9,
          lmsId: 9,
          name: 'Mittlere Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 9,
            student_id: 9,
            learning_element_id: 9,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 10,
        position: 10,
        learningElementId: 10,
        learningPathId: 10,
        recommended: false,
        learningElement: {
          id: 10,
          lmsId: 10,
          name: 'Schwere Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 10,
            student_id: 10,
            learning_element_id: 10,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 11,
        position: 11,
        learningElementId: 11,
        learningPathId: 11,
        recommended: false,
        learningElement: {
          id: 11,
          lmsId: 11,
          name: 'Schwere Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 11,
            student_id: 11,
            learning_element_id: 11,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 12,
        position: 12,
        learningElementId: 12,
        learningPathId: 12,
        recommended: false,
        learningElement: {
          id: 12,
          lmsId: 12,
          name: 'Zusammenfassung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 12,
            student_id: 12,
            learning_element_id: 12,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 13,
        position: 13,
        learningElementId: 13,
        learningPathId: 13,
        recommended: false,
        learningElement: {
          id: 13,
          lmsId: 13,
          name: 'Zusatzliteratur',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 13,
            student_id: 13,
            learning_element_id: 13,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 14,
        position: 14,
        learningElementId: 14,
        learningPathId: 14,
        recommended: false,
        learningElement: {
          id: 14,
          lmsId: 14,
          name: 'Evaluation nach dem Thema Strategie',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 14,
            student_id: 14,
            learning_element_id: 14,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 15,
        position: 15,
        learningElementId: 15,
        learningPathId: 15,
        recommended: false,
        learningElement: {
          id: 15,
          lmsId: 15,
          name: 'Evaluation vor dem Thema Zustand',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 15,
            student_id: 15,
            learning_element_id: 15,
            done: false,
            done_at: 'now'
          }
        }
      }
    ]
  },
  {
    id: 7,
    course_id: 7,
    based_on: 'aco',
    calculated_on: 'aco',
    path: [
      {
        id: 1,
        position: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: false,
        learningElement: {
          id: 1,
          lmsId: 1,
          name: 'Kurzübersicht',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 1,
            student_id: 1,
            learning_element_id: 1,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 2,
        position: 2,
        learningElementId: 2,
        learningPathId: 2,
        recommended: false,
        learningElement: {
          id: 2,
          lmsId: 2,
          name: 'Erklärung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 2,
            student_id: 2,
            learning_element_id: 2,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 3,
        position: 3,
        learningElementId: 3,
        learningPathId: 3,
        recommended: false,
        learningElement: {
          id: 3,
          lmsId: 3,
          name: 'Animation',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 3,
            student_id: 3,
            learning_element_id: 3,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 4,
        position: 4,
        learningElementId: 4,
        learningPathId: 4,
        recommended: false,
        learningElement: {
          id: 1,
          lmsId: 1,
          name: 'Beispiel',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 4,
            student_id: 4,
            learning_element_id: 4,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 5,
        position: 5,
        learningElementId: 5,
        learningPathId: 5,
        recommended: false,
        learningElement: {
          id: 5,
          lmsId: 5,
          name: 'Selbsteinschätzungstest',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 5,
            student_id: 5,
            learning_element_id: 5,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 6,
        position: 6,
        learningElementId: 6,
        learningPathId: 6,
        recommended: false,
        learningElement: {
          id: 6,
          lmsId: 6,
          name: 'Leichte Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 6,
            student_id: 6,
            learning_element_id: 6,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 7,
        position: 7,
        learningElementId: 7,
        learningPathId: 7,
        recommended: false,
        learningElement: {
          id: 7,
          lmsId: 7,
          name: 'Leichte Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 7,
            student_id: 7,
            learning_element_id: 7,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 8,
        position: 8,
        learningElementId: 8,
        learningPathId: 8,
        recommended: false,
        learningElement: {
          id: 8,
          lmsId: 8,
          name: 'Mittlere Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 8,
            student_id: 8,
            learning_element_id: 8,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 9,
        position: 9,
        learningElementId: 9,
        learningPathId: 9,
        recommended: false,
        learningElement: {
          id: 9,
          lmsId: 9,
          name: 'Mittlere Übung - 2 Aufgabe 1 Heatmap',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 9,
            student_id: 9,
            learning_element_id: 9,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 10,
        position: 10,
        learningElementId: 10,
        learningPathId: 10,
        recommended: false,
        learningElement: {
          id: 10,
          lmsId: 10,
          name: 'Mittlere Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 10,
            student_id: 10,
            learning_element_id: 10,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 11,
        position: 11,
        learningElementId: 11,
        learningPathId: 11,
        recommended: false,
        learningElement: {
          id: 11,
          lmsId: 11,
          name: 'Schwere Übung - 1 Aufgabe 1 Heatmap',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 11,
            student_id: 11,
            learning_element_id: 11,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 12,
        position: 12,
        learningElementId: 12,
        learningPathId: 12,
        recommended: false,
        learningElement: {
          id: 12,
          lmsId: 12,
          name: 'Schwere Übung - 1 Aufgabe 2 Heatmap',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 12,
            student_id: 12,
            learning_element_id: 12,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 13,
        position: 13,
        learningElementId: 13,
        learningPathId: 13,
        recommended: false,
        learningElement: {
          id: 13,
          lmsId: 13,
          name: 'Schwere Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 13,
            student_id: 13,
            learning_element_id: 13,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 14,
        position: 14,
        learningElementId: 14,
        learningPathId: 14,
        recommended: false,
        learningElement: {
          id: 14,
          lmsId: 14,
          name: 'Schwere Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 14,
            student_id: 14,
            learning_element_id: 14,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 15,
        position: 15,
        learningElementId: 15,
        learningPathId: 15,
        recommended: false,
        learningElement: {
          id: 15,
          lmsId: 15,
          name: 'Zusammenfassung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 15,
            student_id: 15,
            learning_element_id: 15,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 16,
        position: 16,
        learningElementId: 16,
        learningPathId: 16,
        recommended: false,
        learningElement: {
          id: 16,
          lmsId: 16,
          name: 'Zusatzliteratur',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 16,
            student_id: 16,
            learning_element_id: 16,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 17,
        position: 17,
        learningElementId: 17,
        learningPathId: 17,
        recommended: false,
        learningElement: {
          id: 17,
          lmsId: 17,
          name: 'Evaluation nach dem Thema Zustand',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 17,
            student_id: 17,
            learning_element_id: 17,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 18,
        position: 18,
        learningElementId: 18,
        learningPathId: 18,
        recommended: false,
        learningElement: {
          id: 18,
          lmsId: 18,
          name: 'Evaluation vor dem Thema Adapter',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 18,
            student_id: 18,
            learning_element_id: 18,
            done: false,
            done_at: 'now'
          }
        }
      }
    ]
  },
  {
    id: 8,
    course_id: 8,
    based_on: 'aco',
    calculated_on: 'aco',
    path: [
      {
        id: 1,
        position: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: false,
        learningElement: {
          id: 1,
          lmsId: 1,
          name: 'Kurzübersicht',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 1,
            student_id: 1,
            learning_element_id: 1,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 2,
        position: 2,
        learningElementId: 2,
        learningPathId: 2,
        recommended: false,
        learningElement: {
          id: 2,
          lmsId: 2,
          name: 'Erklärung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 2,
            student_id: 2,
            learning_element_id: 2,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 3,
        position: 3,
        learningElementId: 3,
        learningPathId: 3,
        recommended: false,
        learningElement: {
          id: 3,
          lmsId: 3,
          name: 'Animation',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 3,
            student_id: 3,
            learning_element_id: 3,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 4,
        position: 4,
        learningElementId: 4,
        learningPathId: 4,
        recommended: false,
        learningElement: {
          id: 4,
          lmsId: 4,
          name: 'Beispiel',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 4,
            student_id: 4,
            learning_element_id: 4,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 5,
        position: 5,
        learningElementId: 5,
        learningPathId: 5,
        recommended: false,
        learningElement: {
          id: 5,
          lmsId: 5,
          name: 'Selbsteinschätzungstest',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 5,
            student_id: 5,
            learning_element_id: 5,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 6,
        position: 6,
        learningElementId: 6,
        learningPathId: 6,
        recommended: false,
        learningElement: {
          id: 6,
          lmsId: 6,
          name: 'Leichte Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 6,
            student_id: 6,
            learning_element_id: 6,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 7,
        position: 7,
        learningElementId: 7,
        learningPathId: 7,
        recommended: false,
        learningElement: {
          id: 7,
          lmsId: 7,
          name: 'Leichte Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 7,
            student_id: 7,
            learning_element_id: 7,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 8,
        position: 8,
        learningElementId: 8,
        learningPathId: 8,
        recommended: false,
        learningElement: {
          id: 8,
          lmsId: 8,
          name: 'Mittlere Übung - 1.1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 8,
            student_id: 8,
            learning_element_id: 8,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 9,
        position: 9,
        learningElementId: 9,
        learningPathId: 9,
        recommended: false,
        learningElement: {
          id: 9,
          lmsId: 9,
          name: 'Mittlere Übung - 1.2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 9,
            student_id: 9,
            learning_element_id: 9,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 10,
        position: 10,
        learningElementId: 10,
        learningPathId: 10,
        recommended: false,
        learningElement: {
          id: 10,
          lmsId: 10,
          name: 'Mittlere Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 10,
            student_id: 10,
            learning_element_id: 10,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 11,
        position: 11,
        learningElementId: 11,
        learningPathId: 11,
        recommended: false,
        learningElement: {
          id: 11,
          lmsId: 11,
          name: 'Schwere Übung - 1.1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 11,
            student_id: 11,
            learning_element_id: 11,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 12,
        position: 12,
        learningElementId: 12,
        learningPathId: 12,
        recommended: false,
        learningElement: {
          id: 12,
          lmsId: 12,
          name: 'Schwere Übung - 1.2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 12,
            student_id: 12,
            learning_element_id: 12,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 13,
        position: 13,
        learningElementId: 13,
        learningPathId: 13,
        recommended: false,
        learningElement: {
          id: 13,
          lmsId: 13,
          name: 'Schwere Übung - 1.3',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 13,
            student_id: 13,
            learning_element_id: 13,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 14,
        position: 14,
        learningElementId: 14,
        learningPathId: 14,
        recommended: false,
        learningElement: {
          id: 14,
          lmsId: 14,
          name: 'Schwere Übung - 2.1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 14,
            student_id: 14,
            learning_element_id: 14,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 15,
        position: 15,
        learningElementId: 15,
        learningPathId: 15,
        recommended: false,
        learningElement: {
          id: 15,
          lmsId: 15,
          name: 'Schwere Übung - 2.2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 15,
            student_id: 15,
            learning_element_id: 15,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 16,
        position: 16,
        learningElementId: 16,
        learningPathId: 16,
        recommended: false,
        learningElement: {
          id: 16,
          lmsId: 16,
          name: 'Zusammenfassung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 16,
            student_id: 16,
            learning_element_id: 16,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 17,
        position: 17,
        learningElementId: 17,
        learningPathId: 17,
        recommended: false,
        learningElement: {
          id: 17,
          lmsId: 17,
          name: 'Zusatzliteratur',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 17,
            student_id: 17,
            learning_element_id: 17,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 18,
        position: 18,
        learningElementId: 18,
        learningPathId: 18,
        recommended: false,
        learningElement: {
          id: 18,
          lmsId: 18,
          name: 'Evaluation nach dem Thema Adapter',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 18,
            student_id: 18,
            learning_element_id: 18,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 19,
        position: 19,
        learningElementId: 19,
        learningPathId: 19,
        recommended: false,
        learningElement: {
          id: 19,
          lmsId: 19,
          name: 'Evaluation vor dem Thema Fassade',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 19,
            student_id: 19,
            learning_element_id: 19,
            done: false,
            done_at: 'now'
          }
        }
      }
    ]
  },
  {
    id: 9,
    course_id: 9,
    based_on: 'aco',
    calculated_on: 'aco',
    path: [
      {
        id: 1,
        position: 1,
        learningElementId: 1,
        learningPathId: 1,
        recommended: false,
        learningElement: {
          id: 1,
          lmsId: 1,
          name: 'Kurzübersicht',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 1,
            student_id: 1,
            learning_element_id: 1,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 2,
        position: 2,
        learningElementId: 2,
        learningPathId: 2,
        recommended: false,
        learningElement: {
          id: 2,
          lmsId: 2,
          name: 'Erklärung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 2,
            student_id: 2,
            learning_element_id: 2,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 3,
        position: 3,
        learningElementId: 3,
        learningPathId: 3,
        recommended: false,
        learningElement: {
          id: 3,
          lmsId: 3,
          name: 'Animation',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 3,
            student_id: 3,
            learning_element_id: 3,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 4,
        position: 4,
        learningElementId: 4,
        learningPathId: 4,
        recommended: false,
        learningElement: {
          id: 4,
          lmsId: 4,
          name: 'Beispiel',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 4,
            student_id: 4,
            learning_element_id: 4,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 5,
        position: 5,
        learningElementId: 5,
        learningPathId: 5,
        recommended: false,
        learningElement: {
          id: 5,
          lmsId: 5,
          name: 'Selbsteinschätzungstest',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 5,
            student_id: 5,
            learning_element_id: 5,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 6,
        position: 6,
        learningElementId: 6,
        learningPathId: 6,
        recommended: false,
        learningElement: {
          id: 6,
          lmsId: 6,
          name: 'Leichte Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 6,
            student_id: 6,
            learning_element_id: 6,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 7,
        position: 7,
        learningElementId: 7,
        learningPathId: 7,
        recommended: false,
        learningElement: {
          id: 7,
          lmsId: 7,
          name: 'Leichte Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 7,
            student_id: 7,
            learning_element_id: 7,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 8,
        position: 8,
        learningElementId: 8,
        learningPathId: 8,
        recommended: false,
        learningElement: {
          id: 8,
          lmsId: 8,
          name: 'Mittlere Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 8,
            student_id: 8,
            learning_element_id: 8,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 9,
        position: 9,
        learningElementId: 9,
        learningPathId: 9,
        recommended: false,
        learningElement: {
          id: 9,
          lmsId: 9,
          name: 'Mittlere Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 9,
            student_id: 9,
            learning_element_id: 9,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 10,
        position: 10,
        learningElementId: 10,
        learningPathId: 10,
        recommended: false,
        learningElement: {
          id: 10,
          lmsId: 10,
          name: 'Schwere Übung - 1',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 10,
            student_id: 10,
            learning_element_id: 10,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 11,
        position: 11,
        learningElementId: 11,
        learningPathId: 11,
        recommended: false,
        learningElement: {
          id: 11,
          lmsId: 11,
          name: 'Schwere Übung - 2',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 11,
            student_id: 11,
            learning_element_id: 11,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 12,
        position: 12,
        learningElementId: 12,
        learningPathId: 12,
        recommended: false,
        learningElement: {
          id: 12,
          lmsId: 12,
          name: 'Zusammenfassung',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 12,
            student_id: 12,
            learning_element_id: 12,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 13,
        position: 13,
        learningElementId: 13,
        learningPathId: 13,
        recommended: false,
        learningElement: {
          id: 13,
          lmsId: 13,
          name: 'Zusatzliteratur',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 13,
            student_id: 13,
            learning_element_id: 13,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 14,
        position: 14,
        learningElementId: 14,
        learningPathId: 14,
        recommended: false,
        learningElement: {
          id: 14,
          lmsId: 14,
          name: 'Evaluation nach dem Thema',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 14,
            student_id: 14,
            learning_element_id: 14,
            done: false,
            done_at: 'now'
          }
        }
      }
    ]
  },
  {
    id: 14,
    course_id: 14,
    based_on: 'aco',
    calculated_on: 'aco',
    path: [
      {
        id: 14,
        position: 14,
        learningElementId: 14,
        learningPathId: 14,
        recommended: false,
        learningElement: {
          id: 14,
          lmsId: 14,
          name: 'Evaluation der Themen',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 14,
            student_id: 14,
            learning_element_id: 14,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 15,
        position: 15,
        learningElementId: 15,
        learningPathId: 15,
        recommended: false,
        learningElement: {
          id: 15,
          lmsId: 15,
          name: 'Retrospektive Reihenfolge der Lernelemente',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 15,
            student_id: 15,
            learning_element_id: 15,
            done: false,
            done_at: 'now'
          }
        }
      },
      {
        id: 16,
        position: 16,
        learningElementId: 16,
        learningPathId: 16,
        recommended: false,
        learningElement: {
          id: 16,
          lmsId: 16,
          name: 'Abschließende Fragen',
          activityType: 'feedback',
          classification: 'RQ',
          university: 'HS-KE',
          createdBy: 'me',
          createdAt: 'now',
          lastUpdated: 'now',
          studentLearningElement: {
            id: 16,
            student_id: 16,
            learning_element_id: 16,
            done: false,
            done_at: 'now'
          }
        }
      }
    ]
  }
]

export const getSortedLearningPath = async (
  data: Topic[],
  userId: number,
  lmsUserId: number,
  studentId: number,
  fetchLearningPath: LearningPathReturn
): Promise<LearningPath[]> => {
  const promises = data.map((topic) => fetchLearningPath(userId, lmsUserId, studentId, 2, topic.id)) //reihenfolge der parameter beachten
  const learningPaths = await Promise.all(promises)

  return learningPaths.map((learningPath) => {
    learningPath.path.sort((a, b) => a.position - b.position)
    return learningPath
  })
}

export const useLearningPath = (): { loading: boolean; topics: Topic[]; learningPaths: LearningPath[] } => {
  const [loading, setLoading] = useState(true)
  const [topics, setTopics] = useState<Topic[]>([])
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([])
  //const fetchUser = useBoundStore((state) => state.fetchUser)
  //const fetchLearningPath = useBoundStore((state) => state.fetchLearningPath)

  const effect = async () => {
    setLoading(true)
    try {
      //const user = await fetchUser();
      setTopics(hardcodedTopics)
      //const dataLearningPath = await getSortedLearningPath(hardcodedTopics, user.settings.user_id, user.lms_user_id, user.id,
      // fetchLearningPath)

      setLearningPaths(hardcodedLearningPaths)
    } catch (error) {
      log.error(error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    effect().catch(() => {
      log.error('An error occurred while fetching course topics in LocalNav.hooks')
    })
  }, [])

  return { loading, topics, learningPaths }
}
