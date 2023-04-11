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


/**
 * Local navigation component for the main frame.
 * @remarks
 * It contains the topics menu as a way to navigate through the application.
 *
 * @category Components
 */

//todo: get Topics of Student-id from backend
    //todo: get paths of topics from backend, and sort with .sort((a, b) => a.position - b.position);

const responseTopics = {
        "topics": [
            {
                "id": 1,
                "name": "Allgemeine Informationen",
                "lms_id": 1,
                "is_topic": true,
                "parent_id": 0,
                "contains_le": true,
                "done": false,
                "done_percantage": 0,
                "last_visit": "0",
                "time_spend": 0,
                "is_recommended": true
            },
            {
                "id": 2,
                "name": "Adapter",
                "lms_id": 2,
                "is_topic": true,
                "parent_id": 0,
                "contains_le": true,
                "done": false,
                "done_percantage": 0,
                "last_visit": "0",
                "time_spend": 0,
                "is_recommended": false
            },
            {
                "id": 3,
                "name": "Command, Command with Undo, Command Processor",
                "lms_id": 3,
                "is_topic": true,
                "parent_id": 0,
                "contains_le": true,
                "done": false,
                "done_percantage": 0,
                "last_visit": "0",
                "time_spend": 0,
                "is_recommended": false
            },
            {
                "id": 4,
                "name": "Strategie",
                "lms_id": 4,
                "is_topic": true,
                "parent_id": 0,
                "contains_le": true,
                "done": false,
                "done_percantage": 0,
                "last_visit": "0",
                "time_spend": 0,
                "is_recommended": false
            },
            {
                "id": 5,
                "name": "Zustand",
                "lms_id": 5,
                "is_topic": true,
                "parent_id": 0,
                "contains_le": true,
                "done": false,
                "done_percantage": 0,
                "last_visit": "0",
                "time_spend": 0,
                "is_recommended": false
            },
        ]
    };

const responseLearningElements = [
    {
        "position": 1,
        "learning_element": {
            "id": 1,
            "lms_id": 14,
            "activity_type": "h5pactiviy",
            "classification": "SE",
            "name": "Selbsteinschätzungstest",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 2,
        "learning_element": {
            "id": 2,
            "lms_id": 63,
            "activity_type": "h5pactiviy",
            "classification": "KÜ",
            "name": "Kurzübersicht",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 4,
        "learning_element": {
            "id": 3,
            "lms_id": 62,
            "activity_type": "h5pactiviy",
            "classification": "BE",
            "name": "Beispiel",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 3,
        "learning_element": {
            "id": 4,
            "lms_id": 15,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 1 Leicht",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 5,
        "learning_element": {
            "id": 5,
            "lms_id": 68,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 2 Leicht",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 6,
        "learning_element": {
            "id": 6,
            "lms_id": 66,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 1 Mittel",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 7,
        "learning_element": {
            "id": 7,
            "lms_id": 69,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 2 Mittel",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 8,
        "learning_element": {
            "id": 8,
            "lms_id": 67,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 1 Schwer",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 9,
        "learning_element": {
            "id": 9,
            "lms_id": 20,
            "activity_type": "h5pactiviy",
            "classification": "ÜB",
            "name": "Uebung 2 Schwer",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    },
    {
        "position": 10,
        "learning_element": {
            "id": 10,
            "lms_id": 71,
            "activity_type": "h5pactiviy",
            "classification": "ZF",
            "name": "Zusammenfassung",
            "done": false,
            "done_at": "",
            "nr_of_visits": 0,
            "last_visit": "",
            "time_spend": 0,
            "is_recommended": true
        }
    }
];

responseLearningElements.sort((a, b) => a.position - b.position);

const LocalNav = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();

    return (
        <Box flexGrow={1}>
            <Typography variant="h5">{t("components.LocalNav.LocalNav.Topics")}</Typography>
            <Divider/>
            {/** TODO 📑 add real topics */}
            <>
                {responseTopics.topics.map((topic) => (
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
                            {/*api-call get all learning elements from current topic and sort it with position*/}
                            {responseLearningElements.map((learningElement) => (
                                <Typography variant="body1">
                                    <Link
                                        key={learningElement.learning_element.name}
                                        underline="hover"
                                        variant="body2"
                                        color="inherit"
                                        sx={{cursor: "pointer", padding: '8px', borderRadius: 10, '&:hover': {backgroundColor: (theme) => theme.palette.primary.main},}}
                                        onClick={() => {
                                            navigate(`/topics/${t(topic.name)}/${t(learningElement.learning_element.name)}`);
                                        }}
                                    >
                                        {learningElement.position} {learningElement.learning_element.name}
                                    </Link>
                                </Typography>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </>
        </Box>
    );
};

export default LocalNav;
