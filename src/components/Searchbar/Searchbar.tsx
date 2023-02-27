import { useCallback } from "react";
import { useTranslation } from "react-i18next"
import { DefaultTypography as Typography, DefaultTextField as TextField } from "@common/components"


import SearchIcon from '@mui/icons-material/Search' // 
import { InputAdornment } from '@mui/material' // 

export const Searchbar = (props: SearchbarProps) => {
    const { t } = useTranslation();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {
            target: { value },
        } = event

        props.setSearchQuery && props.setSearchQuery(value)
    }, [])

    return(
        <>
            <Typography variant="h4">
                <TextField
                    id="pages.glossary.search"
                    fullWidth
                    label={t('pages.glossary.search')}
                    onChange={handleChange}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Typography>
        </>
    );
};

interface SearchbarProps {
    setSearchQuery?: (query: string) => void
}