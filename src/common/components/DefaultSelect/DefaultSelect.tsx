import DefaultSelect from '@mui/material/Select'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import {  memo, useMemo } from 'react'
import { withXAPI, EventHandlers } from 'react-xapi-wrapper'
import { SelectProps as DefaultSelectProps } from '@common/components'

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
  console.log(WrappedSelect)

  return <WrappedSelect {...props} />
}

export default memo(Select)
