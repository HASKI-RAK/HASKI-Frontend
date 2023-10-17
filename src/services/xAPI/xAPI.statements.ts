import { Statement, Actor } from '@xapi/xapi'
import xAPI from './xAPI.setup'
import { getUser } from '../auth'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'
import { getOnClickStatement } from './getStatement'

const id = getUser()
  .then((user) => {
    return user.lms_user_id.toString()
  })
  .catch((error) => {
    console.log(error)
    return ''
  }) // TODO: Add snackbar

// location.pathname das erste ist grouping
// das vorletzte ist parent
// Wenn parent == grouping, dann parent nicht mitschicken
// wenn current home, dann kein grouping und kein parent

const onClickStatement: Statement = {
  actor: {
    account: {
      homePage: window.location.href, // 'http://127.0.0.1:8080', // Moodle or HASKI URL
      name: 'id' // lms id
    }
  },
  verb: {
    id: 'http://activitystrea.ms/schema/1.0/submit', // URI of action in online directory
    display: {
      en: 'submitted' // en required
    }
  },
  object: {
    id: 'http://127.0.0.1:8080/mod/assign/view.php?id=11', // Moodle URL and #href of button in url
    definition: {
      name: {
        en: 'Test assignment' // Button
      },
      type: 'http://vocab.xapi.fr/activities/assignment' // wiki url to component e.g. button (common)
    }
  },
  /*result: {
    // Im Frontend nicht mitsenden
    score: {
      scaled: -0.6, // -1 to 1
      raw: 20,
      min: 0,
      max: 100
    },
    success: true,
    completion: true,
    response: 'Test',
    duration: 'PT1M0S'
  },*/ context: {
    platform: 'Frontend', // Moodle, Frontend, Task Evaluation
    language: localStorage.getItem('i18nextLng') as string, // en or de // Does not work in runtime, maybe as parameter?????
    extensions: {
      'http://lrs.learninglocker.net/define/extensions/info': {
        'http://moodle.org': '4.0.4 (Build: 20220912)',
        'https://github.com/xAPI-vle/moodle-logstore_xapi': '',
        event_name: '\\mod_assign\\event\\assessable_submitted',
        event_function: '\\src\\transformer\\events\\mod_assign\\assignment_submitted'
      } // ????
    },
    contextActivities: {
      parent: [
        // optional
        {
          id: 'http://localhost:8080/projectinformation',
          definition: {
            type: 'http://id.tincanapi.com/activitytype/lms/course', // Wiki link to page
            name: {
              en: 'Project Information' // Current Page Title
            }
          }
        }
      ],
      grouping: [
        // optional
        {
          id: 'http://localhost:8080', // Homepage
          definition: {
            type: 'http://id.tincanapi.com/activitytype/lms/course', // Wiki link to page
            name: {
              en: 'Home'
            }
          }
        }
      ]
    }
  },
  timestamp: new Date().toISOString() // ISO 8601 Does not update in runtime, dann auch als param?????
}

/*const sendStatement2 = (params) => {
  xAPI.sendStatement({ statement: getStatement(params) })
}*/

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

// Das hier könnte verwendet werden, um dynamische Statements zu senden
// Wenn man irgendwas von der page noch mitschicken will -> welche komponente, welche seite
// Jeweils ein Statement für jede unserer Aktionen
export const sendMyStatement = (test: string) => {
  xAPI
    .sendStatement({
      statement: {
        // dynamic inputs from user like lms id and maybe role as name
        actor: {
          objectType: 'Agent',
          name: test,
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
    })
    .then((response) => {
      console.log('Statement sent', response)
    })
    .catch((error) => {
      console.log('Statement failed', error)
    })
}

// Key Press : Date time
// Interaction Log Data : Date time
// Mouse Click : Date time
