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
import {useLearningPath} from "./LocalNav.hooks";
import {Skeleton, Stack} from "@mui/material";


/**
 * Local navigation component for the main frame.
 * @remarks
 * It contains the topics menu as a way to navigate through the application.
 *
 * @category Components
 */

//todo: get Topics of Student-id from backend
    //todo: get paths of topics from backend, and sort with .sort((a, b) => a.position - b.position);


const LocalNav = () => {
        const {t} = useTranslation()
        const navigate = useNavigate()
        const {loading, topics, learningPath} = useLearningPath()

        const skeletonItems = []
        for(let i = 0; i < 3; i++) {
            skeletonItems.push(
                <>
                    <Skeleton variant="text" width={'100%'} height={55}/>
                    <Skeleton variant="text" width={'70%'} height={20}/>
                    <Skeleton variant="text" width={'70%'} height={20} sx={{left: '50'}}/>
                </>
            );
        }

        return (
            <Box flexGrow={1}>
                <Typography variant="h5">{t("components.LocalNav.LocalNav.Topics")}</Typography>
                <Divider/>
                {loading ? ( // display Skeleton component while loading is true
                    <Box>
                        <Stack spacing={1}>
                            {skeletonItems}
                        </Stack>
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
                            )
                        )}
                    </>
                )}
            </Box>
        )
    }

export default LocalNav;
