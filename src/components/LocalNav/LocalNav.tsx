import {
    DefaultBox as Box,
    DefaultDivider as Divider,
    DefaultTypography as Typography,
} from "@common/components";
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
            <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.1")}</Typography>
            <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.2")}</Typography>
            <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.3")}</Typography>
            <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.4")}</Typography>
            <Typography variant="h6">{t("components.LocalNav.LocalNav.Topics.5")}</Typography>
        </Box>
    );
};

export default LocalNav;
