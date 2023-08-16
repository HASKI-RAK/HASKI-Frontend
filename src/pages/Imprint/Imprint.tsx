import { DefaultDivider as Divider, DefaultLink as Link, DefaultTypography as Typography } from '@common/components'
import { useTranslation } from 'react-i18next'

/**
 * # Imprint Page
 * @category Pages
 */
export const Imprint = () => {
  const { t } = useTranslation()
  return (
    <>
      <Typography variant="h4">{t('components.Imprint.Title')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('components.Imprint.Subtitle')}</Typography>
      <Typography variant="body2">{t('components.Imprint.AsOf')} 26.04.2023</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="body2">Hochschule Kempten</Typography>
      <Typography variant="body2">Bahnhofstraße 61</Typography>
      <Typography variant="body2">D - 87435 Kempten</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">{t('components.Imprint.AuthorisedRepresentative')}</Typography>
      <Typography variant="body2">
        {t('components.Imprint.AuthorisedRepresentative.Title')} Prof. Dr. Georg Hagel
      </Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>Tel.:</Typography> +49 (0) 831 2523-471
      </Typography>
      <Typography variant="body2">
        <Typography sx={{ fontWeight: 'bold', display: 'inline' }}>E-Mail:</Typography>{' '}
        <Link href="mailto:georg.hagel@hs-kempten.de">georg.hagel@hs-kempten.de</Link>
      </Typography>
      <Typography paragraph variant="body2" />
      <Divider />
      <Typography variant="h4">{t('components.Imprint.Disclaimer')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">1. {t('components.Imprint.Disclaimer.OnlineContent')}</Typography>
      <Typography variant="body2"> {t('components.Imprint.Disclaimer.OnlineContent.Text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">2. {t('components.Imprint.Disclaimer.ReferencesAndLinks')}</Typography>
      <Typography variant="body2"> {t('components.Imprint.Disclaimer.ReferencesAndLinks.Text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">3. {t('components.Imprint.Disclaimer.CopyrightAndTrademarkLaw')}</Typography>
      <Typography variant="body2">{t('components.Imprint.Disclaimer.CopyrightAndTrademarkLaw.Text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">4. {t('components.Imprint.Disclaimer.DataProtection')}</Typography>
      <Typography variant="body2"> {t('components.Imprint.Disclaimer.DataProtection.Text')}</Typography>
      <Typography paragraph variant="body2" />
      <Typography variant="h6">5. {t('components.Imprint.Disclaimer.LegalValidityOfDisclaimer')}</Typography>
      <Typography variant="body2">{t('components.Imprint.Disclaimer.LegalValidityOfDisclaimer.Text')}</Typography>
      <Typography paragraph variant="body2" />
    </>
  )
}

export default Imprint
