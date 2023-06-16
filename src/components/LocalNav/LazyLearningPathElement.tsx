import {Topic} from "@services";
import {LearningPathElement} from "@core";
import {useNavigate} from "react-router-dom";
import {DefaultLink as Link, DefaultSkeleton as Skeleton, DefaultTypography as Typography} from "@common/components";
import React from "react";

type LazyLearningPathElementProps = {
    topic: Topic
    useLearningPathElement: (topic: Topic) => { loadingElements: boolean; learningPaths: LearningPathElement }
}

const LazyLearningPathElement = ({ topic, useLearningPathElement }: LazyLearningPathElementProps) => {
    const { loadingElements, learningPaths } = useLearningPathElement(topic)
    console.log("2")
    const navigate = useNavigate()

    if (loadingElements) {
        return (
            <>
                <Skeleton variant="text" width={'100%'} height={55} />
                <Skeleton variant="text" width={'70%'} height={20} />
                <Skeleton variant="text" width={'70%'} height={20} sx={{ left: '50' }} />
            </>
        )
    }

    return (
        <>
            {learningPaths.path.map((learningElement) => (
                <Typography variant="body1" key={learningElement.learning_element.name}>
                    <Link
                        underline="hover"
                        variant="body2"
                        color="inherit"
                        sx={{
                            cursor: 'pointer',
                            padding: '8px',
                            borderRadius: 10,
                            '&:hover': { backgroundColor: (theme) => theme.palette.primary.main }
                        }}
                        onClick={() => {
                            navigate(`/topics/${topic.name}/${learningElement.learning_element.name}`)
                        }}>
                        {learningElement.position} {learningElement.learning_element.name}
                    </Link>
                </Typography>
            ))}
        </>
    )
}

export default LazyLearningPathElement