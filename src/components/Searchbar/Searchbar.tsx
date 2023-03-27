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

const Searchbar = (props: SearchbarProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const timer = setTimeout(() => {
        const {
          target: { value },
        } = event;

        props.setSearchQuery && props.setSearchQuery(value);
      }, props.timeout);

      return () => clearTimeout(timer);
    },
    []
  );

  return (
    <Typography variant="h4">
      <TextField
        id="searchbar"
        fullWidth
        label={props.label}
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
  );
};

export default Searchbar;
