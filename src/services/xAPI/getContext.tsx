// ! componentName : String, pathToParent?: string, pathToGrouping?: string

const getParent = () => {
  return [
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
  ]
}

const getGrouping = () => {
  return [
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

const getContextActivities = (path: string, pathToParent?: string, pathToGrouping?: string) => {
  // path to parent component is not home

  return {
    parent: getParent(),
    grouping: getGrouping()
  }
}

export const getContext = (language: string, domain: string, path: string) => {
  return {
    platform: 'Frontend',
    language: language,
    extensions: {
      'http://lrs.learninglocker.net/define/extensions/info': {
        domain: 'v1.0.0-alpha',
        'https://github.com/HASKI-RAK/HASKI-Frontend': '',
        event_name: '\\mod_assign\\event\\assessable_submitted' // onClick -> hardcoded url + string aus component
      }
    },
    contextActivities: getContextActivities(path)
  }
}
