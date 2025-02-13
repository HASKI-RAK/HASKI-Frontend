import { useEffect } from 'react'
import { getConfig } from '@shared'
import { usePersistedStore } from '@store'

// import { getXAPIObject, xAPIObject } from 'src/services/xAPI/getXAPIObject'

type AppHookReturn = {
  isXAPIConfigured: boolean
}

export const useApp = (): AppHookReturn => {
  // xAPI functionality.
  const setXAPI = usePersistedStore().setXAPI
  const getXAPI = usePersistedStore().getXAPI

  //TODO: SET XAPI OBJECT HERE
  // const xAPIObject = getXAPIObject({} as xAPIObject)

  useEffect(() => {
    setXAPI(getConfig().LRS ?? '', getConfig().LRS_AUTH_USERNAME ?? '', getConfig().LRS_AUTH_PASSWORD ?? '')
  }, [])

  return { isXAPIConfigured: !!getXAPI() }
}

//! IN APP HOOKS WIRD DAS OBJEKT GESETZT -> THE BIG ONE
//! DIE FRAGE IST: IN STORE ODER ALS USESTATE?
