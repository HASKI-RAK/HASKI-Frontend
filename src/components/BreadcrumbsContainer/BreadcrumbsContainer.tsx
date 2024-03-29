import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { NavigateFunction, useLocation, useNavigate } from 'react-router-dom'
import { Box, Breadcrumbs, Link, Typography } from '@common/components'

// Regex to check if a string contains numbers
const onlyNumbersRegex = /\d/

// Check if current index is number, if yes return the previous name
const showCurrentBreadcrump = (
  path: string,
  index: number,
  array: string[],
  navigate: NavigateFunction,
  t: (key: string) => string
) => {
  return (
    <Link
      id={path.concat('-link').replaceAll(' ', '-')}
      key={path}
      underline="hover"
      component={index === location.pathname.split('/').length - 1 ? 'span' : 'button'}
      color={index === location.pathname.split('/').length - 1 ? 'inherit' : 'text.primary'}
      onClick={() => {
        navigate(
          location.pathname
            .split('/')
            .slice(0, index + 1)
            .join('/')
        )
      }}>
      {onlyNumbersRegex.test(array[index])
        ? t(`pages.${array[index - 1].replace(onlyNumbersRegex, '').replaceAll('/', '')}`)
        : t(`pages.${path}`)}
    </Link>
  )
}

/**
 * BreadcrumbsContainer component.
 *
 * @example
 * URL: Home / Page / 1 / Page / 2 / Page / 3
 * Breadcrumbs: Home / Page / Page / Page
 *
 * @remarks
 * It contains the breadcrumbs of the application and is used in the main frame.
 *
 * @category Components
 */

const BreadcrumbsContainer = () => {
  // UX Logic
  const { t } = useTranslation()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      {/** Center */}
      <Breadcrumbs aria-label="breadcrumb">
        {location.pathname !== '/' ? (
          location.pathname.split('/').map((path, index, array) => {
            if (path === '')
              return (
                <Link
                  id="home-link"
                  key={path}
                  underline="hover"
                  color="text.primary"
                  onClick={() => {
                    navigate('/')
                  }}>
                  {t('pages.home')}
                </Link>
              )

            //Do not display current path if the next is a number for example course/3
            //In this example course will be ignored, 3 will be changed to match the previous name (course)
            if (onlyNumbersRegex.test(array[index + 1])) return
            else return showCurrentBreadcrump(path, index, array, navigate, t)
          })
        ) : (
          <Box display="flex">
            <Link
              id="home-link"
              color="text.primary"
              onClick={() => {
                navigate('/')
              }}>
              {t('pages.home')}
            </Link>
            <Typography ml="0.3rem" color="text.primary">
              /
            </Typography>
          </Box>
        )}
      </Breadcrumbs>
    </Box>
  )
}

export default memo(BreadcrumbsContainer)
