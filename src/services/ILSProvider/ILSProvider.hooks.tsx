import { useEffect, useState } from 'react'
import { ILSContextType } from '@services'
import { usePersistedStore } from '@store'

const useILSProvider = (): ILSContextType => {
  const getILS = usePersistedStore((state) => state.getILS)
  const getUser = usePersistedStore((state) => state.getUser)
  const [ilsData, setILSData] = useState<ILSContextType>({
    sensingPerception: false,
    intuitivePerception: false,
    verbalInput: false,
    visualInput: false,
    activeProcessing: false,
    reflectiveProcessing: false,
    sequentialUnderstanding: false,
    globalUnderstanding: false
  })

  useEffect(() => {
    getUser().then((user) => {
      const ils = getILS(user.settings.user_id, user.lms_user_id, user.id)
      if (ils) {
        setILSData({
            sensingPerception: ils.perception_dimension === 'sns',
            intuitivePerception: ils.perception_dimension === 'int',
            verbalInput: ils.input_dimension === 'vrb',
            visualInput: ils.input_dimension === 'vis',
            activeProcessing: ils.processing_dimension === 'act',
            reflectiveProcessing: ils.processing_dimension === 'ref',
            sequentialUnderstanding: ils.understanding_dimension === 'seq',
            globalUnderstanding: ils.understanding_dimension === 'glo'
        })
      }
    })
  }, [getILS, getUser])

  return ilsData
}

export { useILSProvider }
