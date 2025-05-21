import { memo, useCallback } from 'react'

import { InputAdornment, TextField, Typography } from '@common/components'
import { Search } from '@common/icons'
import { debounce } from '@services'

/**
 * @prop label - The label text of the searchbar.
 * @prop setSearchQuery - The function to set the query that should be searched for.
 * @prop timeout - The timeout in milliseconds to wait before searching.
 * @interface
 */
export type SearchbarProps = {
  label?: string
  setSearchQuery?: (query: string) => void
  timeout?: number
}

/**
 * Searchbar component.
 *
 * @param props - Props containing the label text, the function to set the search query and a timeout of the searchbar.
 *
 * @remarks
 * Searchbar represents a component that can be used to write a search query.
 * The written search query gets debounced by a timeout before the value is set.
 * Searchbar can be used as a standalone component on a page.
 *
 * @category Components
 */
const Searchbar = (props: SearchbarProps) => {
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      debounce(() => {
        props.setSearchQuery?.(event.target.value)
      }, props.timeout)
    },
    [props.setSearchQuery, props.timeout]
  )
  return (
    <Typography variant="h4">
      <TextField
        id="searchbar-textfield"
        fullWidth
        label={props.label}
        onChange={handleChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
    </Typography>
  )
}

export default memo(Searchbar)
