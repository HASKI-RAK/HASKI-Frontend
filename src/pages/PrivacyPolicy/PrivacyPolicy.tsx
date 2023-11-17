import { useTranslation } from 'react-i18next'
import { Typography, Link, Divider, List, ListItem, ListItemText, ListItemIcon } from '@common/components'
import { FiberManualRecord } from '@common/icons'

/**
 * # Privacy Policy Page
 * @remarks
 * Contains legal information about the privacy policy.
 * @category Pages
 */
export const PrivacyPolicy = () => {
  // Translation
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="h4">{t('pages.privacypolicy')}</Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h6">1. {t('pages.privacypolicy.header.1')}</Typography>
      <Typography variant="body2"> {t('pages.privacypolicy.header.1.text')}</Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h6">2. {t('pages.privacypolicy.header.2')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.header.2.text.1')}</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.name & surname')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.learninganalytics')} />
        </ListItem>
      </List>
      <Typography variant="body2">{t('pages.privacypolicy.header.2.text.2')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.privacypolicy.header.3')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.header.3.text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.privacypolicy.header.4')}</Typography>
      <Typography variant="body2"> {t('pages.privacypolicy.header.4.text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.privacypolicy.header.5')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.header.5.text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.privacypolicy.header.6')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.header.6.text.1')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.header.6.text.2')}</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.header.6.paragraph.1')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.header.6.paragraph.2')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.header.6.paragraph.3')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.header.6.paragraph.4')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.header.6.paragraph.5')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.header.6.paragraph.6')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.header.6.paragraph.7')} />
        </ListItem>
      </List>
      <Typography variant="body2">{t('pages.privacypolicy.header.6.text.3')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.header.6.text.4')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">{t('pages.privacypolicy.support.text')}</Typography>
      <Typography variant="body2" />
      <Typography variant="body2">Jim Haug (HS Kempten)</Typography>
      <Typography variant="body2">Bahnhofstraße 61</Typography>
      <Typography variant="body2">D - 87435 Kempten</Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
        <Link href="mailto:jim.haug@hs-kempten.de">jim.haug@hs-kempten.de</Link>
      </Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">{t('pages.privacypolicy.privacysupport.text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">{t('pages.privacypolicy.privacysupport.name')}</Typography>
      <Typography variant="body2">Bahnhofstraße 61</Typography>
      <Typography variant="body2">D - 87435 Kempten</Typography>
      <Typography variant="body2">Fax: 0831 2523-9283</Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
        <Link href="mailto:Datenschutz@hs-kempten.de">Datenschutz@hs-kempten.de</Link>
      </Typography>
      <Typography paragraph variant="body2" />
    </>
  )
}

export default PrivacyPolicy
