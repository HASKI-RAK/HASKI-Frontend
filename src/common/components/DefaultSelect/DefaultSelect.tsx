import DefaultSelect from '@mui/material/Select'
import { usePageName } from 'src/services/xAPI/PageName.hooks'
import {  memo, useMemo } from 'react'
import { withXAPI, EventHandlers } from 'react-xapi-wrapper'
import { SelectProps as DefaultSelectProps } from '@common/components'
import exp from 'constants'

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


/*
const WrappedSelect = withXAPI(DefaultSelect, {
  componentFilePath: new URL(import.meta.url).pathname,
  componentType: 'Select',
})

const Select = (props: SelectProps) => {
  const { pageName } = usePageName()
  return <WrappedSelect {...props} pageName={pageName} />
}

export default memo(Select)
*/