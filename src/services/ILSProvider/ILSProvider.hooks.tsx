import { useEffect, useState } from 'react'
import { ILSContextType } from '@services'
import { usePersistedStore } from '@store'

const useILSProvider = (): ILSContextType => {
  const getILS = usePersistedStore((state) => state.getILS)
  const getUser = usePersistedStore((state) => state.getUser)
  const [ilsData, setILSData] = useState<ILSContextType>({
    perceptionDimension: '',
    inputDimension: '',
    processingDimension: '',
    understandingDimension: ''
  })

  useEffect(() => {
    getUser().then((user) => {
      const ils = getILS(user.settings.user_id, user.lms_user_id, user.id)
      if (ils) {
        setILSData({
          perceptionDimension: ils.perception_dimension,
          inputDimension: ils.input_dimension,
          processingDimension: ils.processing_dimension,
          understandingDimension: ils.understanding_dimension
        })
      }
    })
  }, [getILS, getUser])

  return ilsData
}

export { useILSProvider }
