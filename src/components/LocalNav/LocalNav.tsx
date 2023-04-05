import {
    DefaultBox as Box,
    DefaultDivider as Divider,
    DefaultTypography as Typography,
    DefaultAccordionSummary as AccordionSummary,
    DefaultAccordionDetails as AccordionDetails,
    DefaultAccordion as Accordion
} from "@common/components";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useTranslation} from "react-i18next";

/**
 * Local navigation component for the main frame.
 * @remarks
 * It contains the topics menu as a way to navigate through the application.
 *
 * @category Components
 */
const LocalNav = () => {
    const {t} = useTranslation();
    return (
        <Box flexGrow={1}>
            <Typography variant="h5">{t("components.LocalNav.LocalNav.Topics")}</Typography>
            <Divider/>
            {/** TODO 📑 add real topics */}
            <div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.1")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.1")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.2")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.3")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.4")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.5")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.6")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.7")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.8")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.9")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.10")}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.2")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.1")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.2")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.3")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.4")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.5")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.6")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.7")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.8")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.9")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.10")}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.3")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.1")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.2")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.3")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.4")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.5")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.6")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.7")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.8")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.9")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.10")}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.4")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.1")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.2")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.3")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.4")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.5")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.6")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.7")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.8")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.9")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.10")}</Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.5")}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.1")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.2")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.3")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.4")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.5")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.6")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.7")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.8")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.9")}</Typography>
                        <Typography variant="body2">{t("components.LocalNav.LocalNav.Topics.X.10")}</Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </Box>
    );
};

export default LocalNav;
