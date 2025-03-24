import { Dispatch, SetStateAction, memo, useCallback } from 'react'
import { Button, Card, CardContent, Grid } from '@common/components'
import { AddCircle } from '@common/icons'
import { CreateCourseModal, courseCardButtonStyle } from '@components'

type CreateCourseCardProps = {
  setCreateCourseModalOpen: (value: SetStateAction<boolean>) => void
  createCourseModalOpen: boolean
  handleCloseCourseModal(): void
  activeStepCreateCourseModal: number
  setActiveStepCreateCourseModal: Dispatch<SetStateAction<number>>
}

const CreateCourseCard = ({
  setCreateCourseModalOpen,
  createCourseModalOpen,
  handleCloseCourseModal,
  activeStepCreateCourseModal,
  setActiveStepCreateCourseModal
}: CreateCourseCardProps) => {
  const handleClick = useCallback(() => {
    setCreateCourseModalOpen(true)
  }, [setCreateCourseModalOpen])

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="center">
          <Button
            id="create-course-button"
            data-testid={'create-course-button'}
            variant="contained"
            color="primary"
            onClick={handleClick}
            sx={courseCardButtonStyle}>
            <AddCircle />
          </Button>
        </Grid>
      </CardContent>
      <CreateCourseModal
        openCreateCourseModal={createCourseModalOpen}
        handleCloseCreateCourseModal={handleCloseCourseModal}
        activeStepCreateCourseModal={activeStepCreateCourseModal}
        setActiveStepCreateCourseModal={setActiveStepCreateCourseModal}></CreateCourseModal>
    </Card>
  )
}

export default memo(CreateCourseCard)
