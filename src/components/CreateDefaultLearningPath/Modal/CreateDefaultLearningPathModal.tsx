import { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Box, Fab, Modal } from '@common/components'
import { Close } from '@common/icons'
import { handleError } from '@components'
import { DefaultLearningPathResponse } from '@core'
import { SnackbarContext } from '@services'
import { usePersistedStore } from '@store'
import CreateDefaultLearningPathTable from '../Table/CreateDefaultLearningPathTable'

type DefaultLearningPathModalProps = {
  open?: boolean
  handleClose: (event: object, reason: string) => void
}

const CreateDefaultLearningPathModal = ({ open = false, handleClose }: DefaultLearningPathModalProps) => {
  const { t } = useTranslation()
  const { addSnackbar } = useContext(SnackbarContext)
  const [defaultLearningPath, setDefaultLearningPath] = useState<DefaultLearningPathResponse[]>([])
  const [orderedItems, setOrderedItems] = useState<string[]>([])
  const [disabledItems, setDisabledItems] = useState<string[]>([])
  const getUser = usePersistedStore((state) => state.getUser)
  const getDefaultLearningPath = usePersistedStore((state) => state.getDefaultLearningPath)

  useEffect(() => {
    getUser()
      .then((user) => {
        getDefaultLearningPath(user.settings.id, user.lms_user_id)
          .then((defaultLearningPathResponse) => {
            setDefaultLearningPath(defaultLearningPathResponse)
            if (defaultLearningPathResponse.length > 0) {
              setOrderedItems(
                defaultLearningPath
                  .filter((item) => !item.disabled)
                  .sort((a, b) => a.position - b.position)
                  .map((item) => item.classification)
              )
              setDisabledItems(defaultLearningPath.filter((item) => item.disabled).map((item) => item.classification))
            }
          })
          .catch((error) => {
            handleError(t, addSnackbar, 'error.fetchDefaultLearningPath', error, 3000)
            setDefaultLearningPath([])
          })
      })
      .catch((error) => {
        handleError(t, addSnackbar, 'error.fetchUser', error, 3000)
      })
  }, [defaultLearningPath, open])

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          left: '9%',
          right: '9%',
          top: '5%',
          height: '85%',
          width: '80%',
          overflow: 'auto',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 2
        }}>
        <Fab
          id="close-default-learning-path-modal-button"
          data-testid={'close-default-learning-path-modal-button'}
          color="primary"
          onClick={() => handleClose({}, 'closeButtonClick')}
          style={{
            position: 'absolute',
            top: '1%',
            left: '95%'
          }}>
          <Close />
        </Fab>
        <CreateDefaultLearningPathTable
          handleClose={handleClose}
          orderedItems={orderedItems}
          disabledItems={disabledItems}
          setOrderedItems={setOrderedItems}
          setDisabledItems={setDisabledItems}
        />
      </Box>
    </Modal>
  )
}

export default CreateDefaultLearningPathModal
