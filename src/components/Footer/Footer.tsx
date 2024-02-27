import React from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Box, Container, Grid, Link, Typography } from '@common/components'

/**
 * Sticks to the bottom of the page and is always visible.
 *
 * @remarks
 * It contains the footer of the application and is used in the main frame.
 * It contains legal information and links to the imprint and privacy policy.
 *
 * @category Components
 */
const Footer = () => {
  // UX Logic
  const navigate = useNavigate()
  const { t } = useTranslation()

  const footerComponents = [
    { name: [t('pages.home')], link: '/' },
    { name: [t('pages.projectinformation')], link: '/projectinformation' },
    { name: [t('pages.contact')], link: '/contact' },
    { name: [t('pages.imprint')], link: '/imprint' },
    { name: [t('pages.privacypolicy')], link: '/privacypolicy' }
  ]

  return (
    <footer>
      <Box
        sx={{
          width: '100%',
          height: 'auto',
          paddingTop: '1em',
          paddingBottom: '1em'
        }}>
        <Container maxWidth="lg">
          <Grid container direction="column" alignItems="center">
            <Grid item xs={12}>
              <Typography color="black" variant="h5">
                {t('components.Footer.project') + ' HASKI ' + new Date().getFullYear()}
              </Typography>
            </Grid>
            <Grid item xs={12} display="flex" width="100%" justifyContent="center">
              {footerComponents.map((component) => (
                <React.Fragment key={component.link}>
                  <Link
                    id={component.link.concat('-link').replaceAll(' ', '-')}
                    marginX="0.2em"
                    component="button"
                    variant="subtitle1"
                    color={'textSecondary'}
                    href={component.link}
                    underline="hover"
                    onClick={() => navigate(component.link)}>
                    {component.name}
                  </Link>
                  {footerComponents.indexOf(component) !== footerComponents.length - 1 && (
                    <Typography marginX="0.2em" color="textSecondary" variant="subtitle1">
                      {' '}
                      |{' '}
                    </Typography>
                  )}
                </React.Fragment>
              ))}
            </Grid>
          </Grid>
        </Container>
      </Box>
    </footer>
  )
}

export default Footer
