import SearchIcon from '@mui/icons-material/Search'
import { useCallback, useEffect } from 'react'
import { Typography, TextField, InputAdornment } from '@common/components'

// mine -------------------------------------------------
import {useDebounce} from '@services'
// --------------------------------------------------------

/**
 * @typedef {object} SearchbarProps
 * @property {string} [label] - The label text of the searchbar.
 * @property {function} [setSearchQuery] - The function to set the query that should be searched for.
 * @property {number} [timeout] - The timeout in milliseconds to wait before searching.
 */
export type SearchbarProps = {
  label?: string
  setSearchQuery?: (query: string) => void
  timeout?: number
}

/**
 * debouncedSearchQuery presents a function that can be used to debounce a query by a timeout before it gets written into a state.
 * debouncedSearchQuery can be used as a function in a component.
 * @param props - Props containing a change event, a function to set the search query and a timeout.
 * @returns {() => void} - The function thats clears the timeout.
 * @category Hooks
 */

/* original
export const debouncedSearchQuery = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setSearchQuery?: (query: string) => void,
  timeout?: number
) => {
  const timer = setTimeout(() => {
    const {
      target: { value }
    } = event

    setSearchQuery?.(value)
    console.log("Searchbar.debounceSearchQuery: event.target.value = ", value);
    console.log("---------------------");
  }, timeout)

  return () => clearTimeout(timer)
}
/*/


/**
 * Searchbar presents a component that can be used to write a search query.
 * The written search query gets debounced by a timeout before the value is set.
 * Searchbar can be used as a standalone component on a page.
 * @param props - Props containing the label text, the function to set the search query and a timeout of the searchbar.
 * @returns {JSX.Element} - The Searchbar component.
 * @category Components
 */
const Searchbar = (props: SearchbarProps) => {
  
  /* original
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      console.log("Searchbar.handleChange: event.target.value = ", event.target.value);
      debouncedSearchQuery(event, props.setSearchQuery, props.timeout)
    },
    [props.setSearchQuery, props.timeout]
  )
  */
  
  ///* mine -------------------------------------------------
  const { actualValue, debouncedValue, handleChange } = useDebounce(
    300,
    props.setSearchQuery || (() => {})
  );  //*/--------------------------------------------------------
  
  return (
    <Typography variant="h4" data-testid="searchbar">
      <TextField
        id="searchbar"
        fullWidth
        label={props.label}
        
        
        //onChange={handleChange}
        //mine
        value={actualValue}
        onChange={handleChange}

        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          )
        }}
      />
    </Typography>
  )
}

export default Searchbar
