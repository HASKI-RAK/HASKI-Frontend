import { useTranslation } from 'react-i18next'

import { Divider, Link, List, ListItem, ListItemIcon, ListItemText, Typography } from '@common/components'
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
      <Typography variant="h6">1. {t('pages.privacypolicy.informationStudy')}</Typography>
      <Typography variant="body2"> {t('pages.privacypolicy.informationStudyText')}</Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h6">2. {t('pages.privacypolicy.privacyNotice')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.privacyNoticeHandlingPersonalData')}</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.nameSurname')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.learningAnalytics')} />
        </ListItem>
      </List>
      <Typography variant="body2">{t('pages.privacypolicy.privacyNoticeIntention')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.privacypolicy.dataCollection')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.dataCollectionText')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.privacypolicy.dataProcessing')}</Typography>
      <Typography variant="body2"> {t('pages.privacypolicy.dataProcessingText')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.privacypolicy.storageAndAccess')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.storageAndAccessText')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.privacypolicy.publication')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.publicationText-1')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.publicationText-2')}</Typography>
      <List>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.publicationParagraph-1')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.publicationParagraph-2')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.publicationParagraph-3')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.publicationParagraph-4')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.publicationParagraph-5')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.publicationParagraph-6')} />
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <FiberManualRecord fontSize="small" />
          </ListItemIcon>
          <ListItemText primary={t('pages.privacypolicy.publicationParagraph-7')} />
        </ListItem>
      </List>
      <Typography variant="body2">{t('pages.privacypolicy.publicationText-3')}</Typography>
      <Typography variant="body2">{t('pages.privacypolicy.publicationText-4')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">{t('pages.privacypolicy.support')}</Typography>
      <Typography variant="body2" />
      <Typography variant="body2">Jim Haug (HS Kempten)</Typography>
      <Typography variant="body2">Bahnhofstraße 61</Typography>
      <Typography variant="body2">D - 87435 Kempten</Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
        <Link href="mailto:jim.haug@hs-kempten.de">jim.haug@hs-kempten.de</Link>
      </Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">{t('pages.privacypolicy.privacySupport')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">{t('pages.privacypolicy.privacySupportName')}</Typography>
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
