import { useTranslation } from 'react-i18next'
import { Divider, Link, Typography } from '@common/components'

/**
 * # Imprint Page
 * @category Pages
 */
export const Imprint = () => {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="h4">{t('pages.imprint')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.imprint.subtitle')}</Typography>
      <Typography variant="body2">{t('pages.imprint.asOf')} 26.04.2023</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">Technische Hochschule Aschaffenburg</Typography>
      <Typography variant="body2">Würzburger Straße 45</Typography>
      <Typography variant="body2">D - 63743 Aschaffenburg</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.imprint.authorisedRepresentative')}</Typography>
      <Typography variant="body2">
        {t('pages.imprint.authorisedRepresentativeTitle')} Prof. Dr.-Ing. Jörg Abke
      </Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Tel.:</Typography> +49 (0) 6021 4206-883
      </Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
        <Link href="mailto:joerg.abke@th-ab.de">joerg.abke@th-ab.de</Link>
      </Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h4">{t('pages.imprint.disclaimer')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">1. {t('pages.imprint.onlineContent')}</Typography>
      <Typography variant="body2"> {t('pages.imprint.onlineContentText')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">2. {t('pages.imprint.referenceLinks')}</Typography>
      <Typography variant="body2"> {t('pages.imprint.referenceLinksText')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">3. {t('pages.imprint.copyrightAndTrademarkLaw')}</Typography>
      <Typography variant="body2">{t('pages.imprint.copyrightAndTrademarkLawText')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">4. {t('pages.imprint.dataProtection')}</Typography>
      <Typography variant="body2"> {t('pages.imprint.dataProtectionText')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">5. {t('pages.imprint.legalValidity')}</Typography>
      <Typography variant="body2">{t('pages.imprint.legalValidityText')}</Typography>
      <Typography paragraph variant="body2" />
    </>
  )
}

export default Imprint
