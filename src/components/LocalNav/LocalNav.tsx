import {
    DefaultBox as Box,
    DefaultDivider as Divider,
    DefaultTypography as Typography,
    DefaultAccordionSummary as AccordionSummary,
    DefaultAccordionDetails as AccordionDetails,
    DefaultAccordion as Accordion, DefaultLink as Link
} from "@common/components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Skeleton} from "@mui/material";


/**
 * Local navigation component for the main frame.
 * @remarks
 * It contains the topics menu as a way to navigate through the application.
 *
 * @category Components
 */

//todo: get Topics of Student-id from backend
    //todo: get paths of topics from backend, and sort with .sort((a, b) => a.position - b.position);

interface Topic {
    contains_le: boolean;
    created_at: string;
    created_by: string;
    id: number;
    is_topic: boolean;
    last_updated: string | null;
    lms_id: number;
    name: string;
    parent_id: number | null;
    student_topic: {
        done: boolean;
        done_at: string | null;
        id: number;
        student_id: number;
        topic_id: number;
        visits: string[]; // Define type of visits array if known
    };
    university: string;
}

interface TopicsResponse {
    topics: Topic[];
}

interface LearningElement {
    activity_type: string;
    classification: string;
    created_at: string;
    created_by: string;
    id: number;
    last_updated: string | null;
    lms_id: number;
    name: string;
    student_learning_element: null;
    university: string;
}

interface PathItem {
    id: number;
    learning_element: LearningElement;
    learning_element_id: number;
    learning_path_id: number;
    position: number;
    recommended: boolean;
}

interface LearningPath {
    based_on: string;
    calculated_on: string | null;
    course_id: number;
    id: number;
    path: PathItem[];
}

const LocalNav = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState<Topic[]>([]);
    const [learningPath, setLearningPath] = useState<LearningPath[]>([]);

    useEffect(() => {
        const fetchTopics = async() => {
            setLoading(true); // set loading state to true before making request
            try {
                const responseTopic = await fetch('http://127.0.0.1:5000/user/2/5/student/1/course/1/topic');
                const dataTopic: TopicsResponse = await responseTopic.json();
                setTopics(dataTopic.topics);

                const dataLearningPath: LearningPath[] = [];
                for(const topic of dataTopic.topics) {
                    const topicIndex = topic.id.toString();
                    const responseLearningPath = await fetch(`http://127.0.0.1:5000/user/2/5/student/1/course/1/topic/${topicIndex}/learningPath`);
                    const path: LearningPath = await responseLearningPath.json();
                    // how do we know where the element is in Moodle?
                    path.path.sort((a, b) => a.id - b.id);
                    dataLearningPath.push(path);
                }
                setLearningPath(dataLearningPath);
                setLoading(false); // set loading state to false after request is done
            }
            catch(error) {
                console.error(error);
                setLoading(false); // set loading state to false if there is an error
            }
        };
        fetchTopics();
    }, []);


    return (
        <Box flexGrow={1}>
            <Typography variant="h5">{t("components.LocalNav.LocalNav.Topics")}</Typography>
            <Divider/>
            {loading ? ( // display Skeleton component while loading is true
                <Box sx={{py: 1}}>
                    <Skeleton/>
                    <Skeleton/>
                    <Skeleton/>
                </Box>
            ) : ( // display actual content once loading is false
                <>
                    {topics.map((topic, index) => (
                        <Accordion disableGutters
                                   sx=
                                       {{
                                           borderColor: 'divider',
                                           boxShadow: `0 1px 0 lightgrey`,
                                           border: '1px',
                                           '&:last-of-type': {
                                               borderBottomLeftRadius: 0,
                                               borderBottomRightRadius: 0,
                                           },
                                       }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                sx={{
                                    backgroundColor: (theme) => theme.palette.secondary.main,
                                    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
                                        transform: 'rotate(-90deg)',
                                    },
                                }}
                            >
                                <Typography variant="h6">{topic.name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{flexDirection: 'column'}}>
                                {learningPath[index].path.map((learningElement) => (
                                    <Typography variant="body1">
                                        <Link
                                            key={learningElement.learning_element.name}
                                            underline="hover"
                                            variant="body2"
                                            color="inherit"
                                            sx={{
                                                cursor: "pointer",
                                                padding: '8px',
                                                borderRadius: 10,
                                                '&:hover': {backgroundColor: (theme) => theme.palette.primary.main},
                                            }}
                                            onClick={() => {
                                                navigate(`/topics/${t(topic.name)}/${t(learningElement.learning_element.name)}`);
                                            }}
                                        >
                                            {learningElement.position} {learningElement.learning_element.name}
                                        </Link>
                                    </Typography>
                                ))
                                }
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </>
            )}
        </Box>
    );
};

export default LocalNav;
