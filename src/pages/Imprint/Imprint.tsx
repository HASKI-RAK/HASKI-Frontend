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
      <Typography variant="body2">Hochschule Kempten</Typography>
      <Typography variant="body2">Bahnhofstraße 61</Typography>
      <Typography variant="body2">D - 87435 Kempten</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('pages.imprint.authorisedRepresentative')}</Typography>
      <Typography variant="body2">{t('pages.imprint.authorisedRepresentativeTitle')} Prof. Dr. Georg Hagel</Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Tel.:</Typography> +49 (0) 831 2523-471
      </Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
        <Link href="mailto:georg.hagel@hs-kempten.de">georg.hagel@hs-kempten.de</Link>
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
