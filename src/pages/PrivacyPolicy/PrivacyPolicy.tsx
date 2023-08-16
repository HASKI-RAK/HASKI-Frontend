import { useTranslation } from 'react-i18next'
import {
  DefaultTypography as Typography,
  DefaultLink as Link,
  DefaultDivider as Divider,
  DefaultList as List,
  DefaultListItem as ListItem,
  DefaultListItemText as ListItemText,
  DefaultListItemIcon as ListItemIcon
} from '@common/components'
import { FiberManualRecord } from '@mui/icons-material'

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
      <Typography variant="h4">{t('pages.PrivacyPolicy')}</Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h6">1. {t('pages.PrivacyPolicy.header.1')}</Typography>
      <Typography variant="body2"> {t('pages.PrivacyPolicy.header.1.Text')}</Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h6">2. {t('pages.PrivacyPolicy.header.2')}</Typography>
      <Typography variant="body2">{t('pages.PrivacyPolicy.header.2.Text.1')}</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary={t('pages.PrivacyPolicy.Name & Surname')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary={t('pages.PrivacyPolicy.LearningAnalytics')} />
        </ListItem>
      </List>
      <Typography variant="body2">{t('pages.PrivacyPolicy.header.2.Text.2')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.PrivacyPolicy.header.3')}</Typography>
      <Typography variant="body2">{t('pages.PrivacyPolicy.header.3.Text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.PrivacyPolicy.header.4')}</Typography>
      <Typography variant="body2"> {t('pages.PrivacyPolicy.header.4.Text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.PrivacyPolicy.header.5')}</Typography>
      <Typography variant="body2">{t('pages.PrivacyPolicy.header.5.Text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.PrivacyPolicy.header.6')}</Typography>
      <Typography variant="body2">{t('pages.PrivacyPolicy.header.6.Text.1')}</Typography>
      <Typography variant="body2">{t('pages.PrivacyPolicy.header.6.Text.2')}</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.PrivacyPolicy.header.6.Paragraph.1')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.PrivacyPolicy.header.6.Paragraph.2')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.PrivacyPolicy.header.6.Paragraph.3')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.PrivacyPolicy.header.6.Paragraph.4')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.PrivacyPolicy.header.6.Paragraph.5')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.PrivacyPolicy.header.6.Paragraph.6')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.PrivacyPolicy.header.6.Paragraph.7')} />
        </ListItem>
      </List>
      <Typography variant="body2">{t('pages.PrivacyPolicy.header.6.Text.3')}</Typography>
      <Typography variant="body2">{t('pages.PrivacyPolicy.header.6.Text.4')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">{t('pages.PrivacyPolicy.Support.Text')}</Typography>
      <Typography variant="body2" />
      <Typography variant="body2">Jim Haug (HS Kempten)</Typography>
      <Typography variant="body2">Bahnhofstraße 61</Typography>
      <Typography variant="body2">D - 87435 Kempten</Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
        <Link href="mailto:jim.haug@hs-kempten.de">jim.haug@hs-kempten.de</Link>
      </Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">{t('pages.PrivacyPolicy.PrivacySupport.Text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">{t('pages.PrivacyPolicy.PrivacySupport.Name')}</Typography>
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
