import DefaultSelect from '@mui/material/Select'
import { usePageName } from 'src/services/PageName/PageName.hooks'
import {  memo } from 'react'
import { withXAPI, EventHandlers } from 'react-xapi-wrapper'
import { SelectProps as DefaultSelectProps } from '@common/components'

// TODO: DOKU
type SelectProps = DefaultSelectProps & EventHandlers

// TODO: DOKU
const WrappedSelect = withXAPI(DefaultSelect, {
      componentFilePath: new URL(import.meta.url).pathname,
      componentType: 'Select'
})

// TODO: DOKU
const Select = ({ ...props }: SelectProps) => {
  const { pageName } = usePageName()
  return <WrappedSelect pageName={pageName} {...props} />
}

export default memo(Select)