import {
    DefaultButton as Button,
    DefaultCard as Card,
    DefaultCardContent as CardContent,
    DefaultSkeleton as Skeleton,
    DefaultTypography as Typography,
    DefaultBox as Box
} from '@common/components'
import {Stack} from '@mui/system'
import {AuthContext} from '@services'
import log from 'loglevel'
import React, {useContext, useEffect} from 'react'
import {useTranslation} from 'react-i18next'
import {useNavigate, useParams} from 'react-router-dom'
import {useLearningPathTopic} from "../../components/LocalNav/LocalNav.hooks"

/**
 * The Course component presents an overview of the course.
 *
 * @returns {JSX.Element} - The Course component.
 *
 * @category Pages
 */
export const Course = () => {
    const {t} = useTranslation()
    const authcontext = useContext(AuthContext)
    const navigate = useNavigate()
    const {courseId} = useParams() as { courseId: string }

    const {loading, topics} = useLearningPathTopic(courseId)

    useEffect(() => {
        const preventEndlessLoading = setTimeout(() => {
            log.log('Course timeout')
            navigate('/login')
        }, 5000)
        if(authcontext.isAuth) {
            clearTimeout(preventEndlessLoading)
        }

        return () => {
            clearTimeout(preventEndlessLoading)
        }
    }, [authcontext.isAuth])

    const skeletonItems = []
    for(let i = 0; i < 3; i++) {
        skeletonItems.push(
            <React.Fragment key={`Course-Skeleton-${i}`}>
                <Skeleton data-testid={`Course-Skeleton-Topic-${i}`} variant="text" width={'100%'} height={150}/>
                <Skeleton data-testid={`Course-Skeleton-Topic-${i}`} variant="text" width={'100%'} height={150}/>
                <Skeleton data-testid={`Course-Skeleton-Topic-${i}`} variant="text" width={'100%'} height={150}/>
            </React.Fragment>
        )
    }

    return (
        <Stack spacing={2}>
            {loading ? (
                <Box>
                    <Stack spacing={1}>{skeletonItems}</Stack>
                </Box>
            ) : (
                <>
                    {topics.map((topic) => {
                        return (
                            <Card key={topic.id}>
                                <CardContent>
                                    <Typography variant="h5">{topic.name}</Typography>
                                    <Typography variant="body1">{topic.lms_id}</Typography>
                                    <Button
                                        variant="contained"
                                        data-testid={'Course-Card-Topic-' + topic.name}
                                        color="primary"
                                        onClick={() => {
                                            navigate('topic/' + topic.id)
                                        }}>
                                        {t('components.Course.Button.Topic')}
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </>
            )}
        </Stack>
    )
}

export default Course
