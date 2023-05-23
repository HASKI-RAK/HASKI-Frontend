import { useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import {
  DefaultTypography as Typography,
  DefaultTextField as TextField,
  DefaultInputAdornment as InputAdornment,
} from "@common/components";

type SearchbarProps = {
  label?: string;
  setSearchQuery?: (query: string) => void;
  timeout?: number;
};

export const handleChange = useCallback(
  (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setSearchQuery?: (query: string) => void,
  timeout?: number ) => {
    const timer = setTimeout(() => {
      const {
        target: { value },
      } = event;

      setSearchQuery && setSearchQuery(value);
    }, timeout);
    return () => clearTimeout(timer);
  },
  []
);

const Searchbar = (props: SearchbarProps) => {
  return (
    <Typography variant="h4" data-testid="searchbar">
      <TextField
        id="searchbar"
        fullWidth
        label={props.label}
        onChange={handleChange(props.setSearchQuery, props.timeout)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start"> 
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </Typography>
  );
};

//for tests
export type TestSearchbarProps = SearchbarProps;
export const TestSearchbar = Searchbar;

export default Searchbar;
