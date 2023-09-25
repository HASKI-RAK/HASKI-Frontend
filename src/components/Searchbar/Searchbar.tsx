import { Typography, TextField, InputAdornment } from '@common/components'
import SearchIcon from '@mui/icons-material/Search'
import { useCallback, memo } from 'react'

/**
 * @props label - The label text of the searchbar.
 * @props setSearchQuery - The function to set the query that should be searched for.
 * @props timeout - The timeout in milliseconds to wait before searching.
 * @interface
 */
export type SearchbarProps = {
  label?: string
  setSearchQuery?: (query: string) => void
  timeout?: number
}

/**
 * debouncedSearchQuery function.
 *
 * @param props - Props containing a change event, a function to set the search query and a timeout.
 *
 * @remarks
 * debouncedSearchQuery presents a function that can be used to debounce a query by a timeout before it gets written into a state.
 * debouncedSearchQuery can be used as a function in a component.
 *
 * @returns - Function that clears the timeout.
 *
 * @category Logic
 */
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
  }, timeout)

  return () => clearTimeout(timer)
}

/**
 * Searchbar component.
 *
 * @param props - Props containing the label text, the function to set the search query and a timeout of the searchbar.
 *
 * @remarks
 * Searchbar presents a component that can be used to write a search query.
 * The written search query gets debounced by a timeout before the value is set.
 * Searchbar can be used as a standalone component on a page.
 *
 * @catergory Components
 */
const Searchbar = (props: SearchbarProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      debouncedSearchQuery(event, props.setSearchQuery, props.timeout)
    },
    [props.setSearchQuery, props.timeout]
  )

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
          )
        }}
      />
    </Typography>
  )
}

export default memo(Searchbar)
