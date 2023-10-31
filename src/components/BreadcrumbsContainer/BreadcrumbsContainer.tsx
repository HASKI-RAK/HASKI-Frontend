import {Box, Breadcrumbs, Link, Typography} from '@common/components'
import {useLocation, useNavigate} from 'react-router-dom'
import {useTranslation} from 'react-i18next'

/**
 *  The BreadcrumbsContainer that renders breadcrumbs.
 * @example
 * Home / Page 1 / Page 2 / Page 3
 *
 * @remarks
 * It contains the breadcrumbs of the application and is used in the main frame.
 *
 * @category Components
 */

const onlyNumbersRegex = /\d/

const BreadcrumbsContainer = () => {
    // UX Logic
    const {t} = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()


    return (
        <Box sx={{display: 'flex', justifyContent: 'center'}}>
            {/** Center */}
            <Breadcrumbs aria-label="breadcrumb">
                {location.pathname !== '/' ? (
                    location.pathname.split('/').map((path, index, array) => {
                        if(path === '')
                            return (
                                <Link
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
                        if(onlyNumbersRegex.test(array[index+1])) return
                        else{
                            return (
                                <Link
                                    key={path}
                                    underline="hover"
                                    component={index === location.pathname.split('/').length - 1 ? 'span' : 'button'}
                                    color={index === location.pathname.split('/').length - 1 ? 'text.primary' : 'inherit'}
                                    onClick={() => {
                                        navigate(
                                            location.pathname.split('/').slice(0, index + 1).join('/')
                                        )
                                    }}>
                                    {onlyNumbersRegex.test(array[index]) ? t(`pages.${array[index-1].replace(onlyNumbersRegex, '').replaceAll("/","")}`) : t(`pages.${path}`)}
                                </Link>
                            )
                        }
                    })
                ) : (
                    <Box display="flex">
                        <Link
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

export default BreadcrumbsContainer
