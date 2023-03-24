import { useCallback } from "react";
import { useTranslation } from "react-i18next"
import SearchIcon from '@mui/icons-material/Search'
import { 
    DefaultTypography as Typography,
    DefaultTextField as TextField,
    DefaultInputAdornment as InputAdornment
} from "@common/components"

type SearchbarProps = {
    setSearchQuery?: (query: string) => void
}

const Searchbar = (props: SearchbarProps) => {
    const { t } = useTranslation();

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const timer = setTimeout(() => {
        
        const {
            target: { value },
        } = event

        props.setSearchQuery && props.setSearchQuery(value)
        }, 100)

        return () => clearTimeout(timer)
    }, [])

    return(
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
    )
}

export default Searchbar