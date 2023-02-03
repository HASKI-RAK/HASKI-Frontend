import SearchIcon from '@mui/icons-material/Search';
import { DefaultTypography as Typography, DefaultIconButton as IconButton, DefaultTextField as TextField } from "@common/components";
import { useTranslation } from "react-i18next";

export const GlossarySearch = () => {
    const { t } = useTranslation();

    return(
        <>
            <Typography variant="h4">
                <IconButton>
                    <SearchIcon />
                </IconButton> 
                <TextField id="outlined-basic" label={t('pages.glossary.search')} variant="outlined" />
            </Typography>
        </>
    );
};

// TODO:
// 1. Icons auch als wiederverwendbare Komponenten?