const getParent = (path: string, getEnglishName: (identifier: string) => string) => {
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

const getContextActivities = (path: string, getEnglishName: (identifier: string) => string) => {
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

export const getContext = (path: string, getEnglishName: (identifier: string) => string) => {
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
