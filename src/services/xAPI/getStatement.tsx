/**
 *
 */
export const getActor = (lmsUserID: string) => {
  return {
    account: {
      homePage: new URL(window.location.href).origin,
      name: lmsUserID
    }
  }
}

/**
 *
 */
export const getVerb = (verb: string) => {
  return {
    id: 'https://wiki.haski.app/verbs/'.concat(verb), // URI of action in online directory + element -> hardcoded
    display: {
      en: verb
    }
  }
}

/**
 *
 */
export const getObject = (elementURL: string, component: string) => {
  return {
    id: new URL(window.location.href).origin.concat(elementURL),
    definition: {
      name: {
        en: component
      },
      type: 'https://wiki.haski.app/common/components/'.concat(component.toLowerCase()) // wiki url to component e.g. button (common) -> hardcoded // wiki url + componentName.toLowerCase()
    }
  }
}

/**
 *
 */
const getParent = (path: string, getEnglishName: (key: string) => string) => {
  return [
    {
      id: new URL(window.location.href).origin.concat(path),
      definition: {
        type: 'https://wiki.haski.app/pages/'.concat(path.split('/').pop() ?? ''),
        name: {
          en: getEnglishName(path.split('/').pop() ?? '')
        }
      }
    }
  ]
}

const getGrouping = () => {
  return [
    {
      id: new URL(window.location.href).origin,
      definition: {
        type: 'https://wiki.haski.app/pages/home',
        name: {
          en: 'Home'
        }
      }
    }
  ]
}

const getContextActivities = (path: string, getEnglishName: (key: string) => string) => {
  if (path === '/') {
    return {}
  } else if (path.split('/').length === 2) {
    return {
      parent: getParent(path, getEnglishName)
    }
  } else {
    return {
      parent: getParent(path, getEnglishName),
      grouping: getGrouping()
    }
  }
}

export const getContext = (path: string, getEnglishName: (key: string) => string) => {
  return {
    platform: 'Frontend',
    language: localStorage.getItem('i18nextLng') ?? '',
    extensions: {
      'http://lrs.learninglocker.net/define/extensions/info': {
        domain: new URL(window.location.href).origin,
        domain_version: 'v1.0.0-alpha',
        github: 'https://github.com/HASKI-RAK/HASKI-Frontend',
        event_function: 'src/common/components/DefaultButton/DefaultButton' // TODO: Create webpack plugin to overwrite __dirname and __filename to get project path of components
      }
    },
    contextActivities: getContextActivities(path, getEnglishName)
  }
}

/**
 *
 */
export const getStatement = (
  lmsUserID: string,
  verb: string,
  path: string,
  componentID: string,
  componentName: string,
  getEnglishName: (key: string) => string
) => {
  return {
    actor: getActor(lmsUserID),
    verb: getVerb(verb),
    object: getObject(path.concat('#', componentID), componentName),
    context: getContext(path, getEnglishName),
    timestamp: new Date().toISOString().replace('Z', '+00:00')
  }
}
