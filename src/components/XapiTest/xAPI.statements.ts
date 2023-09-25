import { Statement } from '@xapi/xapi'
import { supportingMedia } from './xAPI.setup'

export const myStatement: Statement = {
  // dynamic inputs from user like lms id and maybe role as name
  actor: {
    objectType: 'Agent',
    name: 'Harald Töpfer',
    mbox: 'mailto:pottery@example.com' // Unique identifier for the actor like lms id
  },
  // the action the actor performed
  verb: {
    id: 'http://example.com/verbs/tested',
    display: {
      'en-GB': 'tested'
    }
  },
  object: {
    objectType: 'Activity',
    id: 'https://github.com/xapijs/xapi',
    definition: {
      type: 'http://example.com/activity-types/test',
      name: {
        'en-GB': 'xAPI.js'
      },
      description: {
        'en-GB': 'JavaScript library for working with the xAPI'
      }
    }
  }
}

export const myStatement2: Statement = {
  actor: {
    name: 'Admin User'
  },
  verb: {
    id: 'http://id.tincanapi.com/verb/viewed',
    display: {
      en: 'viewed'
    }
  },
  object: {
    id: 'http://127.0.0.1:8080/mod/chat/index.php?id=4',
    definition: {
      type: 'http://id.tincanapi.com/activitytype/collection-simple',
      name: {
        en: 'list of module instances'
      },
      description: {
        en: 'list of instances for the course module chat'
      },
      extensions: {
        'https://w3id.org/learning-analytics/learning-management-system/external-id': ''
      }
    }
  },
  timestamp: '2023-08-16T14:26:02+01:00',
  context: {
    platform: 'Moodle',
    language: 'en',
    extensions: {
      'http://lrs.learninglocker.net/define/extensions/info': {
        'http://moodle.org': '4.0.4 (Build: 20220912)',
        'https://github.com/xAPI-vle/moodle-logstore_xapi': '',
        event_name: '\\mod_chat\\event\\course_module_instance_list_viewed',
        event_function: '\\src\\transformer\\events\\all\\course_module_instance_list_viewed'
      }
    },
    contextActivities: {
      grouping: [
        {
          id: 'http://127.0.0.1:8080',
          definition: {
            type: 'http://id.tincanapi.com/activitytype/lms',
            name: {
              en: 'New Site'
            },
            description: {
              en: 'description of the site: Moodle powered by Bitnami'
            }
          }
        },
        {
          id: 'http://127.0.0.1:8080/course/view.php?id=4',
          definition: {
            type: 'http://id.tincanapi.com/activitytype/lms/course',
            name: {
              en: 'Kurs 3'
            },
            description: {
              en: ''
            }
          }
        }
      ],
      category: [
        {
          id: 'http://moodle.org',
          definition: {
            type: 'http://id.tincanapi.com/activitytype/source',
            name: {
              en: 'Moodle'
            },
            description: {
              en: ''
            }
          }
        }
      ]
    }
  }
}

/*

*/
