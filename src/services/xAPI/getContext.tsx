export const getContext = (language: string, test?: string) => {
  return {
    platform: 'Frontend', // -> hardcoded
    language: language, // en or de // Does not work in runtime, maybe as parameter?????
    extensions: {
      'http://lrs.learninglocker.net/define/extensions/info': {
        'http://moodle.org': '4.0.4 (Build: 20220912)', // Frontend version -> hardcoded
        'https://github.com/xAPI-vle/moodle-logstore_xapi': '', // Github Link to Haski Frontend _> hardcoded
        event_name: '\\mod_assign\\event\\assessable_submitted' // onClick -> hardcoded
      }
    },
    contextActivities: {
      parent: [
        // optional
        {
          id: 'http://localhost:8080/projectinformation', // link to current page
          definition: {
            type: 'http://id.tincanapi.com/activitytype/lms/course', // Wiki link to page -> kann zusammengestellt werden?
            name: {
              en: 'Project Information' // Current Page Title
            }
          }
        }
      ],
      grouping: [
        // Da, wenn parent nicht home und current page nicht home
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
  }
}
