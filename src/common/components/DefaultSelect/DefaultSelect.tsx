import DefaultSelect from '@mui/material/Select'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import { EventHandlers } from 'src/services/xAPI/library/withXAPI'
import {  memo, useMemo } from 'react'
import { withXAPI } from 'react-xapi-wrapper'
import { SelectProps as DefaultSelectProps, SelectChangeEvent } from '@common/components'

// TODO: Check if both cahnge and click events work
// TODO: DOKU
type SelectProps = DefaultSelectProps & EventHandlers

// TODO: DOKU
const Select = ({ ...props }: SelectProps) => {
  const { pageName } = usePageName()

  const WrappedSelect = useMemo(
    () =>
      withXAPI(DefaultSelect, {
        componentFilePath: new URL(import.meta.url).pathname,
        componentType: 'Select',
        pageName: pageName
      }),
    [pageName]
  )

  return <WrappedSelect {...props} />
}

export default memo(Select)
